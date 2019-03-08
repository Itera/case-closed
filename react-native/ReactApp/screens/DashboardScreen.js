import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';


export default class HomeScreen extends React.Component {
  state = {
    weight: 32,
    temp: 18,
    humidity: 0.28,
    altitude: 0,
  };

  static navigationOptions = {
    title: 'Dashboard',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.weightContainer}>
            <Text>The weight of your suitcase is:</Text>
            <Text style={styles.weightText}>{this.state.weight} kg</Text>
          </View>

          <View style={styles.sensorsContainer}>
            <Text>Temperature: {this.state.temp}</Text>
            <Text>Humidity: {this.state.humidity}</Text>
            <Text>Altitude: {this.state.altitude} m</Text>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  weightText: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 40,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  weightContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  sensorsContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
});
