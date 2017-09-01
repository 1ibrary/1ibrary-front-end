import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'
import CommonNav from '../../components/CommonNav'
import TextPingFang from '../../components/TextPingFang'
import {
  WIDTH,
  INNERWIDTH,
  HEIGHT,
  getResponsiveHeight
} from '../../common/styles'
import { Actions } from 'react-native-router-flux'
import { SCENE_ABOUT_US_WEB, SCENE_SPLASH_SCREEN } from '../../constants/scene'

export default function AboutUs () {
  return (
    <View style={styles.container}>
      <Image
        style={styles.bg}
        source={require('../../../res/images/about_bg.png')}
      >
        <CommonNav
          title={'关于我们'}
          navStyle={styles.opacity0}
          navBarStyle={styles.opacity0}
        />
      </Image>
      <Image
        style={styles.logo}
        source={require('../../../res/images/about_logo.png')}
      />
      <View style={styles.text}>
        <Text style={styles.slogan}>ONE</Text>
        <TextPingFang style={styles.name}>一图</TextPingFang>
        <Text style={styles.slogan}>LIBRARY</Text>
        <View style={styles.border} />
      </View>
      <View style={styles.names}>
        <Text style={styles.name}>Back-End: Airing</Text>
        <Text style={styles.name}>UI Design: Albert Leung</Text>
        <Text style={styles.name}>iOS APP: YiFan Wang & FanYi</Text>
        <View>
          <TouchableOpacity
            style={styles.contact}
            onPress={() => {
              Actions[SCENE_ABOUT_US_WEB]()
            }}
          >
            <Text style={styles.contact_font}>联系我们</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.version}>Verison 1.2.0</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    alignItems: 'center'
  },
  bg: {
    width: WIDTH
  },
  opacity0: {
    backgroundColor: 'rgba(0,0,0,0)'
  },
  logo: {
    marginTop: -126
  },
  text: {
    alignItems: 'center',
    marginTop: getResponsiveHeight(18)
  },
  name: {
    color: '#666666',
    fontSize: 24
  },
  slogan: {
    fontSize: 64,
    color: 'rgb(250,250,250)'
  },
  border: {
    width: 2,
    height: getResponsiveHeight(74),
    backgroundColor: '#999999',
    marginTop: getResponsiveHeight(-74)
  },
  names: {
    marginTop: getResponsiveHeight(32),
    alignItems: 'center'
  },
  name: {
    color: '#999999',
    fontSize: 14,
    marginBottom: getResponsiveHeight(4)
  },
  version: {
    position: 'absolute',
    bottom: 5,
    color: '#999999',
    fontSize: 14
  },
  contact: {
    width: INNERWIDTH,
    height: getResponsiveHeight(44),
    marginTop: getResponsiveHeight(20),
    alignItems: 'center'
  },
  contact_font: {
    textDecorationLine: 'underline'
  }
})
