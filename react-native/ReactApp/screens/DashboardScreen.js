import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MapView } from 'expo';


export default class HomeScreen extends React.Component {
  state = {
    weight: 32,
    temp: 18,
    humidity: 0.28,
    altitude: 0,
    latitude: 37.78825,
    longitude: -122.4324,
    locationDelta: 0.0922,
  };

  static navigationOptions = {
    title: 'Dashboard',
  };

  render() {
    const {
      latitude,
      longitude,
      locationDelta,
      weight,
      temp,
      humidity,
      altitude,
    } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: locationDelta,
              longitudeDelta: locationDelta,
            }}
          />
          <View style={styles.weightContainer}>
            <Text>The weight of your suitcase is:</Text>
            <Text style={styles.weightText}>{weight} kg</Text>
          </View>

          <View style={styles.sensorsContainer}>
            <Text>Temperature: {temp}</Text>
            <Text>Humidity: {humidity}</Text>
            <Text>Altitude: {altitude} m</Text>
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
  map: {
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 300,
    width: 300,
  },
  weightText: {
    marginTop: 10,
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
