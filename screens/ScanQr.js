import React, {useState, useEffect } from 'react';
import {View,Text, ActivityIndicator, Alert,StyleSheet} from 'react-native'
import styles from '../styles/Styles.js'
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ScanCode({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    AsyncStorage.getItem('scanned-codes')
    .then(value => {
      if (value == null) {
        AsyncStorage.setItem("scanned-codes", JSON.stringify([{"url" : data, "date" : new Date()}]))
      }
      else {
        var d = JSON.parse(value)
        d.push({"url" : data, "date" : new Date()})
        AsyncStorage.setItem("scanned-codes", JSON.stringify(d))
      }
      
      setTimeout(() => {
        setScanned(false);
        navigation.navigate('Browser', {url :data})
        }, 5000);
      })
    .catch(error => {
      Alert.alert("Oops!",error)
    })
  }

  if (hasPermission === null) {
    //Requesting camera permission
  }
  
  if (hasPermission === false) {
    navigation.goBack()
  }

  return (
    <View style={styles.full}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        type={BarCodeScanner.Constants.Type.back }/>

      <View style={styles.overlay}>
        <View style={[styles.round, {borderColor:(scanned)?"green":"white"}]}></View>
      </View>

      {
      (scanned == false) ? null:
        <View style={styles.modal}>
          <Text style={{marginBottom:20}}>Scanning Code...</Text>
          <ActivityIndicator color={"cornflowerblue"} size={35}></ActivityIndicator>
        </View>
      }
      
      <View style={styles.message}>
        <Text style={{fontSize:18, textAlign:"center",width:"80%"}}>Scan any QR code by placing it right in the box region</Text>
      </View>
    </View>
  );
}