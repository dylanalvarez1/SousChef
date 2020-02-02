import React, { Component } from 'react';
import {View, TextInput, Text, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class HomeScreen extends Component {
    static navigationOptions = {
      title: 'Welcome',
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View>
          <Text>Test</Text>
          <TouchableOpacity
            onPress={() => navigate('Camera', {name: 'Jane'})}
          >
            <Text>Press me</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }