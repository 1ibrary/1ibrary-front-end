import React, { Component } from 'react'
import {
  View
} from 'react-native'
import RNSplashScreen from 'react-native-splash-screen'
import { Actions } from 'react-native-router-flux'
import { SCENE_LOGIN } from './constants/scene'

class SplashScreen extends Component {

  componentWillMount () {
    Actions[SCENE_LOGIN]()
    RNSplashScreen.hide()
  }

  render () {
    return <View />
  }
}

export default SplashScreen

console.disableYellowBox = true

/**
 * RN-BUGS
 * 在Debug环境下console.dir有效，
 * 生产环境下console.dir为undefined。所以需要打个补丁
 * 以下补丁同理
 */
if (!(console.dir instanceof Function)) {
  console.dir = console.log
}

if (!(console.time instanceof Function)) {
  console.time = console.log
}

if (!(console.timeEnd instanceof Function)) {
  console.timeEnd = console.log
}
