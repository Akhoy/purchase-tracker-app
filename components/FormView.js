import React, { Component } from 'react';
import {Text, View, KeyboardAvoidingView, StyleSheet, AsyncStorage} from 'react-native';
import { Container, Header, Left, Body, Title, Button, Content, Form, Item, Input, Label, Icon } from 'native-base';
import { Navigation } from "react-native-navigation";
import { dayTextColor } from '../react-native-calendars/src/style';
export default class FormView extends Component {
    static navigationOptions = {
      header: null,
    };
    constructor(props) {
      super(props);
      console.log(props);
      this.qty = null;
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
                  onPress={() => {Navigation.pop(this.props.componentId)}}
                />
              </Button>
            </Left>
            <Body style={{justifyContent:'flex-start'}}>
              <Title style={{textAlign:'left'}}>{date ? date.toString('MMMM d') + ' milk purchase': ""}</Title>
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
                  <Input autoFocus keyboardType="numeric" onChangeText={data => this.qty = data } />
                </Item>
              </Form>
            </View>
            <KeyboardAvoidingView
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Button
                light
                iconLeft
                style={styles.buttons}
                onPress={()=> Navigation.pop(this.props.componentId)}>
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
                  //go back
                  Navigation.pop(this.props.componentId);
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