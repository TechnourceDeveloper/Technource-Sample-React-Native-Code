import React, {useContext, useState, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {ListItem} from 'react-native-elements'

const ChildBox = ({user,navigation,deleteChild,childId}) => {
  if (!user) return false

const _editUser = () => {
     navigation.navigate('ChildAddEdit', {
            id: user.id
          })
  }

  return (
    <ListItem
      onPress={() => {
        navigation.navigate('ChildDetails', {
            id: user.id,
            chid_id:childId
          })
      }}
      bottomDivider>
      <ListItem.Content>
        <ListItem.Title>
         
        </ListItem.Title>
        <View>
        <View style={styles.extraInfoContainer}>
           <Text style={styles.txtTitle}>{user.name}</Text>
            <TouchableOpacity
              onPress={_editUser}
              style={styles.innerInfoContainer}>
                  <Image
                    source={require('../assets/ic_edit.png')}
                    style={styles.icon}
                  />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>deleteChild(user.id)}
              style={styles.innerInfoContainer}>
              <Image
                source={require('../assets/ic_delete.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.subTitleContainer}>
            <Text style={styles.txtSubDesc}>{"Age : "+user.age}</Text>
          </View>
        </View>
      </ListItem.Content>
    </ListItem>
  )
}

export {ChildBox}

const styles = StyleSheet.create({
  subTitleContainer: {marginTop: 5, marginBottom: 5},
  extraInfoContainer: {flexDirection: 'row',  width:'100%'},
  innerInfoContainer: {flexDirection: 'row',flex:1, justifyContent:'flex-end'},
  txtTitle: {fontWeight: 'bold',flexDirection: 'row',flex:8, justifyContent:'flex-start', color:'#000'},
  txtSubDesc: {marginTop: 10, flexWrap: 'wrap', color: '#000'},
  icon: {width: 15, height: 15},
})
