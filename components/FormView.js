import React, { Component } from 'react';
import {Text, View, KeyboardAvoidingView, StyleSheet} from 'react-native';
import { Container, Header, Left, Body, Title, Button, Content, Form, Item, Input, Label, Icon } from 'native-base';
import { Navigation } from "react-native-navigation";
export default class FormView extends Component {
    static navigationOptions = {
      header: null,
    };
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <Container>
          <Header style={styles.header}>
            <Left>
              <Button transparent>
                <Icon
                  name="md-arrow-round-back"
                  size={24}
                  color="white"
                  onPress={() => {Navigation.pop(this.props.componentId)}}
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
                onPress={()=> Navigation.pop(this.props.componentId)}>
                <Icon
                  style={{ marginRight: 10 }}
                  name="arrow-back" type="MaterialIcons"
                  size={24}
                />
                <Text>Back</Text>
              </Button>
              <Button light iconRight style={styles.buttons}>
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