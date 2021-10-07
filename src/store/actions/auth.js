import { Platform } from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage } from "react-native-flash-message";
import RNBootSplash from 'react-native-bootsplash';

export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
}


export const loginSuccess = () => ({
  type: actionTypes.LOGIN_SUCCESS
})

export const logoutRequest = () => ({
  type: actionTypes.LOGOUT
})