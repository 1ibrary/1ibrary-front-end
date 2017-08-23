import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions
} from 'react-native'
import CommonNav from '../components/CommonNav'
import TextPingFang from '../components/TextPingFang'
import {
  WIDTH,
  INNERWIDTH,
  HEIGHT,
  getResponsiveWidth,
  getResponsiveHeight
} from '../common/styles'
import HttpUtils from '../network/HttpUtils'
import { BOOKS } from '../network/Urls'
import Toast from 'antd-mobile/lib/toast'

export default class MessageInfoPage extends Component {

  state = {
    books: []
  }

  async componentDidMount() {
    Toast.loading('正在加载', 0)
    try {
      await this.fetchBorrowed()
    } catch (e) {
      Toast.fail('加载失败，请稍后重试', 1)
      return
    }
    Toast.success('已加载最新数据', 1)
  }

  fetchBorrowed = async () => {
    const response = await HttpUtils.post(BOOKS.borrowed, {})
    this.setState({ books: response.books })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav_container}>
          <CommonNav
            title="借阅历史"
            navigator={this.props.navigator}
          />
        </View>
        {
          this.renderBooks()
        }
      </View>
    )
  }

  renderBooks = () => {
    return (
      <ScrollView>
        {
          this.state.books.map((book, i) => {
            return (
              <View style={styles.item} key={i}>
                <Image
                  style={styles.book_image}
                  source={{ uri: book.book_cover }}
                />
                <View style={styles.info}>
                  <Text style={styles.info_title} numberOfLines={3}>
                    {book.book_title}
                  </Text>
                  <TextPingFang style={styles.info_rent}>
                    借阅日期: {book.borrow_time}
                  </TextPingFang>
                  <TextPingFang style={styles.info_rent}>
                    应还日期: {book.return_time}
                  </TextPingFang>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: 'rgb(242,246,250)',
    alignItems: 'center'
  },
  nav_container: {
    width: WIDTH,
    backgroundColor: 'white'
  },
  book_image: {
    height: 111,
    width: 74
  },
  item: {
    width: INNERWIDTH,
    height: 160,
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: getResponsiveHeight(8),
    flexDirection: 'row'
  },
  book_image: {
    marginLeft: 12,
    marginTop: 20,
    width: 74,
    height: 111
  },
  info: {
    marginLeft: 16,
    marginTop: 16
  },
  info_title: {
    fontSize: 17
  },
  info_rent: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8
  }
})
