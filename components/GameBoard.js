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

import Circle from './Circle'
import Cross from './Cross'

const ceterPoints = [
  { x: 10, y:10 },
  { x: 113, y:10 },
  { x: 213, y:10 },
  { x: 10, y:113 },
  { x: 113, y:113 },
  { x: 213, y:113 },
  { x: 10, y:213 },
  { x: 113, y:213 },
  { x: 213, y:213 },
]

export default class GameBoard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.board}>
          <View
            style={{
              position: 'absolute',
              width: 3,
              height: 306,
              backgroundColor: '#000',
              transform: [
                {translateX: 100}
              ]
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: 3,
              height: 306,
              backgroundColor: '#000',
              transform: [
                {translateX: 200}
              ]
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: 306,
              height: 3,
              backgroundColor: '#000',
              transform: [
                {translateY: 100}
              ]
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: 306,
              height: 3,
              backgroundColor: '#000',
              transform: [
                {translateY: 200}
              ]
            }}
          />
          {
            ceterPoints.map(d => {
              return (<Cross xTranslate={d.x} yTranslate={d.y} />)
            })
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row'
  },
  board: {
    width: 312,
    height: 312,
    borderWidth: 3,
    borderColor: '#000'
  }
})
