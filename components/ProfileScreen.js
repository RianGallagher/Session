import React, { Component } from 'react';
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

export default class ProfileScreen extends React.Component {

    onClickListener = (viewId) => {
      Alert.alert("Alert", "Button pressed " + viewId);
    }

    _onPressButton() {
      Alert.alert('You tapped the button!')
    }

    render(){
      return(
        <View style={{flex: 1, flexDirection: 'column'}}>
          <ImageBackground source={require('../img/vinylSplash.jpg')} style={styles.imgBackground}>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/color/search'}}/>
            <TextInput style={styles.inputs}
                placeholder="Search"
                underlineColorAndroid='transparent'
                onChangeText={(query) => this.setState({query})}/>
          </View>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('ChatScreen')}>
            <View style={{width: 325, height: 225, backgroundColor: 'powderblue', marginBottom: 10}}>
            <Text>Your Groups/Followed</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Events')}>
            <View style={{width: 325, height: 125, backgroundColor: 'skyblue', marginBottom: 10}}>
            <Text>upcoming Events</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('SuggestedList')}>
            <View style={{width: 325, height: 75, backgroundColor: 'steelblue'}}>
            <Text>Suggested</Text>
            </View>
          </TouchableHighlight>
          </ImageBackground>
        </View>
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
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    },
    inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
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
