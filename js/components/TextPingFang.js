import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'

export default function TextPingFang (props) {

  const { style, children, ...restProps } = props

  return (
    <Text { ...restProps } style={[styles.font, style]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  font: {
    fontFamily: 'PingFang SC'
  }
})
