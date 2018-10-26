import React, { Component } from 'react';
import {
  createStackNavigator,
} from 'react-navigation';
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
import GridView, { SuperGridSectionList } from 'react-native-super-grid';

//Home Screen

class LoginView extends React.Component {

  constructor(props) {
    super(props);
    state = {
      email   : '',
      password: '',
    }
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  }

  render() {
      return (
        <View style={styles.container}>
        <ImageBackground source={require('./img/vinylSplash.jpg')} style={styles.imgBackground}>
          <Text style={styles.headerText}>Welcome</Text>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({email})}/>
          </View>

          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({password})}/>
          </View>

          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.buttonContainer, styles.spotifyButton]} onPress={() => this.props.navigation.navigate('SpotifyInitial')}>
            <Text style={styles.spotifyText}>Spotify</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.buttonContainer, styles.googleButton]} onPress={() => this.onClickListener('logingoogle')}>
            <Text style={styles.googleText}>Google</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
              <Text style={styles.sundryText}>Forgot your password?</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
              <Text style={styles.sundryText}>Register</Text>
          </TouchableHighlight>
          </ImageBackground>
        </View>
      );
  }
}

//Spotify Login

class SpotifyLoginInitial extends React.Component {

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  }

  render() {

  //should be populated via spotify API

    const items = [
  { name: 'Based on your Spotify history, you seem to love...', code: '#666'},
  { name: 'Genre', code: '#3498db' }, { name: 'Band', code: '#f39c12' },
  { name: 'Song', code: '#bdc3c7' },   { name: 'Genre', code: '#3498db' },
  { name: 'Genre', code: '#3498db' }, { name: 'Band', code: '#f39c12' },
  { name: 'Song', code: '#bdc3c7' },   { name: 'Genre', code: '#3498db' },
  { name: 'Genre', code: '#3498db' }, { name: 'Band', code: '#f39c12' },
  { name: 'Song', code: '#bdc3c7' },   { name: 'Genre', code: '#3498db' },
  { name: 'Continue', code: 'white'},
  ];
  //  <Text style={styles.itemCode}>{item.code}</Text>
  return (
          <GridView
            itemDimension={130}
            items={items}
            style={styles.gridView}
            renderItem={item => (
              <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
              {item.code!=='#666' ? <Text style={styles.itemName}>{item.name}</Text> : <Text style={styles.gridPrompts}>{item.name}</Text>}
              {item.code=='white' ?
              <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('Moving on swiftly')}>
                <Text>Continue</Text>
              </TouchableHighlight> : null }
              </View>
            )}
          />
      );
    }
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
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:250,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
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
  loginButton: {
    backgroundColor: "#000080",
  },
  loginText: {
    color: '#c0c0c0',
    fontSize: 20
  },
  spotifyButton: {
    backgroundColor: "#1DB954"
  },
  spotifyText: {
    color: "#191414",
    fontSize: 20
  },
  googleButton: {
    backgroundColor: "#DB4437"
  },
  googleText: {
    color: "white",
    fontSize: 20
  },
  headerText: {
    color: "#c0c0c0",
    fontSize: 44,
    marginBottom: 50
  },
  sundryText: {
    color: "#c0c0c0",
    fontSize: 20
  },
  gridView: {
  backgroundColor: '#666',
  paddingTop: 25,
  flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  gridPrompts: {
    color: '#c0c0c0',
    fontSize: 18
  }
});

const RootStack = createStackNavigator(
  {
    Home: {
      screen: LoginView,
      navigationOptions: {
        header: null,
      }
    },
    SpotifyInitial: {
      screen: SpotifyLoginInitial,
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
