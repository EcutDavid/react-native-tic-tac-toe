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
import {
  CENTER_POINTS,
  AREAS,
  CONDITIONS,
  GAME_RESULT_NO,
  GAME_RESULT_USER,
  GAME_RESULT_AI,
  GAME_RESULT_TIE
} from '../constants/game'

export default class GameBoard extends Component {
  constructor() {
    super()
    this.state= {
      userInputs: [],
      AIInputs: [],
      result: GAME_RESULT_NO
    }
  }

  restart() {
    this.restarting = true
    this.setState({
      userInputs: [],
      AIInputs: [],
      result: GAME_RESULT_NO
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

    const area = AREAS.find(d =>
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

      const randomNumber = Number.parseInt(Math.random() * 8.9)
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
    return CONDITIONS.some(d => d.every(item => inputs.indexOf(item) !== -1))
  }

  componentDidUpdate() {
    if (this.restarting) {
      return
    }
    const { userInputs, AIInputs, result } = this.state
    const inputs = userInputs.concat(AIInputs)

    if (inputs.length >= 5 ) {
      let res = this.judgeWinner(userInputs)
      if (res && result !== GAME_RESULT_USER) {
        this.setState({ result: GAME_RESULT_USER })
        return
      }
      res = this.judgeWinner(AIInputs)
      if (res && result !== GAME_RESULT_AI) {
        this.setState({ result: GAME_RESULT_AI })
        return
      }
    }

    if (inputs.length === 9 &&
        result === GAME_RESULT_NO && result !== GAME_RESULT_TIE) {
      this.setState({ result: GAME_RESULT_TIE })
    }
  }

  render() {
    const { userInputs, AIInputs, result } = this.state
    console.log(userInputs);
    console.log(AIInputs);
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
                  xTranslate={CENTER_POINTS[d].x}
                  yTranslate={CENTER_POINTS[d].y}
                  color='deepskyblue'
                />
              ))
            }
            {
              AIInputs.map((d, i) => (
                <Cross
                  key={i}
                  xTranslate={CENTER_POINTS[d].x}
                  yTranslate={CENTER_POINTS[d].y}
                />
              ))
            }
          </View>
        </TouchableWithoutFeedback>
        { result === GAME_RESULT_USER && <Text style={styles.text}>You won the game!</Text> }
        { result === GAME_RESULT_AI && <Text style={styles.text}>AI won the game!</Text> }
        { result === GAME_RESULT_TIE && <Text style={styles.text}>Tie</Text> }
        {
          result !== GAME_RESULT_NO && (
            <TouchableOpacity onPress={() => this.restart()}>
              <Text style={styles.instructions}>
                Touch here to play again
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
