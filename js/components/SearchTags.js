import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  Image
} from 'react-native'
import { INNERWIDTH} from '../common/styles'

export default class SearchTags extends Component {
  static defaultProps = {
    title: '搜索建议',
    data: ['测试', '测试']
  }
  
  render() {
    let cancel = (
      <TouchableOpacity
        onPress={() => {
          this.props.onPressDelete()
        }}
      >
        <Image source={require('../../res/images/delete.png')} />
      </TouchableOpacity>
    )

    return (
      <View style={[styles.tags, this.props.styles]}>
        <Text style={styles.tag_title}>
          {this.props.title}
        </Text>
        <View style={styles.tag_container}>
          {this.props.data &&
            this.props.data.map &&
            this.props.data.map((item, i) => {
              return (
                <View key={i} style={styles.tag_item}>
                  <Text
                    style={styles.tag_font}
                    onPress={() => {
                      this.props.onPress(item)
                    }}
                  >
                    {item}
                  </Text>
                  {this.props.cancel && cancel}
                </View>
              )
            })}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tags: {
    width: INNERWIDTH
  },
  tag_container: {
    borderRadius: 8,
    backgroundColor: 'white',
    width: INNERWIDTH,
    paddingLeft: 24,
    overflow: 'hidden'
  },
  tag_title: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '100',
    paddingBottom: 12
  },
  tag_item: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,230,230)'
  },
  tag_font: {
    fontSize: 14,
    width: 310,
    color: 'gray',
    fontWeight: '400'
  }
})
