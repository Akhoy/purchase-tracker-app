import XDate from 'xdate';
import {Component} from 'react';
import {Text, View, StyleSheet, Platform, Dimensions, KeyboardAvoidingView} from 'react-native';
import { Navigation } from "react-native-navigation";
import CalendarView from "./components/CalendarView";
import FormView from "./components/FormView";

/*export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedDay:XDate(true)
    }
  }
  componentDidMount(){
    
  }

}
*/
Navigation.registerComponent(`CalendarView`, () => CalendarView);
Navigation.registerComponent(`FormView`, () => FormView);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        options: {
          topBar: {
            visible: false,
            height:0
          }
        },
        children: [
          {
            component: {
              name: 'CalendarView'
            }
          }
        ]
      }
    }
  });
});
Navigation.registerComponent(`CalendarView`, () => CalendarView);
Navigation.registerComponent(`FormView`, () => FormView);
