/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TextInput, Text, View, StyleSheet, Platform, Dimensions, KeyboardAvoidingView} from 'react-native';
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
          <Fab
            active={true}
            style={{ backgroundColor: 'rgba(231,76,60,1)' }}
            position="bottomRight"
            onPress={() => {
              this.props.navigation.navigate('Form');
              }}>
            <Icon name="add" />
            </Fab>
          </View>
      </View>
    );
  }
}

export class FormView extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
  }
  render() {
    const { goBack } = this.props.navigation;
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button transparent>
              <Icon
                name="md-arrow-round-back"
                size={24}
                color="white"
                onPress={() => goBack()}
              />
            </Button>
          </Left>
          <Body>
            <Title>Quantity</Title>
          </Body>
        </Header>
        <Content
          padder
          contentContainerStyle={{ flexGrow: 1  }}
          style={{ flex: 1}}>
          <View style={{ flex: 1, justifyContent: 'space-between'  }}>
            <Form>
              <Item stackedLabel>
                <Label>Quantity Purchased (in L)</Label>
                <Input autoFocus keyboardType="numeric" />
              </Item>
            </Form>
          </View>
          <KeyboardAvoidingView
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button
              light
              iconLeft
              style={styles.buttons}
              onPress={() => goBack()}>
              <Icon
                style={{ marginRight: 10 }}
                name="md-arrow-back"
                size={24}
              />
              <Text>Back</Text>
            </Button>
            <Button light iconRight style={styles.buttons}>
              <Text>Save</Text>
              <Icon name="md-save" size={24} style={{ marginLeft: 10 }} />
            </Button>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: CalendarView,
    Form: FormView
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
  buttons: {
    width: '49%',
    justifyContent: 'center',
  },
});
