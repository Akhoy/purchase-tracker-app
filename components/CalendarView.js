import React, { Component } from 'react';
import { View, Platform, AsyncStorage, StyleSheet, Dimensions, BackHandler } from 'react-native';
import { Calendar } from '../react-native-calendars';
import { Icon, Fab } from 'native-base';
import { Navigation } from "react-native-navigation";
import XDate from 'xdate';

import event from '../event';

export default class CalendarView extends Component {
  constructor(props) {
    super(props);
    var xDate = new XDate(true);
    //40 is the default price
    this.price = 40;
    this.state = {
      selectedDate: { dateString: xDate.toString('yyyy-MM-dd'), day: xDate.getDate(), month: xDate.getMonth() + 1, timestamp: 0, year: xDate.getFullYear(), date: xDate },
      dateQtyArray: null,
      isLoading: true,
      showView: false
    }
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    //get date array for setting quantity
    this.getDateArray(this.state.selectedDate.date.toString('yyyyM'));
    //also get price for sending it over to the form component
    AsyncStorage.getItem('price').then((price) => {
      if (price)
        this.price = price;
    });
    //set a listener for when component price disappears so that we know price was changed
    event.on('PriceChanged', this.priceChanged);
  }

  getDateArray(date) {
    AsyncStorage.getItem('@PurchaseTracker:' + date).then((dateQtyArray) => {
      console.log('getdateQtyArray ' + dateQtyArray);
      dateQtyArray = dateQtyArray ? JSON.parse(dateQtyArray) : null;
      this.setState({ isLoading: false, dateQtyArray });
    });
  }

  setDateArray = async (quantity) => {
    //check if date array parameter is passed
    //if not passed, just pass the     
    let dateQtyArray = this.state.dateQtyArray;
    if (dateQtyArray && dateQtyArray.length > 0) {
      //if async storage array exists,         
      let index = dateQtyArray.findIndex(
        item => item.dateString === this.state.selectedDate.dateString
      );
      //if async storage date array exists and index is found, simply replace quantity in item
      if (index > -1) {
        dateQtyArray[index]["quantity"] = quantity;
      }
      //if index is not found, create the object and push in array
      else {
        dateQtyArray.push({ "dateString": this.state.selectedDate.dateString, "quantity": quantity, "color": this.HSVtoRGB(Math.random(), 0.7, 0.7), "price": this.price })
      }
    }
    //date array is not found, create date array
    else {
      dateQtyArray = [{ "dateString": this.state.selectedDate.dateString, "quantity": quantity, "color": this.HSVtoRGB(Math.random(), 0.7, 0.7), "price": this.price }]
    }
    this.updateDateArrayState(dateQtyArray);
  }

  priceChanged = (priceObj) => {
    console.log('inside price change event listener');
    this.price = priceObj.price;
  }

  updateDateArrayState = async (dateQtyArray) => {
    console.log('dateqty array in updatedatearraystate');
    console.log(dateQtyArray);
    await AsyncStorage.setItem(
      '@PurchaseTracker:' + this.state.selectedDate.date.toString('yyyyM'),
      JSON.stringify(dateQtyArray)
    );
    this.setState({ dateQtyArray });
  }

  updateViewDisplay = () => {
    console.log('in update view display');
    this.setState({ showView: true });
  }

  HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
      s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    }

  }

  //before rendering, check if dateArray exists. if it does, render from that. if it doesn't continue with normal rendering.

  render() {
    //condition to load from asyncstorage and check if dateArray exists. 
    if (this.state.isLoading) {
      return null;
    }
    return (
      <View style={ this.state.showView ? [styles.container] : [styles.hiddenContainer] }>
        <View behavior={(Platform.OS === 'ios') ? 'padding' : null} enabled>
          <Calendar calendarViewLoad={true} markedDates={{ [this.state.selectedDate.dateString]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' } }} selected={[this.state.selectedDate.dateString]} dateArray={this.state.dateQtyArray} bgColorFunc={this.HSVtoRGB} updateDateArrayState={this.updateDateArrayState} onDayPress={(day) => {
            day.date = new XDate(day.dateString);
            this.setState({ selectedDate: day })
          }} updateView={this.updateViewDisplay} onMonthChange={(month) => this.getDateArray(`${month.year}${month.month}`)} theme={{
            'stylesheet.day.basic': {
              'base': {
                width: '100%',
                borderLeftColor: 'lightgrey',
                borderBottomWidth: 1,
                borderBottomColor: 'lightgrey',
                textAlign: 'center',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }
            },
            'stylesheet.calendar.main': {
              week: {
                marginTop: 0,
                marginBottom: 0,
                flexDirection: 'row'
              }
            }
          }} />
          <Fab
            active={true}
            containerStyle={{}}
            style={{ backgroundColor: 'rgba(231,76,60,1)' }}
            position="bottomRight"
            onPress={() => {
              Navigation.push(this.props.componentId, {
                component: {
                  name: 'FormView',
                  passProps: {
                    date: this.state.selectedDate.date,
                    callback: this.setDateArray
                  },
                  options: {
                    bottomTabs: {
                      visible: false,
                      drawBehind: true, animate: true
                    },
                    statusBar: {
                      backgroundColor: 'white',
                      style: 'dark'
                    },
                  }
                }
              });
            }}>
            <Icon name="add" />
          </Fab>
        </View>
      </View>
    );

  }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute'
  },
  // This pushes the view out of the viewport, but why the negative bottom?
  hiddenContainer: {
    top: window.height,
    bottom: -window.height
  }
});