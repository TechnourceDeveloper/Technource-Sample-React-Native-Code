import React, {useState, useContext} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Button, Overlay} from 'react-native-elements'

const ChargeAlert = props => {

  let buttonBlock = (
      <>
      <TouchableOpacity 
        style={styles.buttonBg}
        onPress={props.rejectAction}
        >
          <Text style={styles.buttonText}>No</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.buttonBg}
        onPress={props.acceptAction}
        >
          <Text style={styles.buttonText}>Yes</Text>
      </TouchableOpacity>
      </>
    )

  return (
    <Overlay overlayStyle={styles.mainContainer} isVisible={props.isVisible}>
      <>
        <Text style={{ fontSize: 20, textAlign: 'center', padding: 10}}>{props.message}</Text>
        <TextInput
                placeholder="Enter Card Number"
                placeholderTextColor="#bbbbbb"
                autoCapitalize="none"
                autoCorrect={false}
                style={Styles.inputStyle}
                returnKeyType='next'
                keyboardType='numeric'
              />
        <View style={styles.btnContainer}>{buttonBlock}</View>
      </>
    </Overlay>
  )
}

export {ChargeAlert}

const styles = StyleSheet.create({
   buttonBg:{
      borderRadius: 20,
      alignContent: 'center',
      width: '40%',
      alignSelf: 'center',
      backgroundColor:'#1E6BB9',
      marginTop: 10,
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding:10,
      marginHorizontal: 5
  },
  buttonText:{
    color:"white",
    fontSize:16,
    textAlign: 'center',
      fontWeight: "bold",
      marginTop:3
  },
  mainContainer: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
  },
  txtMessage: {
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
    fontFamily: 'Karla-Regular',
  },
  btnContainer: {flexDirection: 'row', justifyContent: 'center', padding: 20},
})
