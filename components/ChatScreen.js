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

export default ChatScreen = (props) => {
  console.log(props);
  return(
    <View style={styles.container}>
      <ImageBackground source={require('../img/vinylSplash.jpg')} style={styles.imgBackground}>
        <TouchableHighlight style={styles.buttonContainer} onPress={() => props.getOpenChats()}>
            <Text style={styles.sundryText}>Chats</Text>
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
  sundryText: {
    color: "#c0c0c0",
    fontSize: 20
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
});
