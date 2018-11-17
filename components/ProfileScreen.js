import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ImageBackground,
  Alert
} from 'react-native';

export default ProfileScreen = () => {
  return(
    <View style={styles.container}>
      <ImageBackground source={require('../img/vinylSplash.jpg')} style={styles.imgBackground}>
        <Text style={styles.headerText}>Welcome Home Fuckface, This is 3 from the wireframes, The profile/home screen</Text>
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
    headerText: {
        color: "#c0c0c0",
        fontSize: 44,
        marginBottom: 50
    },
});
