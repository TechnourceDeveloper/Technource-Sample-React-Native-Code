import React, { Component, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {Styles} from './Styles'
import { Formik } from "formik";
import * as yup from 'yup'
import {USER_STAGE} from '../../config';
import {useDispatch, useSelector} from 'react-redux';
import {setStage} from '../../store/actions/stage';
import { showMessage, hideMessage } from "react-native-flash-message";
import { CustomInput } from '../../components/CustomInput'
import {Input} from 'react-native-elements'

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

const CardAddEdit = ({route,navigation}) =>
{
	const dispatch = useDispatch()

	const id = route.params.id;
	const chid_id = route.params.chid_id;
	const [card, setCard] = useState({
	    name: '',
	    child_id :'', 
	    number: '',
	    month: '', 
	    year: '', 
	    cvv: '',
	    limit: '',
	    remains_limit: ''
	  })

	const _cardValidationSchema = yup.object().shape({
			name: yup
			  .string()
			  .required("Name required*"),
			month: yup
			  .string()
			   .min(2,"2 digit required*")
			  .required("Month required*"),
			year: yup
			  .string()
			  .min(4,"4 digit required*")
			  .required("Year required*"),
			cvv: yup
			  .string()
			  .min(3,"3 digit required*")
			  .required("CVV required*"),
			number: yup
			  .string()
			  .min(16,"16 digit required*")
			  .required("Card Number required*"),
			limit: yup
			  .string()
			  .required("Limit required*"),
		  })

	 useEffect(() => {
	  	console.log("id ",id)
	  	console.log("chid_id ",chid_id)
	  	if(id != ''){
	  		db.transaction((tx) => {
			      tx.executeSql(
			        'SELECT * FROM table_card where id = '+id,
			        [],
			        (tx, results) => {
			        	 var temp = [];
			        	for (let i = 0; i < results.rows.length; ++i)
			            temp.push(results.rows.item(i));

			        	console.log("results ",temp)
			        	 setCard(prevConfig => {
					      return {
					        ...prevConfig,
					        ...card,
					         name: temp[0].name,
						    child_id :temp[0].chid_id, 
						    number: temp[0].number,
						    month: temp[0].month, 
						    year:temp[0].year,
						    cvv: temp[0].cvv,
						    limit: temp[0].card_limit,
						    remains_limit:temp[0].remains_limit
					      }
					    })
			        },(err)=>{
			        	console.log("err ",err)
			        }
			      );
			    });
	  	}
		}, []);

	 const _addCard = ({name,number,month,cvv,limit,year}) => {


	 	 var mon = new Date().getMonth() + 1;
      	 var yr = new Date().getFullYear();

      	  if(parseInt(month)<1 || parseInt(month)>12){
      	 	showMessage({
			        message: "Error",
			        description: "Month should be 01 to 12",
			        type: "default",
			        backgroundColor: "#F00", // background color
			        color: "#FFF", // text color
			      });
				return
      	 }

      	 if(mon>parseInt(month) && yr == parseInt(year)){
				showMessage({
			        message: "Error",
			        description: "Card Expiry date is not valid",
			        type: "default",
			        backgroundColor: "#F00", // background color
			        color: "#FFF", // text color
			      });
				return
      	 }

      	

      	 else if(yr > parseInt(year)){
      	 	showMessage({
			        message: "Error",
			        description: "Card Expiry date is not valid",
			        type: "default",
			        backgroundColor: "#F00", // background color
			        color: "#FFF", // text color
			      });
      	 	return
      	 }

      	 if(card.limit != limit){
      	 	card.remains_limit = limit
      	 }


	 	console.log("_addCard ")
	 	if(id != ''){

			db.transaction(function (tx) {
		      tx.executeSql(
			        'UPDATE table_card set name=?, child_id = ?,number = ?, month = ?, year = ?, cvv = ?, card_limit = ?, remains_limit=?  where id=?',
			        [name,chid_id,number,month,year,cvv,limit,card.remains_limit,id],
			        (tx, results) => {
			          console.log('Results', results.rowsAffected);
			          if (results.rowsAffected > 0) {
			          	showMessage({
						          message: "Update Successfully",
						          type: "default",
						          backgroundColor: "#1E6BB9", // background color
						          color: "#FFF", // text color
						        });
			           	navigation.goBack()
			          } else {
			          	 showMessage({
							        message: "Error",
							        description: "Update Card Faild",
							        type: "default",
							        backgroundColor: "#F00", // background color
							        color: "#FFF", // text color
							      });
			          }
			        },
			        (err)=>{
			        	console.log("err ",err)
			        }
			      );
			    });
	 	}
	 	else{
	 		console.log("_addCard 2")
	 		db.transaction(function (tx) {
		      tx.executeSql(
			        'INSERT INTO table_card (name, child_id, number, month, year,cvv,card_limit,remains_limit) VALUES (?,?,?,?,?,?,?,?)',
			        [name,chid_id,number,month,year,cvv,limit,limit],
			        (tx, results) => {
			          console.log('Results', results.rowsAffected);
			          if (results.rowsAffected > 0) {
			          	showMessage({
						          message: "Insert Successfully",
						          type: "default",
						          backgroundColor: "#1E6BB9", // background color
						          color: "#FFF", // text color
						        });
			           	navigation.goBack()
			          } else {
			          	 showMessage({
							        message: "Error",
							        description: "Add Card Faild",
							        type: "default",
							        backgroundColor: "#F00", // background color
							        color: "#FFF", // text color
							      });
			          };
			        },
			        (err)=>{
			        	console.log("err ",err)
			        }
			      );
			    },(err)=>{
			    	console.log("err 123  ",err)
			    });
	 	}
	 }

		return(
			<SafeAreaView style = {Styles.container}>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View  style={{ flex: 1, justifyContent:'center', alignContent: 'center',alignItems:'center', alignSelf:'center' }}>
				       
						<Formik
								initialValues={{ name: card.name, month: card.month,year: card.year, cvv: card.cvv, number: card.number, limit: card.limit }}
								onSubmit={values => _addCard(values)}
								validationSchema={_cardValidationSchema}
								enableReinitialize>
								{({
									values,
									handleChange,
									errors,
									setFieldTouched,
									touched,
									isValid,
									handleSubmit,
								}) => (
									<>
							<CustomInput
								placeholder="Enter Name"
								placeholderTextColor="#bbbbbb"
								autoCapitalize="none"
								autoCorrect={false}
								style={Styles.inputStyle}
								returnKeyType='next'
								onChangeText={handleChange('name')}
								onBlur={() => setFieldTouched('name')}
								value={values.name}
								disabled = {id == ''?false:true}
								errorMessage={touched.name && errors.name}
							/>
							<CustomInput
								placeholder="Enter Card Number"
								placeholderTextColor="#bbbbbb"
								autoCapitalize="none"
								autoCorrect={false}
								style={Styles.inputStyle}
								returnKeyType='next'
								onChangeText={handleChange('number')}
								keyboardType='numeric'
								onBlur={() => setFieldTouched('number')}
								maxLength={16}
								disabled = {id == ''?false:true}
								value={values.number.toString()=='0'?"":values.number.toString()}
								errorMessage={touched.number && errors.number}
							/>

							<View style={Styles.expiryDateContainer}>
								<View>
								<Input
									placeholder="MM"
									placeholderTextColor="#bbbbbb"
									autoCapitalize="none"
									autoCorrect={false}
									style={Styles.dateInputStyle}
									returnKeyType='next'
									onChangeText={handleChange('month')}
									onBlur={() => setFieldTouched('month')}
									value={values.month}
									disabled = {id == ''?false:true}
									maxLength={3}
									inputContainerStyle={{borderBottomWidth: 0,width:130}}
									errorMessage={touched.month && errors.month}
								/>
								</View>
								<View>

								<Input
									placeholder="YYYY"
									placeholderTextColor="#bbbbbb"
									autoCapitalize="none"
									autoCorrect={false}
									style={Styles.dateInputStyle}
									returnKeyType='next'
									maxLength={4}
									disabled = {id == ''?false:true}
									inputContainerStyle={{borderBottomWidth: 0,width:130}}
									onChangeText={handleChange('year')}
									onBlur={() => setFieldTouched('year')}
									value={values.year}
									errorMessage={touched.year && errors.year}
								/>
								</View>
							</View>

							<CustomInput
								placeholder="Enter CVV"
								placeholderTextColor="#bbbbbb"
								autoCapitalize="none"
								autoCorrect={false}
								style={Styles.inputStyle}
								returnKeyType='next'
								maxLength={3}
								disabled = {id == ''?false:true}
								keyboardType='numeric'
								onChangeText={handleChange('cvv')}
								onBlur={() => setFieldTouched('cvv')}
								value={values.cvv.toString()=='0'?"":values.cvv.toString()}
								errorMessage={touched.cvv && errors.cvv}
							/>

							<CustomInput
								placeholder="Enter Limit On Card"
								placeholderTextColor="#bbbbbb"
								autoCapitalize="none"
								autoCorrect={false}
								style={Styles.inputStyle}
								returnKeyType='next'
								keyboardType='numeric'
								onChangeText={handleChange('limit')}
								onBlur={() => setFieldTouched('limit')}
								value={values.limit.toString()=='0'?"":values.limit.toString()}
								errorMessage={touched.limit && errors.limit}
							/>
										<TouchableOpacity 
										style={Styles.buttonBg}
										onPress={handleSubmit}
										>
											<Text style={Styles.buttonText}>Add Card</Text>
										</TouchableOpacity>

									</>
								)}
							</Formik>
				</View>
				</ScrollView>
			</SafeAreaView>
		);
	}

export default CardAddEdit
