import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView, StyleSheet, Keyboard, Platform } from 'react-native';
import { Container, Header, Left, Body, Title, Button, Content, Form, Item, Input, Label, Icon } from 'native-base';
import { Navigation } from "react-native-navigation";

export default class FormView extends Component {

  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    console.log(props);
    this.qty = null;
    this.isKeyboardOpen = false;
    this.goBack = false;
  }
  goBackFunc() {
    if (this.isKeyboardOpen) {
      this.goBack = true;
      Keyboard.dismiss();
    }
    else {
      //go back
      Navigation.pop(this.props.componentId);
      //show tabs
      Navigation.mergeOptions('BottomTabsId', {
        bottomTabs: {
          visible: true,
          ...Platform.select({ android: { drawBehind: false, animate: false } })
        },
      });
    }
  }

  _keyboardDidShow() {
    this.isKeyboardOpen = true;
    console.log('this.iskeyboardopen in event listerberkeybowrd did show ' + this.isKeyboardOpen);
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    new Promise((resolve, reject) => {
      const didListener = Keyboard.addListener('keyboardDidHide', () => {
        this.isKeyboardOpen = false;
        //this.goback check added here to differentiate other keyboard hide events. this promise should only resolve if going back so as to pop from the stack
        if (this.goBack) {
          didListener.remove();
          resolve();
        }
      })
    }).then(() => {
      console.log('inside promise done!')
      this.goBackFunc();
    });

  }

  render() {
    let date = this.props.date;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon
                name="md-arrow-round-back"
                color="white"
                onPress={() => this.goBackFunc()}
              />
            </Button>
          </Left>
          <Body style={{ justifyContent: 'flex-start' }}>
            <Title style={{ textAlign: 'left' }}>{date ? date.toString('MMMM d') + ' milk purchase' : ""}</Title>
          </Body>
        </Header>
        <Content
          padder
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <Form>
              <Item stackedLabel>
                <Label>Quantity Purchased (in L)</Label>
                <Input autoFocus keyboardType="numeric" onChangeText={data => this.qty = data} />
              </Item>
            </Form>
          </View>
          <KeyboardAvoidingView
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button
              light
              iconLeft
              style={styles.buttons}
              onPress={() => this.goBackFunc()}>
              <Icon
                style={{ marginRight: 10 }}
                name="arrow-back" type="MaterialIcons"
                size={24}
              />
              <Text>Back</Text>
            </Button>
            <Button light iconRight style={styles.buttons} onPress={async () => {
              try {
                await this.props.callback(this.qty);
                this.goBackFunc();
              } catch (error) {
                // Error saving data
                alert(error);
              }
            }}>
              <Text>Save</Text>
              <Icon name="save" size={24} style={{ marginLeft: 10 }} type="MaterialIcons" />
            </Button>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    width: '49%',
    justifyContent: 'center',
  },
});