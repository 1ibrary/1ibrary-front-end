import React, { Component } from 'React'
import WelcomePage from './WelcomePage'
import {Scene, Router, ActionConst,Actions} from 'react-native-router-flux'

export default class AppRouter extends Component {
  render() {
    return (
        <Router>
          <Scene key="root">
              <Scene
                  key="login"
                  component={WelcomePage}
                  title="登录"
                  type={ActionConst.RESET}
                  hideNavBar
              />
          </Scene>
        </Router>
    )
  }
}