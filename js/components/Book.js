import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'
import Round from './Round'
import {
  INNERWIDTH,
  getResponsiveWidth,
  getResponsiveHeight
} from '../common/styles'
import { Actions } from 'react-native-router-flux'
import { SCENE_BOOK_INFO } from '../constants/scene'

export default class Book extends Component {

  onPress = () => {
    let params = { data: this.props.data }
    Actions[SCENE_BOOK_INFO](params)
  }
  
  render() {

    const book = this.props.data

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={[styles.item, this.props.style]}>
          <Image
            style={styles.image}
            source={{ uri: book.book_cover }}
          />
          <View style={styles.information}>
            <Text style={styles.item_title} numberOfLines={2}>
              {book.book_title}
            </Text>
            <Text style={styles.item_author} numberOfLines>
              {book.book_author}
            </Text>
            <Text style={styles.item_publish}>
              {book.book_publish} {book.time}
            </Text>
            <Text style={styles.item_grade}>
              {book.book_rate !== 0
                ? book.book_rate + ' 分'
                : '暂无评分'}
            </Text>
          </View>
          <View style={styles.round}>
            <Round data={book.book_last_number} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: getResponsiveHeight(112),
    width: getResponsiveWidth(74)
    // marginTop: 20
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,230,234)',
    paddingHorizontal: getResponsiveWidth(12),
    backgroundColor: 'white',
    width: INNERWIDTH,
    // height: 160
    paddingBottom: getResponsiveHeight(30),
    paddingTop: getResponsiveHeight(20),
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row'
  },
  information: {
    marginLeft: getResponsiveWidth(16),
    marginTop: getResponsiveHeight(-4)
  },
  item_title: {
    fontSize: 17,
    color: '#494949',
    fontFamily: 'PingFang SC',
    fontWeight: '500',
    width: getResponsiveWidth(206)
  },
  item_author: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'PingFang SC',
    marginVertical: getResponsiveHeight(8)
  },
  item_publish: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'PingFang SC'
  },
  item_grade: {
    fontFamily: 'PingFang SC',
    fontWeight: '500',
    color: '#FFB173',
    fontSize: 17,
    marginTop: getResponsiveHeight(14),
    flexDirection: 'row'
  },
  round: {
    position: 'absolute',
    top: getResponsiveHeight(62),
    right: getResponsiveWidth(12)
  }
})
