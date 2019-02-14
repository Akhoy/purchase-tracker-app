import React, { Component } from 'react';
import { Text, View, Platform, AsyncStorage } from 'react-native';
import { Calendar } from '../react-native-calendars';
import { Icon, Fab } from 'native-base';
import { Navigation } from "react-native-navigation";
import XDate from 'xdate';
import invert from 'invert-color';

export default class CalendarView extends Component {
  constructor(props) {
    super(props);
    var xDate = new XDate(true);
    this.state = {
      selectedDate: { dateString: xDate.toString('yyyy-MM-dd'), day: xDate.getDate(), month: xDate.getMonth() + 1, timestamp: 0, year: xDate.getFullYear(), date: xDate },
      dateQtyArray: null,
      isLoading: true
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('@PurchaseTracker:' + this.state.selectedDate.date.toString('yyyyMM')).then((dateQtyArray) => {
      dateQtyArray = dateQtyArray ? JSON.parse(dateQtyArray) : null;
      console.log(dateQtyArray);
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
        dateQtyArray.push({ "dateString": this.state.selectedDate.dateString, "quantity": quantity, "color": this.HSVtoRGB(Math.random(), 0.7, 0.7) })
      }
    }
    //date array is not found, create date array
    else {
      dateQtyArray = [{ "dateString": this.state.selectedDate.dateString, "quantity": this.state.qty, "color": this.HSVtoRGB(Math.random(), 0.7, 0.7) }]
    }
    this.updateDateArrayState(dateQtyArray);
  }

  updateDateArrayState = async (dateQtyArray) => {
    await AsyncStorage.setItem(
      '@PurchaseTracker:' + this.state.selectedDate.date.toString('yyyyMM'),
      JSON.stringify(dateQtyArray)
    );
    console.log('propsDateQtyArray at end ' + JSON.stringify(dateQtyArray));
    this.setState({ dateQtyArray });
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
    let { year, month, day } = this.state.selectedDate;
    let bgColorObj = this.HSVtoRGB(Math.random(), 0.7, 0.7);
    let invertedColor = invert(bgColorObj, true);
    //condition to load from asyncstorage and check if dateArray exists. 
    if (this.state.isLoading) {
      return null;
    }
    return (
      <View>
        <View behavior={(Platform.OS === 'ios') ? 'padding' : null} enabled>
          <Calendar markedDates={{ [this.state.selectedDate.dateString]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' } }} selected={this.state.selectedDate.dateString} dateArray={this.state.dateQtyArray} bgColorFunc={this.HSVtoRGB} updateDateArrayState={this.updateDateArrayState} onDayPress={(day) => {
            day.date = new XDate(day.dateString);
            this.setState({ selectedDate: day })
          }} theme={{
            'stylesheet.day.basic': {
              'base': {
                width: '100%',
                height: 90,
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
                    date:this.state.selectedDate.date,
                    callback: this.setDateArray
                  },
                  options: { bottomTabs: {visible: false,
                  drawBehind: true, animate:true }}
                }
              });
              //hide tabs
              /*Navigation.mergeOptions('BottomTabsId', {
                bottomTabs: {
                  visible: false,
                  ...Platform.select({ android: { drawBehind: true } })
                },
              });*/
            }}>
            <Icon name="add" />
          </Fab>
        </View>
      </View>
    );

  }
}