/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Tic Tac Toe
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: 'skyblue',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  }
})
