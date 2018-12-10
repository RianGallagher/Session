import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ScrollView,
  Button,
  Image,
  ImageBackground,
  Alert
} from 'react-native';
import GridView from 'react-native-super-grid';
import Hyperlink from 'react-native-hyperlink';
import Hr from 'react-native-hr-plus';

export default Events = (props) => {
    return(
      <View style={styles.container}>
        <ImageBackground source={require('../img/vinylSplash.jpg')} style={styles.imgBackground}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/dusk/64/000000/music-record.png'}}/>
          <TextInput style={[styles.inputs, {marginTop: 10}]} name='artist' value={props.artist} type ='input'
              placeholder="Artist"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={props.handleArtistChange}
          />
        </View>

          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/color/48/000000/international-music.png'}}/>
            <TextInput style={styles.inputs} name='location' value={props.location} type ='input'
                placeholder="Location"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={props.handleLocationChange}
            />
          </View>

          <TouchableHighlight style={[styles.buttonContainer, styles.searchButton]} onPress={() => props.songkickSearch()}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableHighlight>

          <ScrollView style={styles.eventBucket}>
            <Text style={styles.profileText}>Events</Text>
            {props.renderEvents()}
          </ScrollView>

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
  searchButton: {
    backgroundColor: "#000080",
  },
  searchText: {
    color: '#c0c0c0',
    fontSize: 20
  },
  eventBucket: {
    width: 325,
    height: 250,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'powderblue',
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
