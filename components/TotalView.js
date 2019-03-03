import React, { Component } from 'react';
import { Navigation } from "react-native-navigation";
import { Text, View, Platform, AsyncStorage, StatusBar } from 'react-native';
import { Container, Header, Left, Body, Title, Button, Content, Form, Item, Input, Label, Icon } from 'native-base';
import XDate from 'xdate';
import event from '../event';

export default class Total extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0
    }
  }
  componentDidMount() {
    // Subscribe
    this.navigationEventListener = Navigation.events().bindComponent(this);    
  }
  componentWillUnmount(){
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }    
  }
  componentDidAppear() {
    this.GetTotal();
  }
  GetTotal = () => {
    //for now, will calculate total for the current month. later, will add a dropdown to select the month
    AsyncStorage.getItem(`@PurchaseTracker:${new XDate(true).toString('yyyyMM')}`).then((dateQtyArray) => {
      dateQtyArray = dateQtyArray ? JSON.parse(dateQtyArray) : null;
      let total = 0;
      if (dateQtyArray) {
        //add the quantities
        dateQtyArray.forEach(element => {
          total += (+element.quantity * element.price);
        });
        this.setState({total});
      }
    });
  }
  render() {
    
    return (
      <Container style={{ height: '100%' }}>
        <Header androidStatusBarColor="white" iosBarStyle="dark-content" style={{ backgroundColor: 'white', justifyContent: 'center' }}>
          <Body style={{ textAlign: 'center' }}>
            <Title style={{ alignSelf: 'center', color: 'black', fontSize:24 }}>Total in {new XDate(true).toString("MMM")}</Title>
          </Body>
        </Header>
        <Content
          padder
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
          style={{ flex: 1 }}>
          <Text style={{ justifyContent: 'center', fontWeight: 'bold', fontSize:88}}>{this.state.total}</Text>
        </Content>
      </Container>
    );
  }
}