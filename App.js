/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TextInput, View, StyleSheet, Platform, Dimensions} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload blah blah,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap on your keyboard to reload. \n'
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    console.log(Dimensions.get('window').height);
    return (
      
      <View>
      <View contentContainerStyle={{marginTop:-20}} behavior={(Platform.OS === 'ios') ? 'padding' : null} enabled>
        <Calendar style={styles.calendar} theme={{
          'stylesheet.day.basic':{
            'base':{
              width:'100%', 
              height:90,
              borderLeftColor:'lightgrey',
              borderLeftWidth:1,
              borderBottomColor:'lightgrey',
              borderBottomWidth:1,
              textAlign:'center',
              justifyContent:'center',
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
      )
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
