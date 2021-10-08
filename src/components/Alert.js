import React, {useState, useContext} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {Button, Overlay} from 'react-native-elements'

const Alert = props => {

  let buttonBlock = null;
  const [limit,setLimit] = useState(0);

  if(props.buttonType == 'YN'){
      buttonBlock = (
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
  }
  else{
    buttonBlock = (
      <>
      <TouchableOpacity 
        style={styles.buttonBg}
        onPress={props.rejectAction}
        >
          <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.buttonBg}
        onPress={()=>props.payAction(limit)}
        >
          <Text style={styles.buttonText}>Pay</Text>
      </TouchableOpacity>
      </>
    )
  }

  return (
    <Overlay overlayStyle={styles.mainContainer} isVisible={props.isVisible}>
      <>
        
        {props.buttonType == 'PAY'?
          <TextInput
                placeholder="Enter Amount"
                placeholderTextColor="#bbbbbb"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}
                returnKeyType='next'
                keyboardType='numeric'
                onChangeText={text=>setLimit(text)}
                value={limit.toString() == 0?"":limit.toString()}
              />
           :
           <Text style={{ fontSize: 20, textAlign: 'center', padding: 10, color:"black"}}>{props.message}</Text>
      }
        <View style={styles.btnContainer}>{buttonBlock}</View>
      </>
    </Overlay>
  )
}

export {Alert}

const styles = StyleSheet.create({
  buttonBg:{
      borderRadius: 20,
      alignContent: 'center',
      width:'50%',
      alignSelf: 'center',
      backgroundColor:'#1E6BB9',
      marginTop: 10,
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding:10,
      textAlign: 'center',
      marginHorizontal:5

  },
  buttonText:{
    color:"white",
    fontSize:14,
    textAlign: 'center',
      fontWeight: "bold",
      marginTop:3,
      alignItems: 'center',
      width:'50%'

  },
  inputStyle:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      padding:3,
      marginTop:10,
      paddingLeft:10,
      paddingRight:10,
      backgroundColor:'white',
      borderRadius:5,
      borderWidth: 1,
      borderColor: '#1E6BB9',
      width:280,
        color:'#3A3A3A',
        height: 40,
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'center'
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
