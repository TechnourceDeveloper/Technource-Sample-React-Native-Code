import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CardAddEdit from "./CardAddEdit/CardAddEdit";
import ChildAddEdit from "./ChildAddEdit/ChildAddEdit";
import ChildDetails from "./ChildDetails/ChildDetails";
import ChildList from "./ChildList/ChildList";
import Start from "./Start/Start";
import RNBootSplash from 'react-native-bootsplash';
import FlashMessage from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from '../store'
import {Provider, shallowEqual, useSelector, useDispatch} from 'react-redux';
import {USER_STAGE} from '../config'
import { Image, TouchableOpacity} from 'react-native'
import {setStage} from '../store/actions/stage';
import {logoutRequest} from '../store/actions/auth';

const Stack = createStackNavigator();

const App = () => {
  const currentStage = useSelector(
    state => state.stage.currentStage,
    shallowEqual,
  )
  const dispatch = useDispatch()

   useEffect(() => 

   {
     setTimeout(() => {
      RNBootSplash.hide();
    }, 2000)
      
  }, [])

  return (
    <NavigationContainer>    
        {currentStage == USER_STAGE.DASHBOARD ?

          <Stack.Navigator>
             <Stack.Screen name="ChildList" component={ChildList} options={{ title: 'Child List',  headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  dispatch(logoutRequest())
                  dispatch(setStage(USER_STAGE.AUTH))
                }}
                style={{marginRight: 10}}>
                <Image
                  source={require('../assets/logout.png')}
                  style={{width: 35, height: 35}}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            )
          }, }}/>
             <Stack.Screen name="CardAddEdit" component={CardAddEdit} options={{ title: 'Card' }} />
              <Stack.Screen name="ChildAddEdit" component={ChildAddEdit} options={{ title: 'Child' }} />
               <Stack.Screen name="ChildDetails" component={ChildDetails} options={{ title: 'Child Detail' }} />
          </Stack.Navigator>
          :
          <Stack.Navigator headerMode="none">
             <Stack.Screen name="Start" component={Start}  />
          </Stack.Navigator>
        }
    </NavigationContainer>
  );
}

export default () =>{
  return (
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
            <FlashMessage position="top" icon="default" />
          </PersistGate>
        </Provider>
    );
}