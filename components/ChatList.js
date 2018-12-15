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
  Container
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

export default (ChatList = props => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 10 }}>
        <FlatList
          data={props.channelList}
          keyExtractor={item => item.url}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.name}
              avatar={{ uri: item.coverUrl }}
              onPress={() => props.navigateToChat(item.url)}
            />
          )}
        />
      </View>
      <View style={{ flex: 0.5 }}>
        <Button onPress={props.getMoreChannels} title="More" />
      </View>
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
  sundryText: {
    color: '#c0c0c0',
    fontSize: 20
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  }
});
