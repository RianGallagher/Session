import React from 'react';
import GridView from 'react-native-super-grid';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';

export default (AltLogin = props => {
  return (
    <GridView
      itemDimension={130}
      items={props.items}
      style={styles.gridView}
      renderItem={item => (
        <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
          {item.type !== 'info' ? (
            <Text
              onPress={() => props.getRecommendations(item.name, item.code)}
              style={styles.itemName}
            >
              {item.name}
            </Text>
          ) : (
            <Text style={styles.gridPrompts}>{item.name}</Text>
          )}
          {item.type == 'addMore' ? (
            <TouchableHighlight onPress={() => props.addMoreBands()}>
              <Text style={styles.gridButton}>More</Text>
            </TouchableHighlight>
          ) : null}
          {item.type == 'button' ? (
            <TouchableHighlight onPress={() => props.saveUserSelection()}>
              <Text style={styles.gridButton}>Continue</Text>
            </TouchableHighlight>
          ) : null}
          {item.type == 'selectBand' ? (
            <TouchableHighlight>
              <Text
                onPress={() =>
                  props.selectFavBands(item.name, item.genre, item.code)
                }
                style={[styles.itemName, styles.selectButton]}
              />
            </TouchableHighlight>
          ) : null}
        </View>
      )}
    />
  );
});

const styles = StyleSheet.create({
  gridView: {
    backgroundColor: '#666',
    paddingTop: 25,
    flex: 1
  },
  itemContainer: {
    justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    height: 150
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600'
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff'
  },
  gridPrompts: {
    color: '#c0c0c0',
    fontSize: 18,
    fontWeight: '600'
  },
  gridButton: {
    paddingTop: 8,
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  buttonContainer: {
    paddingTop: 25,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  selectButton: {
    paddingTop: 25,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
