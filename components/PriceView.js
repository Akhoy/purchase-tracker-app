import React, { Component } from 'react';
import { Navigation } from "react-native-navigation";
import { Text, View, KeyboardAvoidingView, AsyncStorage, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Title, Button, Content, Form, Item, Input, Label, Icon } from 'native-base';
import event from '../event';

class Price extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: 0
        }
    }
    componentDidMount() {
        // Subscribe
        this.navigationEventListener = Navigation.events().bindComponent(this);
        this.getPrice();
    }
    componentWillUnmount() {
        if (this.navigationEventListener) {
            this.navigationEventListener.remove();
        }
    }
    getPrice() {
        AsyncStorage.getItem('price')
            .then((priceVal) => {
                let price = priceVal ? priceVal : 40;
                this.setState({ price });
            })
            .catch((error) => { throw error });
    }

    render() {
        return (
            <Container>
                <Header androidStatusBarColor="white" iosBarStyle="dark-content" style={{ backgroundColor: 'white', justifyContent: 'center' }}>
                    <Body>
                        <Title style={{ alignSelf: 'center', color: 'black', fontSize: 24 }}>Price of 1l. of milk</Title>
                    </Body>
                </Header>
                <Content
                    padder
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Form>
                            <Item stackedLabel>
                                <Label>Price</Label>
                                <Input value={this.state.price.toString()} keyboardType="numeric" onChangeText={price => this.setState({ price })} />
                            </Item>
                        </Form>
                    </View>
                    <View>
                        <Button style={styles.button} light iconRight onPress={async () => {
                            try {
                                AsyncStorage.setItem('price', this.state.price)
                                    .then(() => {
                                        alert('Price successfully saved.');
                                        event.emit('PriceChanged', { 'price': this.state.price });
                                    });
                            } catch (error) {
                                // Error saving data
                                alert(error);
                            }
                        }}>
                            <Text>Save</Text>
                            <Icon name="save" size={24} style={{ marginLeft: 10 }} type="MaterialIcons" />
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        justifyContent: 'center',
    },
});
export default Price;