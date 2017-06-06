import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

export default class Round extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blue: require('../../res/images/round_blue.png'),
      red: require('../../res/images/round_red.png')
    }
  }
  static defaultProps = {
    data: 1
  }
  render() {
    return (
      <Image
        style={styles.round_image}
        source={this.props.data === 0 ? this.state.red : this.state.blue}
      >
        <Text style={styles.round_num}>{this.props.data}</Text>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  round_image: {
    // tintColor:"#607D8B",
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    width: 36
  },
  round_num: {
    color: 'white',
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0)'
  }
})
