/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TextInput, View, StyleSheet, Platform, Dimensions, KeyboardAvoidingView} from 'react-native';
import { Calendar, CalendarList, Agenda } from './react-native-calendars';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Content,
  Form,
  Item,
  Input,
  Label,
  Icon, Fab
} from 'native-base';
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload blah blah,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap on your keyboard to reload. \n'
});

type Props = {};
export class CalendarView extends Component<Props> {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
      <View contentContainerStyle={{marginTop:-20}} behavior={(Platform.OS === 'ios') ? 'padding' : null} enabled>
        <Calendar style={styles.calendar} theme={{
          'stylesheet.day.basic':{
            'base':{
              width:'100%',
              borderLeftColor:'lightgrey',              
              borderBottomWidth:1,
              borderBottomColor:'lightgrey',
              textAlign:'center',
              justifyContent:'flex-start',
              alignItems:'center'
              }
            },
            'stylesheet.calendar.main':{
              week: {
                marginTop: 0,
                marginBottom: 0,
                flexDirection: 'row'
              }
            }
          }}/>
          </View>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: CalendarView
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
  }
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
