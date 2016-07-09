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

export default class Cross extends Component {
  render() {
    const { xTranslate, yTranslate, color } = this.props
    return (
      <View style={[styles.container, {
        transform: [
          {translateX: (xTranslate ? xTranslate : 10) + 35},
          {translateY: (yTranslate ? yTranslate : 10) - 12},
        ]
      }]}>
        <View style={[styles.line, {
          transform: [
            {rotate: '45deg'},
          ],
          backgroundColor: color ? color : '#000'
        }]} />
        <View style={[styles.line, {
          transform: [
            {rotate: '135deg'},
          ],
          backgroundColor: color ? color : '#000'
        }]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 80,
    height: 80,
  },
  line: {
    position: 'absolute',
    width: 8,
    height: 105,
  },

})
