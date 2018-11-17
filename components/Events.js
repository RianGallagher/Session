import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Button,
  Image,
  ImageBackground,
  Alert
} from 'react-native';

export default Events = () => {
  return(
    <View style={styles.container}>
      <ImageBackground source={require('../img/vinylSplash.jpg')} style={styles.imgBackground}>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FF8300',
  },
  imgBackground: {
      width: '100%',
      height: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
});
