import React from 'react';
import { View, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MotionScreen extends React.Component {
  static navigationOptions = {
    title: 'Motion',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.containerUp}>
          <TouchableHighlight>
            <Button
              icon={
                <Icon
                  name="arrow-up"
                  size={100}
                />
              }
              title=""
              type="outline"
              onPress={() => {}}
            />
          </TouchableHighlight>
        </ScrollView>
        <ScrollView contentContainerStyle={styles.containerLeftRight}>
          <Button
            icon={
              <Icon
                name="arrow-left"
                size={100}
              />
            }
            title=""
            type="outline"
            onPress={() => {}}
          />
            <Button
              icon={
                <Icon
                  name="arrow-right"
                  size={100}
                />
              }
              title=""
              type="outline"
              onPress={() => {}}
            />
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
});
