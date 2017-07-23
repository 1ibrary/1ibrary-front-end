import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  PropTypes,
  AsyncStorage,
  Dimensions
} from 'react-native'
import {INNERWIDTH, HEIGHT,getResponsiveHeight,getResponsiveWidth} from "../common/styles"

export default class SearchNavHomePage extends Component {
  constructor(props) {
    super(props)
  }
  static defaultProps = {
    onChangeText: text => {}
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder={'请输入你想要搜索的书籍'}
          placeholderTextColor={'rgb(165,165,165)'}
          defaultValue={this.props.defaultValue}
          onChangeText={text => {
            this.props.onChangeText(text)
          }}
          onFocus={() => {
            if (this.props.onFocus) {
              this.props.onFocus()
            }
          }}
          clearButtonMode={'while-editing'}
          onSubmitEditing={event => {
            if (this.props.onSubmitEditing) {
              this.props.onSubmitEditing(event)
            }
          }}
        />
        <Image
          style={styles.image_search}
          source={require('../../res/images/search_image.png')}
        />
        {this.props.icon}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: getResponsiveHeight(44),
    width: INNERWIDTH,
    marginTop: getResponsiveHeight(36),
    backgroundColor: 'rgb(242,246,250)'
  },
  show: {
    display: 'flex'
  },
  hide: {
    display: 'none'
  },
  image_search: {
    borderRadius: 0,
    position: 'absolute',
    left: getResponsiveWidth(76),
    top: getResponsiveHeight(16),
    zIndex: 2
  },
  close: {
    fontSize: 17,
    color: '#FF7373'
  },
  textInput: {
    width: INNERWIDTH,
    height: getResponsiveHeight(44),
    paddingLeft: getResponsiveWidth(92),
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 14
  }
})
