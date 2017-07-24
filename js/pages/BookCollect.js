import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
  AsyncStorage,
  ScrollView,
  Alert
} from 'react-native'
import RightButtonNav from '../components/RightButtonNav'
import BookCollectItem from '../components/BookCollectTitle'
import BookCollectAddPage from './BookCollectAdd'
import HttpUtils from '../network/HttpUtils'
import {LISTS} from "../network/Urls"
import {INNERWIDTH,HEIGHT} from '../common/styles'
import {Actions} from "react-native-router-flux"
import {SCENE_BOOK_COLLECT_ADD} from "../constants/scene"
import Toast from 'antd-mobile/lib/toast';
import {getArray} from "../common/storage"

const URL_SHOW = LISTS.show_list
const URL_ADD_BOOK = LISTS.collect_book
const URL_RM_LIST = LISTS.remove_list

export default class BookCollectPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lists: [],
      choosed: []
    }
  }
  static defaultProps = {
    book: {
      book_title: '美洲小宇宙',
      book_content:
        '一本书带你深度探访中南美洲腹地，身未动，心已远。沿着旧地图，走不到新大陆，毕淑敏带你走出自助旅行新路线: “世界最美岛屿”加拉帕戈斯群岛，“热带雾林王冠上的宝石”哥斯达黎加蒙特维德雾林，古印第安人的太阳、月亮金字塔与亡灵大道，全球银饰之都塔斯科，切•格瓦拉故居……太多秘密，等你探索，太多奇迹，等你发现。',
      book_cover:
        'https://imgsa.baidu.com/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=b52bcf617f094b36cf9f13bfc2a517bc/9c16fdfaaf51f3de300988da9deef01f3b2979d0.jpg',
      book_key: 'TB47-05-/9',
      book_place: '中文文科库(418)',
      book_author: '毕淑敏',
      book_publish: '湖南文艺出版社',
      book_rate: 9.3,
      detail_data: [
        {
          detail_place: '中文文科库418',
          detail_id: 11,
          detail_key: 1,
          detail_in: true
        },
        {
          detail_place: '中文文科库418',
          detail_id: 11,
          detail_key: 2,
          detail_in: true
        },
        {
          detail_place: '中文文科库418',
          detail_id: 11,
          detail_key: 3,
          detail_in: false
        }
      ],
      book_last_number: 2,
      book_subscribe: true
    }
  }
  async componentDidMount() {
    let result = await HttpUtils.post(URL_SHOW) || {}
    let lists = result.data || []
    this.setState({ lists})
  }
  rightOnPress() {
    if (this.props.title === '我的书单' || this.state.choosed.length == 0) {
      Actions.pop()
    }
    this.state.choosed.map((item,i)=>{
      this.state.lists.some(async (d)=>{
        let book_list
        book_list = d.book_list&&d.book_list.split(",") || []
        book_list = [...new Set([...book_list, this.props.book.book_id+""])]
        let params = {
            list_id: d.list_id,
            book_list: book_list&&book_list.join(",")
        }
        d.book_list = params.book_list
        let result = HttpUtils.post(URL_ADD_BOOK, params)
        if (result.msg === '请求成功') {
          if(i===this.state.choosed.length-1) {
              await AsyncStorage.setItem('book_list',JSON.stringify(this.state.lists))
          }
        }
      })
    if(i==this.state.choosed.length-1)  {
        Toast.success("收藏成功！",1)
        Actions.pop()
    }
    })
  }
  onPressButton(select, item) {
    let choosed = this.state.choosed
    if (select) {
      choosed = [...new Set([...choosed, item.list_name])]
    } else {
      choosed.splice(choosed.indexOf(item.list_name), 1)
    }
    this.setState({ choosed: choosed })
  }
  async onDelete(title) {
    let array = this.state.lists
    array.some(async (d, i) => {
      if (d.list_name === title) {
        array.splice(i, 1)
      }
      let params = {
          list_id: d.list_id,
      }
      let result = await HttpUtils.post(URL_RM_LIST, params)||{}
      if (result.msg === '请求成功') {
          await this.setState({lists: array})
          Toast.success("删除书单成功!",1)
          await AsyncStorage.setItem(
              'book_list',
              JSON.stringify(array))
          return true
      } else {
          Toast.offline(result.msg,1)
      }
    })
  }
  onConfirm(title) {
      Alert.alert("确认删除","您真的要删除这个书单吗?",
          [{text:"确认",onPress:this.onDelete.bind(this,title)},{text:"取消"}])
  }
  render() {
    let lists = [
      { title: '专业书籍', des: '反正就是很专业的啦' },
      { title: '经典书籍', des: '反正就是很经典的啦' }
    ]
    return (
      <View style={styles.container}>
        <RightButtonNav
          title={this.props.title}
          rightOnPress={() => this.rightOnPress()}
        />
        <TouchableOpacity
          style={styles.add}
          onPress={() => {
            let params = {
                onCallBack: async () => {
                    let array = await getArray("book_list")
                    this.setState({ lists: array })
                },
                user: this.props.user,
                timestamp: this.props.timestamp
            }
            Actions[SCENE_BOOK_COLLECT_ADD](params)
          }}
        >
          <Image source={require('../../res/images/icon_add.png')} />
        </TouchableOpacity>
        <ScrollView style={styles.list}>
          {this.state.lists.map((item, i) => {
            return (
              <BookCollectItem
                item={item}
                big_title={this.props.title}
                navigator={this.props.navigator}
                onPress={(select, data) => this.onPressButton(select, data)}
                onDelete={title => {
                  this.onConfirm(title)
                }}
                timestamp={this.props.timestamp}
                user={this.props.user}
                key={item.list_id}
                data={item}
              />
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(242,246,250)',
    height: HEIGHT
  },
  add: {
    width: INNERWIDTH,
    borderRadius: 8,
    marginLeft: 8,
    height: 48,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  list: {
    marginTop: 20
  }
})
