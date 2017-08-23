import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  PropTypes
} from 'react-native'
import {
  WIDTH,
  getResponsiveWidth,
  getResponsiveHeight
} from '../common/styles'
const history = 'history'
import { Actions } from 'react-native-router-flux'
import { SCENE_INDEX } from '../constants/scene'

export default class SearchNav extends Component {
  
  state = {
    history: []
  }

  componentDidMount() {
    if (this.props.type == 'result') {
      return
    }

    this.refs.textInput.focus()
  }

  static defaultProps = {
    onChangeText: text => { }
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TextInput
          ref="textInput"
          style={[styles.textInput, this.props.textInputColor]}
          placeholder={this.props.placeholder}
          placeholderColor={'rgb(165,165,165)'}
          defaultValue={this.props.defaultValue}
          onChangeText={this.props.onChangeText}
          onFocus={this.onFocus}
          clearButtonMode={'while-editing'}
          onSubmitEditing={this.onSubmitEditing}
          autoCapitalize="none"
        />
        <Image
          style={styles.image_search}
          source={require('../../res/images/search_image.png')}
        />
        <TouchableOpacity
          style={styles.close_container}
          onPress={() => {
            Actions[SCENE_INDEX]({})
          }}
        >
          <Text style={styles.close}>取消</Text>
        </TouchableOpacity>
      </View>
    )
  }

  onFocus = () => {
    this.props.onFocus && this.props.onFocus()
  }

  onSubmitEditing = (event) => {
    this.props.onSubmitEditing && this.props.onSubmitEditing(event)
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: getResponsiveHeight(64),
    paddingTop: getResponsiveHeight(28),
    width: WIDTH,
    paddingLeft: getResponsiveWidth(8)
  },
  image_search: {
    position: 'absolute',
    left: getResponsiveWidth(16),
    top: getResponsiveHeight(36),
    zIndex: 2
  },
  textInput: {
    width: getResponsiveWidth(316),
    height: getResponsiveHeight(28),
    paddingLeft: getResponsiveWidth(30),
    backgroundColor: 'white',
    borderRadius: getResponsiveHeight(8),
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 14
  },
  close_container: {
    height: getResponsiveHeight(28),
    width: getResponsiveWidth(44),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  close: {
    fontSize: 17,
    color: '#FF7373'
  }
})
