import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MapView } from 'expo';

import { getSensors, getLocation } from '../api/service';


export default class HomeScreen extends React.Component {
  state = {
    latitude: undefined,
    longitude: undefined,
    locationDelta: undefined,
  };

  static navigationOptions = {
    title: 'Dashboard',
  };

  componentDidMount = () => {
    getLocation().then(res => {
      console.log(res);
      this.setState({
        latitude: res.location.lat,
        longitude: res.location.lng,
        locationDelta: res.accuracy/1000,
      });
    });
    setTimeout(() => {
      this.pullData()
    }, 500);
  };

  pullData = () => {
    getSensors().then(res => this.setState(res));
  };

  render() {
    const {
      latitude,
      longitude,
      locationDelta,
      weight,
      temperature,
      humidity,
    } = this.state;
    console.log(this.state);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.weightText}>Hello :)</Text>
          <Text style={styles.centerText}>Here is the location of your suitcase:</Text>
          {latitude && longitude && locationDelta &&
            <MapView
              style={styles.map}
              initialRegion={{
                latitude,
                longitude,
                latitudeDelta: locationDelta,
                longitudeDelta: locationDelta,
              }}
            />
          }
          <View style={styles.weightContainer}>
            <Text>The weight of your suitcase is</Text>
            <Text style={styles.weightText}>{weight} kg</Text>
          </View>

          <View style={styles.sensorsContainer}>
            <Text>The temperature is {temperature} °C,</Text>
            <Text>and there is {humidity}% humidity.</Text>
          </View>
          <Text style={styles.centerText}>Have a nice travel!</Text>

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
    height: 250,
    width: 250,
  },
  centerText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  weightText: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 35,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 20,
  },
  weightContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  sensorsContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginBottom: 10,
  },
});
