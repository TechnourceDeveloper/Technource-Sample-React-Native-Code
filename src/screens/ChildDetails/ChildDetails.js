import React, { Component, useState, useEffect  } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import {Styles} from './Styles'
import {FlatList} from 'react-native'
import {CardBox} from '../../components/CardBox'
import {AddButton} from '../../components/AddButton'
import {Alert} from '../../components/Alert'
import { showMessage, hideMessage } from "react-native-flash-message";

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

const ChildDetails  = ({route, navigation}) =>
{
	 const articleId = route.params.articleId;
	 const id = route.params.id;
	 const chid_id = route.params.chid_id;
	 let [cardId, setCardId] = useState(0);	

	let [cards, setCards] = useState([]);	

		const [alertConfig, setAlertConfig] = useState({
		    visible: false,
		    buttonType: 'YN',
		    message: '',
		    acceptAction: () => {},
		    rejectAction: () => {},
		  })

		const showAlertMessage = alertConfig => {
		    setAlertConfig(prevConfig => {
		      return {
		        ...prevConfig,
		        ...alertConfig,
		        visible: true,
		      }
		    })
		  }

		  const hideAlertMessage = () => {
		    setAlertConfig(prevConfig => {
		      return {
		        ...prevConfig,
		        visible: false,
		        buttonType: 'YN'
		      }
		    })
		  }

		const _removeCardProcess = () =>{
			 db.transaction((tx) => {
					      tx.executeSql(
					        'DELETE FROM  table_card where id=?',
					        [cardId],
					        (tx, results) => {
					          console.log('Results', results.rowsAffected);
					          if (results.rowsAffected > 0) {
					          	showMessage({
						          message: "Removed Successfully",
						          type: "default",
						          backgroundColor: "#1E6BB9", // background color
						          color: "#FFF", // text color
						        });
					          		setCardId(0)
					           		_fetchData()
					          } else {
					           showMessage({
							        message: "Error",
							        description: "Something wents wrong",
							        type: "default",
							        backgroundColor: "#F00", // background color
							        color: "#FFF", // text color
							      });
					          }
					        },(err)=>{
					        	console.log("err ",err);
					        }
					      );
					    });
		   hideAlertMessage()
		}

		const _payCardProcess = (limit) =>{

			db.transaction((tx) => {
			      tx.executeSql(
			        'SELECT remains_limit FROM table_card where id = ?',
			        [cardId],
			        (tx, results) => {
			          var temp = [];
			          for (let i = 0; i < results.rows.length; ++i)
			            temp.push(results.rows.item(i));

			        console.log("remains_limit ",parseFloat(temp[0].remains_limit))

			        if(parseFloat(temp[0].remains_limit)>=parseFloat(limit)){
			        	 var new_limit = parseFloat(temp[0].remains_limit) - parseFloat(limit)
				        console.log('limit ',new_limit);
				          db.transaction((tx) => {
					      tx.executeSql(
					        'UPDATE table_card set remains_limit=? where id=?',
					        [new_limit, cardId],
					        (tx, results) => {
					          console.log('Results', results.rowsAffected);
					          if (results.rowsAffected > 0) {
					          		showMessage({
							          message: "Pay Successfully",
							          type: "default",
							          backgroundColor: "#1E6BB9", // background color
							          color: "#FFF", // text color
							        });
					          		setCardId(0)
					           		_fetchData()
					          } else {
					            showMessage({
							        message: "Error",
							        description: "Something wents wrong",
							        type: "default",
							        backgroundColor: "#F00", // background color
							        color: "#FFF", // text color
							      });
					          }
					        }
					      );
					    });
			        }
			        else{
			        	  showMessage({
							        message: "Error",
							        description: "You don`t have sufficient limit",
							        type: "default",
							        backgroundColor: "#F00", // background color
							        color: "#FFF", // text color
							      });
			        	console.log("you don`t have sufficient limit");
			        }
			        },(err)=>{
			    	console.log("errr ",err)
			    }
			      );
			    },(err)=>{
			    	console.log("errr ",err)
			    });
		   hideAlertMessage()
		}


		const _removeCard = () => {
		    showAlertMessage({
		      message: 'Are you sure to delete this Card?',
		      rejectAction: hideAlertMessage,
		      buttonType: 'YN'
		    })
		  }

		const _payChild = () => {
		    showAlertMessage({
		      message: '',
		      rejectAction: hideAlertMessage,
		      buttonType: 'PAY'
		    })
		  }

		  const _fetchData = () =>{
		  	db.transaction((tx) => {
			      tx.executeSql(
			        'SELECT * FROM table_card where child_id = ?',
			        [chid_id],
			        (tx, results) => {
			          var temp = [];
			          for (let i = 0; i < results.rows.length; ++i)
			            temp.push(results.rows.item(i));
			          setCards(temp);
			          console.log("result ",temp)
			        }
			      );
			    });
		  }
 

		 useEffect(() => {
		 	console.log("child_id ",chid_id)
		 	 const unsubscribe = navigation.addListener('focus', () => {
		 	 	 _fetchData()
		      // The screen is focused
		      // Call any action
		    });

		    // Return the function to unsubscribe from the event so it gets removed on unmount
		    return unsubscribe;

		  
		  }, [navigation]);


		return(
			<View>
			 <AddButton
		          title = "Add Card"
		          navigation = {navigation}
		          redirectTo = "CardAddEdit"
		          childId = {id}
		        />
		         <FlatList
			      style={{marginTop: 10}}
			      contentContainerStyle={{flexGrow: 1}}
			      ListEmptyComponent={<Text style={Styles.noCardText}>No Cards Available</Text>}
			      data={cards}
			      keyExtractor={item => item.id.toString()}
			      renderItem={({item}) => {
			        return (
			          item && (
			            <CardBox
			              cards={item}
			              childId = {chid_id}
			              deleteCard = {(id)=>{
			              	console.log("idddddd ",id)
		        				setCardId(id)
						      	_removeCard()
						      }}
			              chargeCard = {(id)=>{
			              	console.log("idddddd ",id)
		        				setCardId(id)
					      	_payChild()
					      }}
			              navigation = {navigation}
			            />
			          )
			        )
			      }}
			    />

		     <Alert
		        isVisible={alertConfig.visible}
		        message={alertConfig.message}
		        buttonType = {alertConfig.buttonType}
		        acceptAction={() => {
		          _removeCardProcess()
		        }}
		        rejectAction={() => {
		          alertConfig.rejectAction()
		        }}
		        payAction={(limit)=>{
		        	console.log("limit ",limit)
		        	_payCardProcess(limit)
		        }}
		      />
			</View>
			
		);
}

export default ChildDetails;