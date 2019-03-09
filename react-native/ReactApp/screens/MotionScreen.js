import React from 'react';
import { View, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { move } from '../api/service';

export default class MotionScreen extends React.Component {
  static navigationOptions = {
    title: 'Motion',
  };

  handleStraight = () => {
    move('straight');
  };

  handleLeft = () => {
    move('left');
  };

  handleRight = () => {
    move('right');
  };

  handleStop = () => {
    move('stop');
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.containerUp}>
          <TouchableHighlight
            onPress={() => {}}
            onShowUnderlay={this.handleStraight}
            onHideUnderlay={this.handleStop}
          >
            <Icon
              name="arrow-up"
              size={100}
              style={styles.icon}
            />
          </TouchableHighlight>
        </ScrollView>
        <ScrollView contentContainerStyle={styles.containerLeftRight}>
          <TouchableHighlight
            onPress={() => {}}
            onShowUnderlay={this.handleLeft}
            onHideUnderlay={this.handleStop}
          >
            <Icon
              name="arrow-left"
              size={100}
              style={styles.icon}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {}}
            onShowUnderlay={this.handleRight}
            onHideUnderlay={this.handleStop}
          >
            <Icon
              name="arrow-right"
              size={100}
              style={styles.icon}
            />
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    backgroundColor: '#fff',
  },
  containerUp: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerLeftRight: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    borderColor: '#eee',
    borderWidth: 2,
    padding: 3,
  },
});
