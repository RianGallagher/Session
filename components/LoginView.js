import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  ImageBackground,
  Alert
} from 'react-native';

//pure presentational, stateless Component
export default (LoginView = props => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/vinylSplash.jpg')}
        style={styles.imgBackground}
      >
        <Text style={styles.headerText}>Welcome</Text>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri:
                'https://img.icons8.com/ultraviolet/50/000000/gender-neutral-user.png'
            }}
          />
          <TextInput
            style={styles.inputs}
            name="username"
            value={props.username}
            type="input"
            placeholder="Username"
            underlineColorAndroid="transparent"
            onChangeText={props.handleUsernameChange}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'
            }}
          />
          <TextInput
            style={styles.inputs}
            name="email"
            value={props.email}
            type="input"
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={props.handleEmailChange}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'
            }}
          />
          <TextInput
            style={styles.inputs}
            name="password"
            value={props.password}
            type="input"
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={props.handlePasswordChange}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => props.login()}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.spotifyButton]}
          onPress={() => props.spotifyLogin()}
        >
          <Text style={styles.spotifyText}>Spotify</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => props.passwordReminder()}
        >
          <Text style={styles.sundryText}>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => props.registerUser()}
        >
          <Text style={styles.sundryText}>Register</Text>
        </TouchableHighlight>
      </ImageBackground>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: '#000080'
  },
  loginText: {
    color: '#c0c0c0',
    fontSize: 20
  },
  spotifyButton: {
    backgroundColor: '#1DB954'
  },
  spotifyText: {
    color: '#191414',
    fontSize: 20
  },
  headerText: {
    color: '#c0c0c0',
    fontSize: 44,
    marginBottom: 50
  },
  sundryText: {
    color: '#c0c0c0',
    fontSize: 20
  }
});
