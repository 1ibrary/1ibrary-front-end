import React, { Component } from 'React'
import LoginPage from './LoginPage'
import HomePage from "./HomePage"
import SearchPage from "./SearchPage"
import {Scene, Router, ActionConst,Actions} from 'react-native-router-flux'
import * as scenes from '../constants/scene'

export default class AppRouter extends Component {
  render() {
    return (
        <Router>
          <Scene key="root">
              <Scene
                  key={scenes.SCENE_LOGIN}
                  component={LoginPage}
                  title="登录"
                  type={ActionConst.RESET}
                  hideNavBar
              />
              <Scene
                  key={scenes.SCENE_INDEX}
                  component={HomePage}
                  title="首页"
                  type={ActionConst.REPLACE}
                  hideNavBar
                  duration="0"
                  />
              <Scene
                  key={scenes.SCENE_SEARCH}
                  component = {SearchPage}
                  type={ActionConst.PUSH}
                  title="搜索"
                  hideNavBar
                  duration="0"
                  />
          </Scene>
        </Router>
    )
  }
}