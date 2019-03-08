import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { takePicture } from "../api/service";


export default class CameraScreen extends React.Component {

  state = {
    img: undefined
  };

  static navigationOptions = {
    title: 'Camera',
  };

  handleTakePicture = () => {
    takePicture().then(res => {
      this.setState({img: res._bodyInit});
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Take a picture!</Text>
        <Button
          icon={
            <Icon
              name="camera"
              size={100}
            />
          }
          title=""
          type="clear"
          onPress={this.handleTakePicture}
        />
        <View>
          {this.state.img &&
            <Image
              source={{ uri: `data:image/png;base64,${this.state.img}`}}
              style={styles.imgStyle}
            />
          }
        </View>
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
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#ccc',
    borderRadius: 0.5,
    borderWidth: 2,
    paddingLeft: 10,
  },
  imgContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  imgStyle: {
    marginTop: 20,
    height: 300,
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

});
