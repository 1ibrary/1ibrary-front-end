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
import BookItem1 from './Book'
import { WIDTH, INNERWIDTH, getResponsiveWidth } from '../common/styles'

export default class BookCollect extends Component {

  state = {
    marginLeft: new Animated.Value(8)
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
  }

  onMove(ev) {
    if (ev.dx < 0) {
      Animated.timing(this.state.marginLeft, {
        toValue: -86,
        duration: 200 // 动画时间
      }).start()
    } else if (ev.dx > 0) {
      Animated.timing(this.state.marginLeft, {
        toValue: 8,
        duration: 200 // 动画时间
      }).start()
    }
  }

  render() {

    return (
      <View {...this._panResponder_move.panHandlers} style={styles.container}>
        <Animated.View
          style={[
            styles.item,
            this.props.style,
            { marginLeft: this.state.marginLeft }
          ]}
        >
          <BookItem1 data={this.props.item} />
        </Animated.View>
        <TouchableOpacity
          onPress={() => {
            this.props.onDelete(this.props.item)
          }}
          style={styles.delete_container}
        >
          <Image
            style={styles.delete}
            source={require('../../res/images/icon_clear.png')}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH + getResponsiveWidth(86),
    flexDirection: 'row',
    alignItems: 'center'
  },
  delete_container: {
    marginLeft: 8
  },
  item: {
    marginLeft: 8
  },
  delete: {
    marginLeft: INNERWIDTH * 0.12 - 8
  }
})
