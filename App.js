import { Navigation } from "react-native-navigation";
import CalendarView from "./components/CalendarView";
import FormView from "./components/FormView";
import TotalView from "./components/TotalView";
import PriceView from "./components/PriceView";


Navigation.registerComponent(`CalendarView`, () => CalendarView);
Navigation.registerComponent(`FormView`, () => FormView);
Navigation.registerComponent(`TotalView`, () => TotalView);
Navigation.registerComponent(`PriceView`, () => PriceView);
Navigation.setRoot({
  root: {
    bottomTabs: { 
      children: [{
        stack: {
          options: {  
            topBar: {
              visible: false,
              height:0
            },
            bottomTab: {
              text: 'Calendar',
              icon: require('./images/calendar.png')
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
      },
      {
        component: {
          name: 'TotalView',
          options: {
            bottomTab: {
              text: 'Total',
              icon: require('./images/total.png')
            }
          }
        }
      },
      {
        component: {
          name: 'PriceView',
          options: {
            bottomTab: {
              text: 'Price',
              icon: require('./images/rupee.png')
            }
          }
        }
      }]
    }
  }
});

