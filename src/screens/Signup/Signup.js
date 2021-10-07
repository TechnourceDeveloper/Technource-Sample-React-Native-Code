import React, { Component, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import {Styles} from './Styles'
import { Formik } from "formik";
import * as yup from 'yup'
import {USER_STAGE} from '../../config';
import {useDispatch, useSelector} from 'react-redux';
import {setStage} from '../../store/actions/stage';
import {loginSuccess} from '../../store/actions/auth';
import { openDatabase } from 'react-native-sqlite-storage';
import { showMessage, hideMessage } from "react-native-flash-message";
import { CustomInput } from '../../components/CustomInput'

var db = openDatabase({ name: 'UserDatabase.db' });

const Signup = ({navigation}) =>
{
	const dispatch = useDispatch()
	const _loginValidationSchema = yup.object().shape({
			email: yup
			  .string()
			  .email("Enter a valid email")
			  .required("Please enter email"),
			name: yup
			  .string()
			  .required("Please enter name"),
		  })

	 useEffect(() => {
    db.transaction(function (txn) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), email VARCHAR(60))',
              []
            );
    });
      db.transaction(function (txn) {
         
            txn.executeSql('DROP TABLE IF EXISTS table_child', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_child(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), age INT(3))',
              []
            );

    });
        db.transaction(function (txn) {

            txn.executeSql('DROP TABLE IF EXISTS table_card', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_card(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), child_id INT(5), number INT(16), date VARCHAR(20), cvv  INT(3), card_limit  DOUBLE(10))',
              []
            );
    });
  }, []);

	 const _doLogin = ({email,name}) => {
	 	db.transaction(function (tx) {
	      tx.executeSql(
		        'INSERT INTO table_user (name, email) VALUES (?,?)',
		        [name,email],
		        (tx, results) => {
		          console.log('Results', results.rowsAffected);
		          if (results.rowsAffected > 0) {
		          	showMessage({
						          message: "Login Successfully",
						          type: "default",
						          backgroundColor: "#0F0", // background color
						          color: "#FFF", // text color
						        });
		           	dispatch(loginSuccess())
					dispatch(setStage(USER_STAGE.DASHBOARD))
		          } else {
		          	 showMessage({
							        message: "Error",
							        description: "Registration Failed",
							        type: "default",
							        backgroundColor: "#F00", // background color
							        color: "#FFF", // text color
							      });
		          }
		        }
		      );
		    });
	 	
	 }

		return(
			<SafeAreaView style = {Styles.container}>
				<View>
				        <Text style={Styles.text}>Login</Text>
						<Formik
								initialValues={{ email: '', name: '' }}
								onSubmit={values => _doLogin(values)}
								validationSchema={_loginValidationSchema}>
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
								placeholder="Enter Email"
								placeholderTextColor="#bbbbbb"
								autoCapitalize="none"
								autoCorrect={false}
								style={Styles.inputStyle}
								returnKeyType='next'
								onChangeText={handleChange('email')}
								onBlur={() => setFieldTouched('email')}
								errorMessage={touched.email && errors.email}
							/>
										
						<CustomInput
							placeholder="Enter your name"
							placeholderTextColor="#bbbbbb"
							autoCapitalize="none"
							autoCorrect={false}
							style={Styles.inputStyle}
							returnKeyType='next'
							onChangeText={handleChange('name')}
							onBlur={() => setFieldTouched('name')}
							errorMessage={touched.name && errors.name}
						/>
										<TouchableOpacity 
										style={Styles.buttonBg}
										onPress={handleSubmit}
										>
											<Text style={Styles.buttonText}>Login</Text>
										</TouchableOpacity>

									</>
								)}
							</Formik>
				</View>
			</SafeAreaView>
		);
	}

export default Signup