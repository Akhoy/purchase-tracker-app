import React, { Component } from 'react';
import {View, Platform} from 'react-native';
import { Calendar } from '../react-native-calendars';
import { Icon, Fab } from 'native-base';
import { Navigation } from "react-native-navigation";
import XDate from 'xdate';
export default class CalendarView extends Component {    
    constructor(props) {  
      super(props); 
      var xDate = new XDate(true);
      this.state = {
          selectedDate:{dateString:xDate.toString('yyyy-MM-dd'), day:xDate.getDate(), month:xDate.getMonth()+1, timestamp:0, year:xDate.getFullYear()}
      }   
    }
    
    render() {        
            ({year, month, day} = this.state.selectedDate);
            console.log(new XDate(year, month-1, day));
            //console.log(this.state.selectedDate);
        
        
      return (
        <View>
        <View behavior={(Platform.OS === 'ios') ? 'padding' : null} enabled>
          <Calendar onDayPress={(day) => {
              this.setState({selectedDate:day})
            }} theme={{
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
                    name: 'FormView',
                    passProps: {
                        text: new XDate(this.state.selectedDate.dateString)
                      },
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