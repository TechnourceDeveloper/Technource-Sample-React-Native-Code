import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Input} from 'react-native-elements'

const CustomInput = props => {
  return (
    <Input
      {...props}
      inputStyle={props.inputStyle}
      inputContainerStyle={styles.inputContainer}
      placeholderTextColor={props.placeholderTextColor? props.placeholderTextColor:"#587DAA"}
      multiline = {false}
      >
      {props.children}
    </Input>
  )
}

export {CustomInput}

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 0,
    width:280
  },
  label: {
    padding: 10,
    fontSize: 15,
    color: '#3E505F'
  },
  error:{
  }
})
