import React, { Component } from 'react';
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

export default class AltLogin extends React.Component {

    onClickListener = (viewId) => {
      Alert.alert("Alert", "Button pressed " + viewId);
    }

    render() {

    //should be populated via spotify API (most popular listings), have to find a way to make gridView expand on click

    const showBands = { name: 'Band', code: '#f39c12' };

      const items = [
    { name: 'Tell us what you love...', code: '#666', type: 'info'},
    { name: 'Genre', code: '#666' }, { name: 'Band', code: '#f39c12' },
    { name: 'Song', code: '#bdc3c7' },   { name: 'Genre', code: '#3498db', type: 'genreExpand' },
    // { name: 'Genre', code: '#3498db' }, { name: 'Band', code: '#f39c12' },
    // { name: 'Song', code: '#bdc3c7' },   { name: 'Genre', code: '#3498db' },
    // { name: 'Genre', code: '#3498db' }, { name: 'Band', code: '#f39c12' },
    // { name: 'Song', code: '#bdc3c7' },   { name: 'Genre', code: '#3498db' },
    // { name: '', code: '#666', type: 'button'},
    ];
    //  <Text style={styles.itemCode}>{item.code}</Text>

    function addBandJson(){
      items.push(showBands);
    }
    return (
            <GridView
              itemDimension={130}
              items={items}
              style={styles.gridView}
              renderItem={item => (
                <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                {item.type !== 'info' ? <Text style={styles.itemName}>{item.name}</Text> : <Text style={styles.gridPrompts}>{item.name}</Text>}
                {item.type == 'button' ?
                <TouchableHighlight onPress={() => this.props.navigation.navigate('ProfileScreen')}>
                  <Text style={styles.gridButton}>Continue</Text>
                </TouchableHighlight> : null }
                {item.type == 'genreExpand' ? 
                <TouchableHighlight onPress = {() => addBandJson()}>
                  <Text></Text>
                </TouchableHighlight> : null }
                </View>
              )}
            />
        );
      }
    }

const styles = StyleSheet.create({
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
    fontSize: 18,
    fontWeight: '600'
  },
  gridButton: {
    paddingTop: 8,
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
});