import React, { Component } from 'react'
import { StyleSheet, Dimensions, Text, View, WebView } from 'react-native'
import CommonNav from '../common/CommonNav'

const WIDTH = Dimensions.get('window').width
const INNERWIDTH = WIDTH - 16
const HEIGHT = Dimensions.get('window').height

export default class App extends Component {
  //渲染
  render() {
    return (
      <View style={styles.container}>
        <CommonNav
          navigator={this.props.navigator}
          style={styles.nav}
          title={'联系我们'}
          navBarStyle={styles.nav}
          navStyle={styles.nav}
        />
        <WebView
          bounces={true}
          scalesPageToFit={true}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ uri: 'https://1ibrary.github.io/' }}
          style={styles.webview}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: 'rgb(242,246,250)'
  },
  container: {
    flex: 1
  },
  webview: {
    width: WIDTH,
    height: HEIGHT
  }
})
