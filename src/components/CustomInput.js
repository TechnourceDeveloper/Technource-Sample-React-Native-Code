import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Input} from 'react-native-elements'

const CustomInput = props => {
  return (
    <Input
      {...props}
      ref={props.forwardRef}
      inputStyle={props.inputStyle}
      inputContainerStyle={[props.inputContainerStyle, styles.inputContainer]}
      labelStyle={[
        props.labelStyle,
        styles.label,
      ]}
      placeholderTextColor={props.placeholderTextColor? props.placeholderTextColor:"#587DAA"}
      multiline = {props.multiline?true:false}
      errorStyle={styles.error}
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
