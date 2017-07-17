import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  Image
} from 'react-native'
import NavigationBar from './NavigationBar'
import {Actions} from "react-native-router-flux"

export default class CommonNav extends Component {
  constructor(props) {
    super(props)
  }
  static defaultProps = {
    title: '图书详情',
    rightButton: <View />
  }
  render() {
    return (
      <View>
        <NavigationBar
          navBarStyle={this.props.navBarStyle}
          navStyle={this.props.navStyle}
          title={this.props.title}
          titleStyle={this.props.titleStyle}
          leftButton={
            <TouchableOpacity
              onPress={() => {
                Actions.pop()
              }}
              style={styles.container}
            >
              <Image source={require('../../res/images/BackArrow.png')} />

            </TouchableOpacity>
          }
          rightButton={this.props.rightButton}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 44,
    height: 24,
    alignItems: 'center',
    left: 0
  }
})
