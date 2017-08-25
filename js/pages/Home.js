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

export default class Home extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <SearchNav_Welcome
            placeholder={'搜索'}
            onFocus={() => {
              Actions[SCENE_SEARCH]()
            }}
          />
          <BookList style={styles.book_list} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    flexDirection: 'column',
    backgroundColor: 'rgb(242,246,250)',
    alignItems: 'center',
    height: HEIGHT
  },
  book_list: {
    // 一半的输入框高度加上maginBottom
    paddingTop: getResponsiveHeight(10)
  }
})
