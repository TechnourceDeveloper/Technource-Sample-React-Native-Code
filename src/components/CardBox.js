import React, {useContext, useState, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {ListItem} from 'react-native-elements'

const CardBox = ({cards,navigation, deleteCard, chargeCard, childId}) => {
  if (!cards) return false

const _editCard = () => {
     navigation.navigate('CardAddEdit', {
            id: cards.id,
            chid_id:childId
          })
  }

  return (
    <ListItem
      bottomDivider>
      <ListItem.Content>
        <ListItem.Title>
         
        </ListItem.Title>
        <View>
        <View style={styles.extraInfoContainer}>
           <Text style={styles.txtTitle}>{cards.name}</Text>
            <TouchableOpacity
              onPress={_editCard}
              style={styles.innerInfoContainer}>
                  <Image
                    source={require('../assets/ic_edit.png')}
                    style={styles.icon}
                  />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>deleteCard(cards.id)}
              style={styles.innerInfoContainer}>
              <Image
                source={require('../assets/ic_delete.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

         <View style={styles.extraInfoContainer}>
          <View style={styles.subTitleContainer}>
          <Text style={styles.txtSubDesc}>{"Card Number : "+cards.number}</Text>
            <Text style={styles.txtSubDesc}>{"Expiry Date : "+cards.month+" / "+cards.year}</Text>
            <Text style={styles.txtSubDesc}>{"CVV : "+cards.cvv}</Text>
            <Text style={styles.txtSubDesc}>{"Card Limit : "+cards.card_limit}</Text>
            <Text style={styles.txtSubDesc}>{"Remaing Limit : "+cards.remains_limit}</Text>
          </View>
          <TouchableOpacity
              style = {styles.container}
              onPress = {()=>chargeCard(cards.id)}
              >
                <Text style={styles.title}>Pay</Text>
              </TouchableOpacity>
         </View>

        </View>
      </ListItem.Content>
    </ListItem>
  )
}

export {CardBox}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
    backgroundColor:'#1E6BB9',
    flexDirection:'row',
    flex:1, 
    justifyContent:'center',
    alignContent: 'center',
    padding:5
  },
  title: {fontSize: 18,color: '#FFF',textAlign: 'center'},
  subTitleContainer: {marginTop: 5, marginBottom: 5},
  extraInfoContainer: {flexDirection: 'row',  width:'100%'},
  innerInfoContainer: {flexDirection: 'row',flex:1, justifyContent:'flex-end'},
  txtTitle: {fontWeight: 'bold',flexDirection: 'row',flex:7, justifyContent:'flex-start'},
  txtSubDesc: {marginTop: 10, flexWrap: 'wrap', color: '#000'},
  icon: {width: 15, height: 15},
})
