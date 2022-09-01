import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Entypo,Ionicons } from '@expo/vector-icons';
import IntroScreen from './screens/IntroScreen';
import MainScreen from './screens/Main';
import Browser from './screens/Browser'
import CreateQR from './screens/Createqr'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScanCode from './screens/ScanQr'

function IntroductionScreen({navigation}) {
  AsyncStorage.getItem('intro')
  .then(value => {
      if (value !== null) {
        navigation.navigate('Home')
      }
  })
  .catch(error => {})

  return(
    <IntroScreen navigation={navigation}/>
  )
}

function HomeScreen({ navigation }) {
  return (
    <MainScreen navigation ={navigation}/>
  );
}

function BrowserScreen({route, navigation}) {
  return(
   <Browser navigation={navigation} route = {route}/>
  )
}



function CreateQrScreen({ navigation }) {
  return (
    <CreateQR navigation={navigation}/>
  );
}

function ScanQrScreen({ navigation }) {
  return (
    <ScanCode navigation={navigation}/>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro" >
        <Stack.Screen name="Intro" component={IntroductionScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen} 
        options={({ navigation }) => ({
          headerTitle: "CodeScanner",
          headerBackVisible : false,
          headerRight: () => (
            <View style={{flexDirection:'row',}}>
              <Entypo name="plus" size={24} color="black" style={{paddingRight:20}} onPress={() => navigation.navigate('CreateQr')}/>
              <Ionicons name="scan-sharp" size={24} color="black" onPress={() => navigation.navigate('ScanQr')}/>
            </View>
          ),
        })}
        />
        <Stack.Screen name="CreateQr" component={CreateQrScreen} />
        <Stack.Screen name="ScanQr" component={ScanQrScreen}/>
        <Stack.Screen name="Browser" component={BrowserScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;