import React, { Component } from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import { Container, Header, Body, Title, Content, ListItem, Left, Right, Icon } from 'native-base';
import { Navigation } from "react-native-navigation";
class Settings extends Component {

    render() {
        return (
            <Container>
                <Header androidStatusBarColor="white" iosBarStyle="dark-content" style={{ backgroundColor: 'white', justifyContent: 'center' }}>
                    <Body>
                        <Title style={{ alignSelf: 'center', color: 'black', fontSize: 24 }}>Settings</Title>
                    </Body>
                </Header>
                <Content>
                    <FlatList
                        data={[{ key: 'Price' }]}
                        renderItem={({ item, index }) => {
                            return (
                                <ListItem style={{ height: 60 }} noIndent={true}
                                    onPress={() => {
                                        console.log(this.props.componentId)
                                        Navigation.push(this.props.componentId, {
                                            component: {
                                                name: 'PriceView',
                                                options: {
                                                    statusBar: {
                                                        backgroundColor: 'white',
                                                        style: 'dark'
                                                    }
                                                }
                                            }
                                        });
                                    }}
                                >
                                    <Left>
                                        <Text style={{ fontSize: 16, color: 'black' }}>
                                            {item.key}
                                        </Text>
                                    </Left>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </ListItem>
                            );
                        }}
                    />
                </Content>
            </Container>
        );
    }
}

export default Settings;