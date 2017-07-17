import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  Alert
} from 'react-native'
import RightButtonNav from '../components/RightButtonNav'
import HttpUtils from '../network/HttpUtils'
import {LISTS} from "../network/Urls"
import {WIDTH, INNERWIDTH,HEIGHT} from "../common/styles"
import {Actions} from "react-native-router-flux"

const URL = LISTS.create_list // 缓存前先请求showxs
const URL_SHOW = LISTS.show_list

export default class BookCollectAddPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list_name: '',
      list_content: ''
    }
  }
  rightOnPress() {
    if (!this.state.list_name.trim()) {
      Alert.alert('小提示', '请输入书单的名字哦！')
      return
    }
    if (!this.state.list_content.trim()) {
      Alert.alert('小提示', '请输入书单的描述内容哦！')
      return
    }
    AsyncStorage.getItem('book_list', (error, array) => {
      // alert(array);
      if (array) {
        array = JSON.parse(array)
      } else {
        array = []
      }
      let item = {
        list_name: this.state.list_name,
        list_content: this.state.list_content
      }
      let flag = false
      if (array && array.length > 0) {
        flag = array.some(d => {
          if (d.list_name === item.list_name) {
            Alert.alert('小提示', '你已经创建过同名书单啦！')
            Actions.pop()
            flag = true
            return true
          }
        })

        if (flag) {
          return
        }

      }

      HttpUtils.post(URL, {
        list_name: this.state.list_name,
        uid: this.props.user.uid,
        list_content: this.state.list_content,
        timestamp: this.props.timestamp,
        token: this.props.user.token
      })
        .then(response => {
          alert("请求发出了")
          if (response.msg === '请求成功') {
            alert("成功");
            alert(array);
            HttpUtils.post(URL_SHOW, {
              token: this.props.user.token,
              uid: this.props.user.uid,
              timestamp: this.props.timestamp
            })
              .then(result => {
                if (result.msg === '请求成功') {
                  alert("请求查看")
                  let lists = result.data
                  AsyncStorage.setItem(
                    'book_list',
                    JSON.stringify(lists),
                    error => {
                      if (error) {
                        alert("存储失败")
                        console.log(error)
                      } else {
                        alert(this.props)
                        this.props.onCallBack()
                        Actions.pop()
                      }
                    }
                  )
                }
              })
              .catch(error => {
                alert(error)
                console.log(error)
              })
          } else {
            Alert.alert('网络请求出错啦', response.msg)
          }
        })
        .catch(error => {
          console.log(error)
          alert(error)
        })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <RightButtonNav
          title="创建书单"
          rightOnPress={() => {
            this.rightOnPress()
          }}
        />
        <TextInput
          placeholder="书单标题"
          placeholderTextColor="#999999"
          style={styles.textInput_title}
          onChangeText={text => {
            this.setState({ list_name: text })
          }}
        />
        <TextInput
          placeholder="描述一下你的书单吧～"
          style={styles.textInput_des}
          multiline={true}
          onChangeText={text => {
            this.setState({ list_content: text })
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(242,246,250)',
    width: WIDTH,
    height: HEIGHT
  },
  textInput_title: {
    fontSize: 17,
    fontFamily: 'PingFang SC',
    fontWeight: '500',
    width: INNERWIDTH,
    height: 48,
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 8,
    marginLeft: 8,
    paddingLeft: 16,
    borderRadius: 8
  },
  textInput_des: {
    fontFamily: 'PingFang SC',
    fontSize: 14,
    // paddingTop:20,
    paddingHorizontal: 8,
    height: 98,
    width: INNERWIDTH,
    marginTop: 8,
    backgroundColor: 'white',
    marginLeft: 8,
    borderRadius: 8
  }
})
