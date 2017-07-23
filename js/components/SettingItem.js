import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Easing,
  AsyncStorage,
  PanResponder
} from 'react-native'
import TextPingFang from './TextPingFang'
import {WIDTH, INNERWIDTH} from "../common/styles"


export default class SettingItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      marginLeft: new Animated.Value(21.5),
      backgroundColor: '#44DB5E',
      round_border: {},
      container_border: {}
    }
  }
  onMove(evt, ev) {
    if (ev.dx == 0) {
      if (evt.nativeEvent.locationX > 30) {
        this.setState({ backgroundColor: '#44DB5E' })
        this.setState({ container_border: {} })
        this.setState({ round_border: {} })
        Animated.timing(this.state.marginLeft, {
          toValue: 21.5,
          duration: 200 // 动画时间
          // easing: Easing.linear
        }).start()
      } else {
        this.setState({ backgroundColor: 'white' })
        this.setState({ round_border: styles.round_border })
        this.setState({ container_border: styles.container_border })
        Animated.timing(this.state.marginLeft, {
          toValue: 0,
          duration: 200 // 动画时间
          // easing: Easing.linear
        }).start()
      }
    }
    if (ev.dx < 0) {
      this.setState({ backgroundColor: 'white' })
      this.setState({ round_border: styles.round_border })
      this.setState({ container_border: styles.container_border })
      Animated.timing(this.state.marginLeft, {
        toValue: 0,
        duration: 200 // 动画时间
        // easing: Easing.linear
      }).start()
    } else if (ev.dx > 0) {
      this.setState({ backgroundColor: '#44DB5E' })
      this.setState({ container_border: {} })
      this.setState({ round_border: {} })
      Animated.timing(this.state.marginLeft, {
        toValue: 21.5,
        duration: 200 // 动画时间
        // easing: Easing.linear
      }).start()
    }
  }
  componentWillMount() {

    this._panResponder_move = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.onMove(gestureState)
      }
    })
    this._panResponder_touch = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.onMove(evt, gestureState)
      }
    })
    this._panResponder_touch_2 = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false
    })
  }
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TextPingFang style={styles.font}>{this.props.text}</TextPingFang>
        <View
          style={[
            styles.button_container,
            { backgroundColor: this.state.backgroundColor },
            this.state.container_border
          ]}
        >
          <View {...this._panResponder_touch.panHandlers} style={styles.button}>
            <Animated.View
              {...this._panResponder_touch_2.panHandlers}
              onPress={() => {
                return
              }}
              style={[
                styles.button_inner_round,
                { marginLeft: this.state.marginLeft },
                this.state.round_border
              ]}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: INNERWIDTH,
    height: 44,
    borderRadius: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center'
  },
  font: {
    color: '#666666',
    fontSize: 14,
    marginLeft: 16,
    marginTop: 12
  },
  button_container: {
    width: 51,
    height: 31,
    borderRadius: 15.5,
    position: 'absolute',
    top: 6,
    right: 6,
    overflow: 'hidden'
  },
  container_border: {
    borderWidth: 1.5,
    borderColor: 'rgb(230,230,230)'
  },
  button: {
    width: 51,
    height: 31,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15.5
  },
  button_inner_round: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'white',
    marginTop: 0,
    shadowColor: 'gray',
    shadowOffset: { h: 3, w: 0 },
    shadowRadius: 3,
    shadowOpacity: 0.6
  },
  round_border: {
    borderWidth: 1,
    marginTop: -3,
    borderColor: 'rgb(230,230,230)',

    shadowColor: 'gray',
    shadowOffset: { h: 2, w: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.6
  }
})
