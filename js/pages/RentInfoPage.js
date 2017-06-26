import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native'
import CommonNav from '../components/CommonNav'
import TextPingFang from '../components/TextPingFang'

const WIDTH = Dimensions.get('window').width
const INNERWIDTH = WIDTH - 16
const HEIGHT = Dimensions.get('window').height

export default class MessageInfoPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  static defaultProps = {
    data: {
      title: '美洲小宇宙',
      rent: '2017/4/2',
      return_time: '2017/5/2'
    },
    title: '归还书籍'
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav_container}>
          <CommonNav
            title={this.props.title}
            navigator={this.props.navigator}
          />
        </View>
        <View style={styles.item}>
          <Image
            style={styles.book_image}
            source={require('../../res/images/book.png')}
          />
          <View style={styles.info}>
            <TextPingFang style={styles.info_title}>
              {this.props.data.title}
            </TextPingFang>
            <TextPingFang style={styles.info_rent}>
              借阅日期: {this.props.data.rent}
            </TextPingFang>
            <TextPingFang style={styles.info_rent}>
              应还日期: {this.props.data.return_time}
            </TextPingFang>
          </View>
        </View>
      </View>
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
    marginTop: 8 / 667 * HEIGHT,
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
