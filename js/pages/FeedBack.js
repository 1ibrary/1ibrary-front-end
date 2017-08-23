import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import RightButtonNav from '../components/RightButtonNav'
import HttpUtils from '../network/HttpUtils'
import { USERS } from '../network/Urls'
import { WIDTH, INNERWIDTH, HEIGHT } from '../common/styles'
import { Actions } from 'react-native-router-flux'
import Toast from 'antd-mobile/lib/toast'

const URL = USERS.feedback

export default class FeedBackPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contact: '',
      content: ''
    }
  }
  async onPost() {
    if (!this.state.contact.trim()) {
      Toast.info('请输入您的联系方式哦~', 1)
      return
    }
    if (!this.state.content.trim()) {
      Toast.info('请输入您的反馈内容哦~', 1)
      return
    }
    let params = {
      content: this.state.content,
      contact: this.state.contact
    }
    let response = (await HttpUtils.post(URL, params)) || {}
    if (response.status === 0) {
      Actions.pop()
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <RightButtonNav
          title={'意见反馈'}
          rightOnPress={() => {
            this.onPost()
          }}
        />
        <TextInput
          placeholder={'请输入您的邮箱或者电话'}
          placeholderTextColor={'#999999'}
          style={styles.textInput_title}
          onChangeText={text => {
            this.setState({ contact: text })
          }}
        />
        <TextInput
          placeholder={'描述一下你的体验或者建议吧～'}
          placeholderTextColor={'#999999'}
          multiline={true}
          style={[styles.textInput_title, styles.textInput_content]}
          onChangeText={text => {
            this.setState({ content: text })
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
    fontFamily: 'PingFang SC',
    fontSize: 14,
    width: INNERWIDTH,
    height: 48,
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 8,
    marginLeft: 8,
    paddingLeft: 16,
    borderRadius: 8
  },
  textInput_content: {
    height: 270
  }
})
