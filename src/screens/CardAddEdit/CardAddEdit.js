import React, { Component, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import {Styles} from './Styles'
import { Formik } from "formik";
import * as yup from 'yup'
import {USER_STAGE} from '../../config';
import {useDispatch, useSelector} from 'react-redux';
import {setStage} from '../../store/actions/stage';
import { showMessage, hideMessage } from "react-native-flash-message";
import { CustomInput } from '../../components/CustomInput'

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
	    date: '', 
	    cvv: '',
	    limit: ''
	  })

	const _cardValidationSchema = yup.object().shape({
			name: yup
			  .string()
			  .required("Please enter name"),
			date: yup
			  .string()
			  .required("Please enter expiry date"),
			cvv: yup
			  .string()
			  .required("Please enter cvv"),
			number: yup
			  .string()
			  .required("Please enter number"),
			limit: yup
			  .string()
			  .required("Please enter limit"),
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
						    date: temp[0].date, 
						    cvv: temp[0].cvv,
						    limit: temp[0].card_limit
					      }
					    })
			        },(err)=>{
			        	console.log("err ",err)
			        }
			      );
			    });
	  	}
		}, []);

	 const _addCard = ({name,number,date,cvv,limit}) => {
	 	console.log("_addCard ")
	 	if(id != ''){
			db.transaction(function (tx) {
		      tx.executeSql(
			        'UPDATE table_card set name=?, child_id = ?,number = ?, date = ?, cvv = ?, card_limit = ?  where id=?',
			        [name,chid_id,number,date,cvv,limit,id],
			        (tx, results) => {
			          console.log('Results', results.rowsAffected);
			          if (results.rowsAffected > 0) {
			          	showMessage({
						          message: "Update Successfully",
						          type: "default",
						          backgroundColor: "#0F0", // background color
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
			        'INSERT INTO table_card (name,child_id,number,date,cvv,card_limit) VALUES (?,?,?,?,?,?)',
			        [name,chid_id,number,date,cvv,limit],
			        (tx, results) => {
			          console.log('Results', results.rowsAffected);
			          if (results.rowsAffected > 0) {
			          	showMessage({
						          message: "Insert Successfully",
						          type: "default",
						          backgroundColor: "#0F0", // background color
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
				<View>
				       
						<Formik
								initialValues={{ name: card.name, date: card.date, cvv: card.cvv, number: card.cvv, limit: card.limit }}
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
								value={values.number.toString()=='0'?"":values.number.toString()}
								errorMessage={touched.number && errors.number}
							/>

							<CustomInput
								placeholder="Enter Expiry Date"
								placeholderTextColor="#bbbbbb"
								autoCapitalize="none"
								autoCorrect={false}
								style={Styles.inputStyle}
								returnKeyType='next'
								onChangeText={handleChange('date')}
								onBlur={() => setFieldTouched('date')}
								value={values.date}
								errorMessage={touched.date && errors.date}
							/>

							<CustomInput
								placeholder="Enter CVV"
								placeholderTextColor="#bbbbbb"
								autoCapitalize="none"
								autoCorrect={false}
								style={Styles.inputStyle}
								returnKeyType='next'
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
			</SafeAreaView>
		);
	}

export default CardAddEdit
