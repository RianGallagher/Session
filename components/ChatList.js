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
  Alert,
  FlatList,
} from 'react-native';
import { List, ListItem } from 'react-native-elements'

export default ChatList = (props) => {
  console.log('channel list', props.channelList);
  return(
    <List>
      <FlatList
        data={props.channelList}
        keyExtractor={item => item.url}
        renderItem={ ({item}) => (
            <ListItem
              roundAvatar
              title={item.name}
              avatar={ {uri: item.coverUrl} }
              onPress={() => props.navigateToChat(item.url)}
            />
        )}
      />
    </List>
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
