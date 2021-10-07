import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'

const AddButton = ({title,navigation,redirectTo,childId}) => {

  const  _addChild = () => {
    navigation.navigate(redirectTo, {
            id:"",
            chid_id:childId
          });
  }

  return (
    <TouchableOpacity
    style = {styles.container}
    onPress = {_addChild}
    >
      <Image
       source={require('../assets/ic_add.png')}
       style={styles.icon}
      />
      <Text style={styles.title}> {title} </Text>
    </TouchableOpacity>
  )
}

export {AddButton}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    alignContent: 'center',
    width: '80%',
    alignSelf: 'center',
    backgroundColor:'#1E6BB9',
    marginTop: 10,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding:10
  },
  title: {color:"white",fontSize:18, textAlign: 'center',fontWeight: "bold"},
  icon:{
    height:15,
    width:15
  }
})
