/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View
} from 'react-native'

import Circle from './Circle'
import Cross from './Cross'
import { centerPoints, areas, conditions } from '../constants/game'

// If result === -1 game on going, result === 0 user won the game
// result === 1 AI won the game, result === 2 no winner,
export default class GameBoard extends Component {
  constructor() {
    super()
    this.state= {
      userInputs:[],
      AIInputs: [],
      result: -1
    }
  }

  restart() {
    this.restarting = true
    this.setState({
      userInputs: [],
      AIInputs: [],
      result: -1
    })
    setTimeout(() => {this.restarting = false}, 3)
  }

  boardClickHandler(e) {
    const { locationX, locationY } = e.nativeEvent
    const { userInputs, AIInputs, result } = this.state
    if (result !== -1) {
      return
    }
    const inputs = userInputs.concat(AIInputs)

    const area = areas.find(d =>
      (locationX >= d.startX && locationX <= d.endX) &&
      (locationY >= d.startY && locationY <= d.endY))

      if (area && inputs.every(d => d !== area.id)) {
        this.setState({ userInputs: userInputs.concat(area.id) })
        if (!this.judgeWinner(userInputs.concat(area.id))) {
          setTimeout(() => this.AIAction(), 3)
        }
      }
  }

  AIAction() {
    while(true) {
      const { userInputs, AIInputs } = this.state
      const inputs = userInputs.concat(AIInputs)

      const randomNumber = Number.parseInt(Math.random() * 9)
      if (inputs.every(d => d !== randomNumber)) {
        this.setState({ AIInputs: AIInputs.concat(randomNumber) })
        break
      }
    }
  }

  componentDidMount() {
    this.AIAction()
  }

  judgeWinner(inputs) {
    return conditions.some(d => d.every(item => inputs.indexOf(item) !== -1))
  }

  componentDidUpdate() {
    if (this.restarting) {
      return
    }
    const { userInputs, AIInputs, result } = this.state
    const inputs = userInputs.concat(AIInputs)

    if (inputs.length >= 5 ) {
      let res = this.judgeWinner(userInputs)
      if (res && result !== 0) {
        this.setState({ result: 0 })
        return
      }
      res = this.judgeWinner(AIInputs)
      if (res && result !== 1) {
        this.setState({ result: 1 })
        return
      }
    }

    if (inputs.length === 9 && result === -1 && result !== 2) {
      this.setState({ result: 2 })
    }
  }

  render() {
    const { userInputs, AIInputs, result } = this.state
    console.log(result);
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={e => this.boardClickHandler(e)}>
          <View style={styles.board}>
            <View
              style={styles.line}
            />
            <View
              style={[styles.line, {
                width: 3,
                height: 306,
                transform: [
                  {translateX: 200}
                ]
              }]}
            />
            <View
              style={[styles.line, {
                width: 306,
                height: 3,
                transform: [
                  {translateY: 100}
                ]
              }]}
            />
            <View
              style={[styles.line, {
                width: 306,
                height: 3,
                transform: [
                  {translateY: 200}
                ]
              }]}
            />
            {
              userInputs.map((d, i) => (
                <Circle
                  key={i}
                  xTranslate={centerPoints[d].x}
                  yTranslate={centerPoints[d].y}
                  color='deepskyblue'
                />
              ))
            }
            {
              AIInputs.map((d, i) => (
                <Cross
                  key={i}
                  xTranslate={centerPoints[d].x}
                  yTranslate={centerPoints[d].y}
                />
              ))
            }
          </View>
        </TouchableWithoutFeedback>
        { result === 2 && <Text style={styles.text}>Sorry, there is no winner.</Text> }
        { result === 0 && <Text style={styles.text}>You won the game!</Text> }
        { result === 1 && <Text style={styles.text}>AI won the game!</Text> }
        {
          result !== -1 && (
            <TouchableOpacity onPress={() => this.restart()}>
              <Text style={styles.instructions}>
                Click here to play again
              </Text>
            </TouchableOpacity>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  board: {
    width: 312,
    height: 312,
    borderWidth: 3,
    borderColor: '#000'
  },
  line: {
    position: 'absolute',
    width: 3,
    height: 306,
    backgroundColor: '#000',
    transform: [
      {translateX: 100}
    ]
  },
  text: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: 'bold'
  },
  instructions: {
    marginTop: 20,
    color: 'grey',
    marginBottom: 5,
  },
})
