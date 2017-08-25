import React, { Component } from 'react'
import {
  View,
  TextInput,
  StyleSheet
} from 'react-native'
import RightButtonNav from '../../components/RightButtonNav'
import HttpUtils from '../../network/HttpUtils'
import { LISTS } from '../../network/Urls'
import { WIDTH, INNERWIDTH, HEIGHT } from '../../common/styles'
import { Actions } from 'react-native-router-flux'
import Toast from 'antd-mobile/lib/toast'
import Storage from '../../common/storage'

const URL = LISTS.create_list // 缓存前先请求showxs
const URL_SHOW = LISTS.show_list

export default class BookCollectAddPage extends Component {

  state = {
    list_name: '',
    list_content: ''
  }

  rightOnPress = async () => {

    if (!this.state.list_name.trim()) {
      Toast.info('请输入书单的名字噢!', 1)
      return
    }

    if (!this.state.list_content.trim()) {
      Toast.info('请输入书单的描述内容噢!', 1)
      return
    }

    const bookCollectList = this.props.bookCollectList
    const {
      list_name,
      list_content
    } = this.state

    if (!Array.isArray(bookCollectList)) {
      return
    }

    const exists = bookCollectList.some(collect => collect.list_name === list_name)

    if (exists) {
      Toast.info('你已经创建过同名书单啦！', 1)
      return
    }

    const params = {
      list_name,
      list_content
    }

    let response = (await HttpUtils.post(URL, params)) || {}

    if (response.status !== 0) {
      Toast.offline(response.msg, 1)
      return
    }

    Toast.success('创建书单成功！', 1)
    this.props.onCallBack()
    Actions.pop()
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
