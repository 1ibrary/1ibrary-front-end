import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  AsyncStorage
} from 'react-native'
import TextPingFang from '../components/TextPingFang'
import HttpUtils, { setToken, setHost } from '../network/HttpUtils'
import schools from '../network/schools'
import { USERS } from '../network/Urls'
import { SCENE_INDEX } from '../constants/scene'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import {
  WIDTH,
  HEIGHT,
  getResponsiveHeight,
  getResponsiveWidth
} from '../common/styles'
import Toast from 'antd-mobile/lib/toast'
import Storage from '../common/storage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const URL = USERS.login

export default class WelcomePage extends Component {

  state = {
    account: '',
    password: '',
    choosed_id: 0,
    school_id: -1,
    choose_info: '请选择您的学校',
    show_modal: false
  }

  async componentDidMount() {
    let user = await Storage.get('user', {})
    if (!user.account || !user.password) {
      return
    }
    
    setHost(schools[user.school_id].host)

    this.login(user.account, user.password)
  }

  onSubmit = async () => {

    if (!this.validatePassed) {
      return
    }

    const {
      account,
      password
    } = this.state

    this.login(account, password)
  }

  login = async (account, password) => {

    const params = {
      account,
      password,
      school_id: this.state.school_id
    }

    const response = await HttpUtils.post(URL, params)

    if (response.status !== 0) {
      Toast.fail(response.msg || '登录失败，请检查账号或者密码是否正确', 1)
      return
    }

    await Storage.set('user', {
      ...params
    })

    const {
      uid,
      token,
      timestamp
    } = response.data

    setToken({
      uid,
      token,
      timestamp
    })

    Actions[SCENE_INDEX]({ user: response.data })
  }

  get validatePassed() {

    // forbid gd
    if (this.state.school_id === 1) {
      Toast.fail('请输入正确的密码', 1)
      return false
    }

    if (this.state.school_id === -1) {
      Toast.offline('请选择你的学校噢～', 1)
      return false
    }

    if (!this.state.account) {
      Toast.offline('请输入学号噢～', 1)
      return false
    }

    if (!this.state.password) {
      Toast.offline('请输入密码噢～', 1)
      return false
    }

    return true
  }

  show_modal = () => {
    this.setState({ show_modal: true })
  }

  choose_sc = (id) => {
    this.setState({ choosed_id: id })
  }

  hide_modal = () => {
    this.setState({ show_modal: false })
  }

  confirm = () => {

    const selectedId = this.state.choosed_id
    const selectedSchool = schools[selectedId]

    this.setState({
      school_id: selectedId,
      choose_info: selectedSchool.name
    })

    setHost(selectedSchool.host)
    
    this.hide_modal()
  }

  render() {

    const arrow = require('../../res/images/Shape.png')
    const Modal = this.renderModal()

    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Image
            style={styles.bg}
            source={require('../../res/images/welcome_bg.png')}
          >
            <Image
              style={styles.logo}
              source={require('../../res/images/welcome_logo.png')}
            />
            <View style={styles.text}>
              <TextPingFang style={styles.title}>一图</TextPingFang>
              <TextPingFang style={styles.e_title}>1 Library</TextPingFang>
            </View>
            <View style={styles.form}>
              <TouchableOpacity
                onPress={this.show_modal.bind(this)}
                style={styles.textinput}
              >
                <Text style={styles.choose_font}>
                  {this.state.choose_info}
                </Text>
                <Image source={arrow} />
              </TouchableOpacity>
              <TextInput
                placeholder={'请输入您的学号'}
                placeholderTextColor={'rgba(255,255,255,0.52)'}
                style={[styles.textinput, styles.textinput_font]}
                onChangeText={text => {
                  this.setState({ account: text })
                }}
              />
              <TextInput
                placeholder={'请输入密码'}
                placeholderTextColor={'rgba(255,255,255,0.52)'}
                style={[styles.textinput, styles.textinput_font]}
                password={true}
                onChangeText={text => {
                  this.setState({ password: text })
                }}
              />
              <Text style={styles.remind}>请使用您的学号密码登录哦</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.onSubmit()
              }}
              style={styles.online}
            >
              <Text style={styles.online_font}>登录</Text>
            </TouchableOpacity>
          </Image>
          {this.state.show_modal && Modal}
        </View>
      </KeyboardAwareScrollView>
    )
  }

  renderModal = () => {
    return (
      <View style={styles.modal}>
        <View style={styles.modal_content}>

          {schools.map((item, id) => {
            return (
              <TouchableOpacity
                key={id}
                onPress={this.choose_sc.bind(this, id)}
                style={styles.modal_content_item}
              >
                <View
                  style={[
                    styles.modal_round,
                    this.state.choosed_id === id && styles.active
                  ]}
                />
                <Text style={styles.modal_content_font}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        <View style={styles.modal_bottom}>
          <TouchableOpacity
            onPress={this.hide_modal}
            style={[styles.modal_bottom_key, styles.right_border]}
          >
            <Text style={styles.modal_key_font}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.confirm}
            style={styles.modal_bottom_key}
          >
            <Text style={styles.modal_key_font}>确认</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#73C0FF',
    width: WIDTH,
    height: HEIGHT,
    alignItems: 'center'
  },
  bg: {
    alignItems: 'center',
    width: WIDTH,
    height: HEIGHT
  },
  logo: {
    marginTop: getResponsiveHeight(60)
  },
  text: {
    alignItems: 'center'
  },
  title: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    height: getResponsiveHeight(33),
    marginTop: HEIGHT * 0.0419
  },
  e_title: {
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 12,
    color: 'white'
  },
  form: {
    marginTop: getResponsiveHeight(18),
    alignItems: 'center',
    justifyContent: 'center'
    // width:240
  },
  textinput: {
    height: getResponsiveHeight(44),
    width: getResponsiveWidth(240),
    backgroundColor: 'rgb(139,203,255)',
    borderRadius: getResponsiveHeight(22),
    marginBottom: getResponsiveHeight(14),
    alignItems: 'center',
    paddingLeft: getResponsiveWidth(10),
    flexDirection: 'row'
  },
  textinput_font: {
    fontSize: 14,
    color: 'white'
  },
  choose_font: {
    fontSize: 14,
    color: 'white',
    width: getResponsiveWidth(196)
  },
  remind: {
    fontSize: 10,
    color: 'white',
    // width:160,
    marginTop: getResponsiveHeight(25),
    backgroundColor: 'rgba(0,0,0,0)'
  },
  online: {
    position: 'absolute',
    bottom: HEIGHT * 0.115,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: getResponsiveWidth(150),
    height: getResponsiveHeight(44),
    borderRadius: getResponsiveHeight(22)
  },
  online_font: {
    fontSize: 14
  },
  modal: {
    position: 'absolute',
    top: getResponsiveHeight(288),
    width: getResponsiveWidth(328),
    height: getResponsiveHeight(195),
    backgroundColor: 'white',
    borderRadius: 15
  },
  modal_content: {
    height: getResponsiveHeight(151),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  modal_content_item: {
    marginTop: 14,
    flexDirection: 'row',
    paddingLeft: 14,
    alignItems: 'center',
    height: 14
  },
  modal_content_font: {
    fontSize: 14
  },
  active: {
    backgroundColor: '#4eafff'
  },
  modal_round: {
    height: 14,
    width: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#4eafff',
    marginRight: 14
  },
  modal_bottom: {
    flexDirection: 'row'
  },
  right_border: {
    borderRightWidth: 1,
    borderRightColor: '#f0f0f0',
    height: getResponsiveHeight(44)
  },
  modal_bottom_key: {
    width: getResponsiveWidth(164),
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal_key_font: {
    color: '#36a5ff',
    fontSize: 16
  }
})
