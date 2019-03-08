import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default class ConfigScreen extends React.Component {
  state = {
    text: "12345678, Adr. Oslo"
  };

  static navigationOptions = {
    title: 'Configuration',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Enter text for luggage tag:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#fff',
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#ccc',
    borderRadius: 0.5,
    borderWidth: 2,
    paddingLeft: 10,
  }

});
