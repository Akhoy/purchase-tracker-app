import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView, StyleSheet, Keyboard, TextInput } from 'react-native';
import { Container, Header, Left, Body, Title, Button, Content, Form, Item, Label, Icon, Input } from 'native-base';
import { Navigation } from "react-native-navigation";

export default class FormView extends Component {

  static navigationOptions = {
    header: null,
  };
  //rookie mistake - use arrow function / .bind(this) to refer to class variable. cuz if not, this refers to global state - not the component state
  constructor(props) {
    super(props);
    console.log(props);
    this.qty = null;
    this.isKeyboardOpen = false;
    this.goBack = false;
    this.componentId = this.props.componentId;
  }

  componentDidMount () {
    this.commandCompletedListener = Navigation.events().registerCommandCompletedListener(({ commandId, completionTime, params }) => {
      this.textInput._root.focus();
    });
      
  }

  componentWillUnmount(){
    this.commandCompletedListener.remove();
  }

  render() {
    let date = this.props.date;
    return (
      <Container style={{flex:1}}>
        <Header androidStatusBarColor="white" iosBarStyle="dark-content" style={{ backgroundColor: 'white'}}>
          <Left>
            <Button transparent>
              <Icon style={{color:'black'}}
                name="md-arrow-round-back"
                onPress={() => {
                  Keyboard.dismiss();
                  Navigation.pop(this.props.componentId);
                }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{color:'black'}}>{date ? date.toString('MMMM d') + ' milk purchase' : ""}</Title>
          </Body>
        </Header>
        <Content
          padder
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flex: 1 }}>
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} style={{ flex: 1, justifyContent: 'space-between' }}>
            <Form>
              <Item stackedLabel>
                <Label>Quantity Purchased (in L)</Label>
                <Input ref={(input) => { this.textInput = input; }} keyboardType="numeric" onChangeText={data => this.qty = data} />
              </Item>
            </Form>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button
              dark
              iconLeft
              style={styles.buttons}
              onPress={() => {
                Keyboard.dismiss();
                Navigation.pop(this.props.componentId);                
              }}>
              <Icon
                style={{ marginRight: 10 }}
                name="arrow-back" type="MaterialIcons"
                size={24}
              />
              <Text style={styles.buttonText}>BACK</Text>
            </Button>
            <Button dark iconRight style={styles.buttons} onPress={async () => {
              try {
                await this.props.callback(this.qty);
                Keyboard.dismiss();
                Navigation.pop(this.props.componentId);  
              } catch (error) {
                // Error saving data
                alert(error);
              }
            }}>
              <Text style={styles.buttonText}>SAVE</Text>
              <Icon name="save" size={24} style={{ marginLeft: 10 }} type="MaterialIcons" />
            </Button>
          </View>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    width: '49%',
    height:45,
    justifyContent: 'center',
    backgroundColor:'black'
  },
  buttonText:{
    color:'white',
    fontSize:18
  }
});