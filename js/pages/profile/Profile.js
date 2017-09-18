import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
import TextPingFang from '../../components/TextPingFang'
import { Actions } from 'react-native-router-flux'
import * as scenes from '../../constants/scene'
import {
  WIDTH,
  INNERWIDTH,
  HEIGHT,
  getResponsiveWidth,
  getResponsiveHeight
} from '../../common/styles'
import { connect } from 'react-redux'

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

@connect(mapStateToProps)
export default class ProfilePage extends Component {

  onJump = (page, title) => {
    Actions[page]({ title })
  }

  render() {
    const booklist = require('../../../res/images/icon_booklist.png')
    const history = require('../../../res/images/icon_history.png')
    const setting = require('../../../res/images/icon_setting.png')
    const subscribe = require('../../../res/images/icon_subscribe.png')
    // const apps = require("../../res/images/icon_apps.png")
    const feedback = require('../../../res/images/icon_feedback.png')
    const aboutus = require('../../../res/images/icon_aboutus.png')
    
    const texts = ['我的书单', '借阅图书', '订阅图书', '设置', '意见反馈', '关于我们']
    const male_pic = require('../../../res/images/avatar.png')
    const fm_pic = require('../../../res/images/avatar2.png')
    const images = [booklist, history, subscribe, setting, feedback, aboutus, images]

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <View style={styles.info_container}>
          <Image
            style={styles.avatar}
            source={require('../../../res/images/avatar_bg.png')}
          >
            <Image
              style={styles.avatar_round}
              source={require('../../../res/images/avatar_round.png')}
            >
              <Image
                style={this.props.user.user_sex ? { marginTop: -6 } : {}}
                source={this.props.user.user_sex ? fm_pic : male_pic}
              />
            </Image>

            <TextPingFang style={styles.avatar_font}>
              {this.props.user.username}
            </TextPingFang>
          </Image>
        </View>
        <View style={styles.items1}>
          {texts.map((pageName, i) => {
            if (i >= 4) return
            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  switch (pageName) {
                    case '我的书单':
                      this.onJump(scenes.SCENE_BOOK_COLLECT, pageName)
                      break
                    case '借阅图书':
                      this.onJump(scenes.SCENE_MESSAGE, pageName)
                      break
                    case '订阅图书':
                      this.onJump(scenes.SCENE_SUBSCRIBE, pageName)
                      break
                    case '设置':
                      this.onJump(scenes.SCENE_SETTING, pageName)
                      break
                  }
                }}
                style={styles.item}
              >
                <Image source={images[i]} style={[pageName === '订阅图书' && {
                  width: 26,
                  height: 26
                }]} />
                <TextPingFang style={styles.item_font}>
                  {pageName}
                </TextPingFang>
                <Image
                  style={styles.item_arrow}
                  source={require('../../../res/images/right_arrow.png')}
                />
              </TouchableOpacity>
            )
          })}
        </View>
        <View style={styles.items2}>
          {texts.map((pageName, i) => {
            if (i < 4) return
            return (
              <TouchableOpacity
                onPress={() => {
                  let params
                  switch (pageName) {
                    case '意见反馈':
                      this.onJump(scenes.SCENE_FEEDBACK, {})
                      break
                    case '关于我们':
                      this.onJump(scenes.SCENE_ABOUT_US, {})
                  }
                }}
                key={i}
                style={styles.item}
              >
                <Image source={images[i]} />
                <TextPingFang style={styles.item_font}>
                  {pageName}
                </TextPingFang>
                <Image
                  style={styles.item_arrow}
                  source={require('../../../res/images/right_arrow.png')}
                />
              </TouchableOpacity>
            )
          })}
        </View>
        <View style={{ height: 50 }}/>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: HEIGHT
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
