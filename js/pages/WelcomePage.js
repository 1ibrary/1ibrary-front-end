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
  Alert,
  AsyncStorage
} from 'react-native'
// import CommonNav from "../common/CommonNav";
import TextPingFang from '../components/TextPingFang'
import HttpUtils from '../network/HttpUtils'
import {USERS} from '../network/Urls'
import HomePage from './HomePage'
import {WIDTH,  HEIGHT, getResponsiveHeight, getResponsiveWidth} from '../common/styles'
// import SplashScreen from 'react-native-splash-screen';


const URL = USERS.login

export default class WelcomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '1308200047',
      password: '123456'
    }
  }
  // componentDidMount() {
  //    	 // do anything while splash screen keeps, use await to wait for an async task.
  //        SplashScreen.hide();
  //    }
  onSubmit() {
      if (!this.state.account.trim()) {
          Alert.alert('小提示', '请输入学号哦~')
          return
      }
      if (!this.state.password.trim()) {
          Alert.alert('小提示', '请输入密码哦~')
          return
      }
      HttpUtils.post(URL, {
        user_account: this.state.account.trim(),
        user_password: this.state.password.trim()
      })
        .then(response => {
          if (response.msg === '请求成功') {
            AsyncStorage.setItem(
              'user_info',
              JSON.stringify(response.data),
              error => {
                if (error) {
                  console.log(error)
                } else {
                  AsyncStorage.getItem('books_data', (error, array) => {
                    if (error) {
                      console.log(error)
                    } else {
                      let user = response.data
                      this.props.navigator.push({
                        component: HomePage,
                        params: {
                          user: user,
                          books_data: JSON.parse(array),
                          timestamp: response.data.timestamp
                        }
                      })
                    }
                  })
                }
              }
            )
          } else {
            Alert.alert('网络请求出错啦', response.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })

  }
  render() {
    return (
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
            <TextInput
              placeholder={'请输入您的学号'}
              placeholderTextColor={'white'}
              style={styles.textinput}
              onChangeText={text => {
                this.setState({ account: text })
              }}
            />
            <TextInput
              placeholder={'请输入密码'}
              placeholderTextColor={'white'}
              style={styles.textinput}
              password={true}
              onChangeText={text => {
                this.setState({ password: text })
              }}
            />
            <Text style={styles.remind}>请使用数字广大的账号密码登录哦</Text>

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
    marginTop: HEIGHT * 0.0479,
    alignItems: 'center',
    justifyContent: 'center'
    // width:240
  },
  textinput: {
    height: getResponsiveHeight(44),
    width: getResponsiveWidth(240),
    color: 'white',
    backgroundColor: 'rgb(139,203,255)',
    borderRadius: getResponsiveHeight(22),
    marginBottom: getResponsiveHeight(14),
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: getResponsiveWidth(10),
    flexDirection: 'row'
  },
  remind: {
    fontSize: 10,
    color: 'white',
    // width:160,
    marginTop: HEIGHT * 0.037,
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
  }
})
