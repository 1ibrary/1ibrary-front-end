import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  Image,
} from 'react-native'
import TextPingFang from '../components/TextPingFang'
import BookCollectPage from './BookCollect'
import RentInfoPage from './RentInfo'
import FeedBackPage from './FeedBack'
import AboutUsPage from './AboutUs'
import SettingPage from './Setting'
import {Actions} from "react-native-router-flux"
import * as scenes from "../constants/scene"
import {WIDTH, INNERWIDTH,HEIGHT,getResponsiveWidth,getResponsiveHeight} from '../common/styles'

export default class ProfilePage extends Component {
  onJump(page, params) {
    Actions[page](params)
  }
  render() {
    let booklist = require('../../res/images/icon_booklist.png')
    let history = require('../../res/images/icon_history.png')
    let setting = require('../../res/images/icon_setting.png')
    // let apps = require("../../res/images/icon_apps.png")
    let feedback = require('../../res/images/icon_feedback.png')
    let aboutus = require('../../res/images/icon_aboutus.png')
    let images = [booklist, history, setting, feedback, aboutus, images]
    let texts = ['我的书单', '借阅历史', '设置', '意见反馈', '关于我们']
    let male_pic = require('../../res/images/avatar.png')
    let fm_pic = require('../../res/images/avatar2.png')
    return (
      <View style={styles.container}>
        <View style={styles.info_container}>
          <Image
            style={styles.avatar}
            source={require('../../res/images/avatar_bg.png')}
          >
            <Image
              style={styles.avatar_round}
              source={require('../../res/images/avatar_round.png')}
            >
              <Image
                style={this.props.user.user_sex ? { marginTop: -6 } : {}}
                source={this.props.user.user_sex ? fm_pic : male_pic}
              />
            </Image>

            <TextPingFang style={styles.avatar_font}>
              {this.props.user.user_name}
            </TextPingFang>
          </Image>
        </View>
        <View style={styles.items1}>
          {texts.map((d, i) => {
            if (i >= 3) return
            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  let text = d
                  let pramas
                  switch (text) {
                    case '我的书单':
                      params = {
                          title: '我的书单',
                          user: this.props.user,
                          timestamp: this.props.timestamp
                      }
                      this.onJump(scenes.SCENE_BOOK_COLLECT, params)
                      break
                    case '借阅历史':
                      params = {
                          title: '借阅历史'
                      }
                      this.onJump(scenes.SCENE_MESSAGE,params)
                      break
                    case '设置':
                      params = {
                        title: '借阅历史'
                      }
                      this.onJump(scenes.SCENE_SETTING, params)
                      break
                  }
                }}
                style={styles.item}
              >
                <Image source={images[i]} />
                <TextPingFang style={styles.item_font}>{d}</TextPingFang>
                <Image
                  style={styles.item_arrow}
                  source={require('../../res/images/right_arrow.png')}
                />
              </TouchableOpacity>
            )
          })}

        </View>
        <View style={styles.items2}>
          {texts.map((d, i) => {
            if (i < 3) return
            return (
              <TouchableOpacity
                onPress={() => {
                  let params
                  switch (d) {
                    case '意见反馈':
                      params = {
                        user: this.props.user,
                        timestamp: this.props.timestamp,
                        navigator: this.props.navigator
                      }
                      this.onJump(scenes.SCENE_FEEDBACK,params)
                      break
                    case '关于我们':
                      this.onJump(scenes.SCENE_ABOUTUS,{})
                  }
                }}
                key={i}
                style={styles.item}
              >
                <Image source={images[i]} />
                <TextPingFang style={styles.item_font}>{d}</TextPingFang>
                <Image
                  style={styles.item_arrow}
                  source={require('../../res/images/right_arrow.png')}
                />
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    alignItems: 'center'
  },
  info_container: {
    alignItems: 'center',
    width: INNERWIDTH
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 52,
    width: INNERWIDTH
  },
  avatar_round: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    width: WIDTH - getResponsiveWidth(30),
    flexDirection: 'row',
    marginLeft: getResponsiveWidth(30),
    alignItems: 'center',
    height: getResponsiveHeight(56)
  },
  item_font: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    marginLeft: 16,
    width: 56
  },
  item_arrow: {
    position: 'absolute',
    right: getResponsiveWidth(30)
  },
  items1: {
    marginTop: 24
  },
  items2: {
    marginTop: 40
  },
  avatar_font: {
    color: '#666666',
    fontSize: 17,
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 15,
    fontWeight: '600'
  }
})
