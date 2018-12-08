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

export default ProfileScreen = (props) => {
  return(
    <View style={{flex: 1, flexDirection: 'column'}}>
      <ImageBackground source={require('../img/vinylSplash.jpg')} style={styles.imgBackground}>
      <TouchableHighlight onPress={() => props.navigation.navigate('ChatScreen')}>
        <View style={[ styles.bigButton, {backgroundColor: 'powderblue'} ]}>
        <Text style={ styles.profileText }>Groups</Text>
          <Text style={ styles.profileUnderText }>
            Jump in and get social! {'\n'}
            Chat about your favourite music, organise meet-ups, or get a jam session going.
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => props.navigation.navigate('Events')}>
        <View style={[ styles.bigButton, {backgroundColor: 'skyblue'} ]}>
        <Text style={ styles.profileText }>Live Events</Text>
        <Text style={ styles.profileUnderText }>
          Search for your favourite artists or see what's happening in your area
        </Text>
        </View>
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
    bigButton: {
      width: 325,
      height: 250,
      marginBottom: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff'
    },
    profileText: {
      textAlign: 'center',
      fontSize: 35,
      color: 'grey'
    },
    profileUnderText: {
      textAlign: 'center',
      textAlignVertical: 'center',
      marginTop: 40,
      fontSize: 20
    }
});
