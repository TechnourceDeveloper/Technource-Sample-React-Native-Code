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

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

const ChildAddEdit = ({route, navigation}) =>
{
	const dispatch = useDispatch()
	const id = route.params.id;
	const [child, setChild] = useState({
	    name: '',
	    age: ''
	  })

	const _cardValidationSchema = yup.object().shape({
			name: yup
			  .string()
			  .required("Please enter name"),
			age: yup
			  .string()
			  .required("Please enter age")
		  })

	 const _addChild = ({name,age}) => {
	 	console.log("rrrr ","_addChild");

	 	if(id != ''){
			db.transaction(function (tx) {
		      tx.executeSql(
			        'UPDATE table_child set name=?, age=? where id=?',
			        [name,age,id],
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
							        description: "Update Child Faild",
							        type: "default",
							        backgroundColor: "#F00", // background color
							        color: "#FFF", // text color
							      });}
			        },
			        (err)=>{
			        	console.log("err ",err)
			        }
			      );
			    });
	 	}
	 	else{
	 		db.transaction(function (tx) {
		      tx.executeSql(
			        'INSERT INTO table_child (name, age) VALUES (?,?)',
			        [name,age],
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
							        description: "Insert Child Faild",
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
	 	
	 }

	  useEffect(() => {
	  	console.log("id ",id)
	  	if(id != ''){
	  		db.transaction((tx) => {
			      tx.executeSql(
			        'SELECT * FROM table_child where id = '+id,
			        [],
			        (tx, results) => {
			        	 var temp = [];
			        	for (let i = 0; i < results.rows.length; ++i)
			            temp.push(results.rows.item(i));

			        	console.log("results ",temp)
			        	 setChild(prevConfig => {
					      return {
					        ...prevConfig,
					        ...child,
					        name: temp[0].name,
					        age: temp[0].age
					      }
					    })
			        },(err)=>{
			        	console.log("err ",err)
			        }
			      );
			    });
	  	}
		}, []);

		return(
			<SafeAreaView style = {Styles.container}>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View  style={{ flex: 1, justifyContent:'center', alignContent: 'center',alignItems:'center', alignSelf:'center' }}>
				       
				       
						<Formik
								initialValues={{ name:child.name, age: child.age.toString()}}
								onSubmit={values => _addChild(values)}
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
								value={values.name}
								onBlur={() => setFieldTouched('name')}
								errorMessage={touched.name && errors.name}
							/>
							<CustomInput
								placeholder="Enter Age"
								placeholderTextColor="#bbbbbb"
								autoCapitalize="none"
								autoCorrect={false}
								style={Styles.inputStyle}
								returnKeyType='next'
								onChangeText={handleChange('age')}
								keyboardType='numeric'
								maxLength={3}
								value={values.age.toString()=='0'?"":values.age.toString()}
								onBlur={() => setFieldTouched('age')}
								errorMessage={touched.age && errors.age}
							/>

							<TouchableOpacity 
								style={Styles.buttonBg}
								onPress={handleSubmit}
							>
								<Text style={Styles.buttonText}>Add Child</Text>
							</TouchableOpacity>

									</>
								)}
							</Formik>
				</View>
				</ScrollView>
			</SafeAreaView>
		);
	}

export default ChildAddEdit
