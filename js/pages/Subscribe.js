import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import BookList from '../components/BookList'
import SearchNav_Welcome from '../components/SearchNavHomePage'
import { HEIGHT, getResponsiveHeight } from '../common/styles'
import { Actions } from 'react-native-router-flux'
import { SCENE_SEARCH } from '../constants/scene'
import HttpUtils from '../network/HttpUtils'
import { BOOKS } from '../network/Urls'
import Toast from 'antd-mobile/lib/toast'
import CommonNav from '../components/CommonNav'

export default class Subscribe extends Component {
  render () {
    return (
      <View style={styles.container}>
        <CommonNav
          title="订阅图书"
          navigator={this.props.navigator}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'rgb(242,246,250)',
    alignItems: 'center',
    height: HEIGHT
  }
})
