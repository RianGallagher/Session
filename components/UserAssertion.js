import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  Image,
  ImageBackground,
  Alert
} from 'react-native';

export default UserAssertion = (props) => {
  return(
    <View style={styles.container}>
      <ImageBackground source={require('../img/vinylSplash.jpg')} style={styles.imgBackground}>
        <Text style={styles.headerText}>Are we right?</Text>
        <TouchableHighlight style={[styles.buttonContainer, styles.spotifyButton]} onPress={() => props.navigation.navigate('ProfileScreen')}>
          <Text style={styles.spotifyText}>Yeah!</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => props.navigation.navigate('AltLogin')}>
          <Text style={styles.loginText}>No, pick manually</Text>
        </TouchableHighlight>
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
    buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
    },
    spotifyButton: {
        backgroundColor: "#1DB954"
    },
    spotifyText: {
        color: "#191414",
        fontSize: 20
    },
    loginButton: {
        backgroundColor: "#000080",
    },
    loginText: {
        color: '#c0c0c0',
        fontSize: 20
    },
});
