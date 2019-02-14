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
      id: 'BottomTabsId',
      options:{
        bottomTabs:{
          titleDisplayMode: 'alwaysHide'
        }
      },
      children: [{
        stack: {
          options: {  
            topBar: {
              visible: false,
              height:0
            },
            bottomTab: {
              icon: require('./images/icons8-calendar-24.png'),
              text:'Calendar'
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
              icon: require('./images/icons8-calculator-24.png'),
              text:'Calculator'
            }
          }
        }
      },
      {
        component: {
          name: 'PriceView',
          options: {
            bottomTab: {
              icon: require('./images/icons8-rupee-24.png'),
              text:'Price'
            }
          }
        }
      }]
    }
  }
});

