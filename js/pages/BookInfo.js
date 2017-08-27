import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import CommonNav from '../components/CommonNav'
import HttpUtils from '../network/HttpUtils'
import Round from '../components/Round'
import { BOOKS, SUBSCRIBE } from '../network/Urls'
import { INNERWIDTH, WIDTH, HEIGHT , getResponsiveWidth} from '../common/styles'
import { Actions } from 'react-native-router-flux'
import { SCENE_BOOK_COLLECT } from '../constants/scene'
import Toast from 'antd-mobile/lib/toast'

const SHOW_DETAIL = BOOKS.show_detail

export default class BookInfo extends Component {
  
  state = {
    show_content: false,
    book_data: { detail_data: [] },
    is_subscribe: false
  }

  componentDidMount() {
    this.fetchBookData()
  }

  fetchBookData = async () => {

    const {
      book_id,
      book_db_id
    } = this.props.data

    let params = { book_id, book_db_id }

    let result = await (HttpUtils.post(SHOW_DETAIL, params) || {})
    if (result.status === 0) {
      this.setState({ book_data: result.data })
    } else {
      Toast.offline(result.msg, 1)
    }
  }

  fetchSubscribeState = () => {

  }

  onNavigator = () => {
    let params = {
      title: '加入书单',
      book: this.props.data
    }
    Actions[SCENE_BOOK_COLLECT](params)
  }

  changeNum(x) {
    if (x < 10) {
      return '0' + x
    } else {
      return x
    }
  }

  onSubscribe = async () => {

    if (this.state.is_subscribe) {
      this.unSubscribe()
    } else {
      this.subscribe()
    }

    // const message = !this.state.is_subscribe ? '您已成功订阅本书！' : '您已取消订阅！'
    // this.setState({ is_subscribe: !this.state.is_subscribe })
    // Toast.success(message, 1)
  }

  subscribe = async () => {
    const {
      book_id
    } = this.props.data

    await HttpUtils.post(SUBSCRIBE.subscribe, { book_id })
    this.setState({ is_subscribe: true })
    Toast.success('您已成功订阅本书', 1)
  }

  unSubscribe = async () => {

  }

  render() {
    
    let BottomBar = this.renderBottomBar()

    let content = (
      <View style={styles.book_content}>
        <Text style={styles.book_content_font}>
          {this.state.book_data.book_content}
        </Text>
      </View>
    )
    
    let image_down = require('../../res/images/downArrow.png')
    let image_up = require('../../res/images/upArrow.png')
    let red_dot = require('../../res/images/red_dot.png')
    let blue_dot = require('../../res/images/blue_dot.png')

    return (
      <View style={styles.container}>
        <CommonNav title={'图书详情'} />
        <ScrollView style={styles.scroll_view}>
          <View style={styles.outline_container}>
            <View style={styles.outline_image_view}>
              <Image
                style={styles.outline_image}
                source={{ uri: this.props.data.book_cover }}
              />
            </View>
            <View style={styles.outline_text}>
              <Text style={styles.outline_title}>
                {this.state.book_data.book_title}
              </Text>
              <Text style={styles.outline_a_p}>
                {this.state.book_data.book_author}
              </Text>
              <Text style={styles.outline_a_p}>
                {this.state.book_data.book_publish}
              </Text>
              <Text style={styles.outline_rate}>
                {this.state.book_data.book_rate
                  ? this.state.book_data.book_rate + ' 分'
                  : '暂无评分'}
              </Text>
              <TouchableOpacity
                style={styles.outline_button}
                onPress={() =>
                  this.setState({ show_content: !this.state.show_content })}
              >
                <Text style={styles.outline_button_font}>
                  {this.state.show_content ? '收起详情' : '展开详情'}
                </Text>
                <Image
                  style={styles.outline_button_image}
                  source={this.state.show_content ? image_up : image_down}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.book_c_p_container}>
            {this.state.show_content ? content : <View />}
            <View style={styles.book_position}>
              <View style={styles.book_position_font_container}>
                <Text style={styles.book_position_font}>
                  索书号: {this.state.book_data.book_key}
                </Text>
                <Text style={styles.book_position_font}>
                  馆藏地点: {this.state.book_data.book_place}
                </Text>
              </View>
              <View style={styles.book_position_round}>
                <Round data={this.state.book_data.book_last_number} />
              </View>
            </View>
          </View>
          <View style={[styles.book_places_container, styles.scroll_view]}>
            <View style={styles.book_places_cap}>
              <Text style={styles.book_places_cap_number}>序号</Text>
              <Text style={styles.book_places_cap_place}>馆藏地点</Text>
            </View>

            {this.state.book_data.detail_data.map((item, i) => {
              return (
                <View key={i} style={styles.book_place_item}>
                  <Image source={item.is_borrowed ? red_dot : blue_dot} />
                  <Text
                    style={[
                      styles.book_place_item_font,
                      styles.book_place_item_num
                    ]}
                  >
                    {/* @TODO changeNum是什么  */}
                    {/* {this.changeNum(item.id)} */}
                    {item.detail_key}
                  </Text>
                  <Text
                    style={[
                      styles.book_place_item_font,
                      styles.book_place_item_place
                    ]}
                  >
                    {item.detail_place}
                  </Text>
                </View>
              )
            })}
          </View>
        </ScrollView>
        {BottomBar}
      </View>
    )
  }

  renderBottomBar = () => {

    const {
      is_subscribe
    } = this.state

    return (
      <View style={styles.bottom_bar}>
        <TouchableOpacity onPress={this.onSubscribe}>
          <View style={[styles.subscribe, is_subscribe && styles.subscribe_disbaled ]} >
            <View>
              <Text
                style={[
                  styles.subscribe_font,
                  is_subscribe && styles.subscribe_font_disabled
                ]}
              >
                订阅
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.collect}
          onPress={this.onNavigator}
        >
          <Text style={styles.collect_font}>收藏</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  outline_container: {
    width: WIDTH,
    paddingRight: 16,
    marginTop: 18,
    flexDirection: 'row'
  },
  outline_image_view: {
    shadowColor: 'gray',
    shadowOffset: { h: 8, w: 8 },
    shadowRadius: 8,
    shadowOpacity: 0.4
  },
  outline_image: {
    width: 106,
    height: 158,
    marginLeft: 8
  },
  outline_text: {
    marginLeft: 20,
    marginRight: 20
  },
  outline_title: {
    fontSize: 17,
    fontFamily: 'PingFang SC',
    fontWeight: '500',
    width: getResponsiveWidth(230)
  },
  outline_a_p: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'PingFang SC',
    color: '#666666'
  },
  outline_rate: {
    marginTop: 15,
    color: '#FFB173',
    fontSize: 17,
    height: 24
  },
  outline_button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    marginTop: 20
  },
  outline_button_font: {
    fontSize: 14,
    fontFamily: 'PingFang SC',
    color: '#73C0FF',
    marginRight: 8,
    marginBottom: 4,
    height: 20
  },
  outline_button_image: {
    marginTop: -4
  },
  scroll_view: {
    flex: 1,
    paddingBottom: 50
  },
  book_c_p_container: {
    marginTop: 26,
    marginLeft: 8
  },
  book_content: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    width: INNERWIDTH,
    borderRadius: 8
  },
  book_content_font: {
    color: '#666666',
    fontSize: 14,
    fontFamily: 'PingFang SC'
  },
  book_position: {
    width: INNERWIDTH,
    height: 88,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    marginTop: 14,
    borderRadius: 8
  },
  book_position_font_container: {
    marginLeft: 16
  },
  book_position_font: {
    color: '#666666',
    fontSize: 14,
    fontFamily: 'PingFang SC'
  },
  book_position_round: {
    position: 'absolute',
    right: 12
  },
  book_places_container: {
    width: INNERWIDTH,
    marginLeft: 16,
    marginTop: 20
  },
  book_places_cap: {
    flexDirection: 'row'
  },
  book_places_cap_number: {
    marginLeft: 50,
    color: '#999999',
    fontSize: 12,
    fontFamily: 'PingFang SC'
  },
  book_places_cap_place: {
    marginLeft: 155,
    color: '#999999',
    fontSize: 12,
    fontFamily: 'PingFang SC'
  },
  book_place_item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  book_place_item_font: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'PingFang SC',
    fontWeight: '500'
  },
  book_place_item_num: {
    marginLeft: 34,
    flex: 2
    // width: 40
  },
  book_place_item_place: {
    flex: 5,
    textAlign: 'center'
    // marginLeft: 138
  },
  bottom_bar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0
  },
  subscribe: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: WIDTH * 0.4,
    backgroundColor: '#FFB173'
  },
  subscribe_disbaled: {
    backgroundColor: '#F9F9F9'
  },
  subscribe_font: {
    fontSize: 17,
    color: 'white'
  },
  subscribe_font_disabled: {
    color: '#999999'
  },
  collect: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: WIDTH * 0.6,
    backgroundColor: '#73C0FF'
  },
  collect_font: {
    color: '#FFFFFF',
    fontSize: 17
  }
})
