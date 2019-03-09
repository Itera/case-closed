import React from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { writeTag, readTag } from '../api/service';

export default class ConfigScreen extends React.Component {
  state = {
    text: undefined
  };

  static navigationOptions = {
    title: 'Configuration',
  };

  componentWillMount = () => {
    readTag().then(res => this.setState({ text: res._bodyText }));
  };

  handleChange = event => {
    this.setState({ text: event.nativeEvent.text });
  };

  handleSubmit = () => {
    writeTag(this.state.text);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Enter text for luggage tag:</Text>
        <TextInput
          style={styles.input}
          onChange={this.handleChange}
          value={this.state.text}
          multiline={true}
        />
        <Button title="Submit" onPress={this.handleSubmit}/>
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
    marginBottom: 10,
    borderColor: '#ccc',
    borderRadius: 0.5,
    borderWidth: 2,
    paddingLeft: 10,
    height: 60,
  }

});
