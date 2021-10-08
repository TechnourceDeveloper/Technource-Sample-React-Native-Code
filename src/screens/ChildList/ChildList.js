import React, { Component, useState, useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import {Styles} from './Styles'
import {FlatList} from 'react-native'
import {ChildBox} from '../../components/ChildBox'
import {AddButton} from '../../components/AddButton'
import {Alert} from '../../components/Alert'
import { showMessage, hideMessage } from "react-native-flash-message";

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });


 const ChildList  = ({navigation}) =>
{
	let [users, setUsers] = useState([]);	
	let [id, setId] = useState(0);	
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
		        visible: false
		      }
		    })
		  }

		const _removeChildProcess = () =>{
			 db.transaction((tx) => {
		      tx.executeSql(
		        'DELETE FROM  table_child where id=?',
		        [id],
		        (tx, results) => {
		          console.log('Results', results.rowsAffected);
		          if (results.rowsAffected > 0) {
		           	 db.transaction((tx) => {
					      tx.executeSql(
					        'DELETE FROM  table_card where child_id=?',
					        [id],
					        (tx, results) => {
					            	showMessage({
							          message: "Removed Successfully",
							          type: "default",
							          backgroundColor: "#1E6BB9", // background color
							          color: "#FFF", // text color
							        });
					          		setId(0)
					           		_fetchData()
					        }
					      );
					    });
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
		   hideAlertMessage()

		}

		const rejectAction = () =>{
			
		}

		const _removeChild = () => {
		    showAlertMessage({
		      message: 'Are you sure to delete this Child?',
		      rejectAction: hideAlertMessage,
		      buttonType: 'YN'
		    })
		  }

		  const _fetchData = () =>{
		  	 db.transaction((tx) => {
			      tx.executeSql(
			        'SELECT * FROM table_child',
			        [],
			        (tx, results) => {
			          var temp = [];
			          for (let i = 0; i < results.rows.length; ++i)
			            temp.push(results.rows.item(i));
			          setUsers(temp);
			          console.log("result ",temp)
			        }
			      );
			    });
		  }

		 useEffect(() => {
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
		          title = "Add Child"
		          navigation = {navigation}
		          redirectTo = "ChildAddEdit"
		        />
		         <FlatList
			      style={{marginTop: 10}}
			      contentContainerStyle={{flexGrow: 1}}
			      ListEmptyComponent={<Text style={Styles.noUserText}>No Users Available</Text>}
			      data={users}
			      keyExtractor={item => item.id.toString()}
			      renderItem={({item}) => {
			        return (
			          item && (
			            <ChildBox
			              user={item}
			              childId = {item.id}
			              deleteChild = {(id)=>{
			              	setId(id)
					      	_removeChild()
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
			          _removeChildProcess()
			        }}
			        rejectAction={() => {
			          alertConfig.rejectAction()
			        }}
			      />
			</View>
			
		);
}

export default ChildList