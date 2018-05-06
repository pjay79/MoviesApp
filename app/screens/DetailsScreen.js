import React, { Component } from 'react';
import { Platform, TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BackIcon from 'react-native-vector-icons/Ionicons';

export default class DetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Details',
    headerStyle: {
      backgroundColor: 'lightpink',
      elevation: 0,
      borderBottomWidth: 0,
    },
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackIcon
          name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
          size={30}
          color="white"
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    ),
    headerTintColor: 'white',
    tabBarIcon: ({ tintColor }) => <Icon name="book-open-variant" size={24} color={tintColor} />,
  });

  render() {
    return (
      <View>
        <Text>Add movies...</Text>
      </View>
    );
  }
}
