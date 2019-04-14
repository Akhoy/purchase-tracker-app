import React, { Component } from 'react';
import { Navigation } from "react-native-navigation";
import { Text, AsyncStorage, Picker } from 'react-native';
import { Container, Header, Content } from 'native-base';
import XDate from 'xdate';

export default class Total extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      selectedMonth: new XDate(true).toString('M'),
      selectedYear: new XDate(true).toString('yyyy')
    }
  }
  componentDidMount() {
    // Subscribe
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }
  componentWillUnmount() {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }
  componentDidAppear() {
    this.setTotal(new XDate(true).toString('yyyyM'),{selectedMonth: new XDate(true).toString('M')});
  }
  setTotal = (date, additionalParams) => {
    console.log(`@PurchaseTracker:${date}`);
    //for now, will calculate total for the current month. later, will add a dropdown to select the month
    AsyncStorage.getItem(`@PurchaseTracker:${date}`).then((dateQtyArray) => {
      console.log(dateQtyArray)
      dateQtyArray = dateQtyArray ? JSON.parse(dateQtyArray) : null;
      let total = 0;
      if (dateQtyArray) {
        //add the quantities
        dateQtyArray.forEach(element => {
          total += (+element.quantity * element.price);
        });        
      }
      this.setState({total, ...additionalParams});
    });
  }
  render() { 
    return (
      <Container style={{ height: '100%' }}>
        <Header androidStatusBarColor="white" iosBarStyle="dark-content" style={{ backgroundColor: 'white', alignItems:'center' }}>
          <Text style={{ color: 'black', fontSize: 24, flexDirection:'column', marginTop:-3}}>Total in </Text>
          <Picker
            mode="dialog"
            selectedValue= {this.state.selectedMonth}
            style={{height: 50, width: 145}}
            onValueChange={(itemValue) => {
              console.log(itemValue)
                this.setTotal(`${this.state.selectedYear}${itemValue}`, {selectedMonth: itemValue});
              }
            }>          
          {   
            ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((item, index) => {
              return <Picker.Item label={item} value={(index+1).toString()} key={index} />
            })
          }
          </Picker>
          <Picker
            mode="dialog"
            selectedValue= {this.state.selectedYear}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue) => {
              this.setTotal(`${this.state.selectedYear}${itemValue}`, {selectedYear: itemValue});
            }
            }>          
          {   
            new Array(3).fill()
            .map((item, index)=>{      
              return (new XDate(true).toString('yyyy') - index).toString();
            })
            .map((item, index) => {
              return <Picker.Item label={item} value={item} key={index} />
            })
          }
          </Picker>
        </Header>
        <Content
          padder
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
          style={{ flex: 1 }}>
          <Text style={{ justifyContent: 'center', fontWeight: 'bold', fontSize: 88 }}>{this.state.total}</Text>
        </Content>
      </Container>
    );
  }
}