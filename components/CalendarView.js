import React, { Component } from 'react';
import {View, Platform} from 'react-native';
import { Calendar } from '../react-native-calendars';
import { Icon, Fab } from 'native-base';
import { Navigation } from "react-native-navigation";
export default class CalendarView extends Component {    
    constructor(props) {  
      super(props);    
    }
  
    render() {
      return (
        <View>
        <View behavior={(Platform.OS === 'ios') ? 'padding' : null} enabled>
          <Calendar theme={{
            'stylesheet.day.basic':{
              'base':{
                width:'100%',
                height:90,
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
            <Fab
              active={true}
              containerStyle={{ }}
              style={{ backgroundColor: 'rgba(231,76,60,1)' }}
              position="bottomRight"
              onPress={() => {
                Navigation.push(this.props.componentId, {
                  component: {
                    name: 'FormView'
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