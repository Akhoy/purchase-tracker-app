import { Navigation } from "react-native-navigation";
import CalendarView from "./components/CalendarView";
import FormView from "./components/FormView";
import TotalView from "./components/TotalView";
import PriceView from "./components/PriceView";

Navigation.registerComponent(`CalendarView`, () => CalendarView);
Navigation.registerComponent(`FormView`, () => FormView);
Navigation.registerComponent(`TotalView`, () => TotalView);
Navigation.registerComponent(`PriceView`, () => PriceView);

Navigation.events().registerAppLaunchedListener(() => {
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
              bottomTab:{
                selectedIconColor:'red'
              }
            },
            children: [
              {
                component: {
                  name: 'CalendarView',
                  id:'CalendarView',
                  options:{
                    statusBar:{
                      backgroundColor:'white',
                      style:'dark'
                    },
                    bottomTab: {
                      icon: require('./images/icons8-calendar-24.png'),
                      text:'Calendar'
                    }
                  }
                }
              }
            ]
          }
        },
        {
          component: {
            name: 'TotalView',
            options: {
              topBar: {
                visible: true,
                title:'test'
              },
              bottomTab: {
                icon: require('./images/icons8-calculator-24.png'),
                text:'Calculator',
                selectedIconColor:'red'
              },
              statusBar:{
                backgroundColor:'white',
                style:'dark'
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
                text:'Price',              
                selectedIconColor:'red'
              },
              statusBar:{
                backgroundColor:'white',
                style:'dark'
              }
            }
          }
        }]
      }
    }
  });
  
});
