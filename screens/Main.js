import React, { Component } from 'react';
import {View, ActivityIndicator,ScrollView,Text,ToastAndroid, Alert,Dimensions} from 'react-native'
import {AntDesign,Ionicons } from '@expo/vector-icons';
import { List } from 'react-native-paper';
import styles from '../styles/Styles.js'
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const win = Dimensions.get("screen")

class MainScreen extends Component {
    constructor(props) {
       super(props)
        this.state = {
            loading : false,
            scannedcodes : []
        };
    }

    getCodes = () => {
        AsyncStorage.getItem('scanned-codes')
        .then(value => {
             this.setState({scannedcodes :(value == null) ? [] : JSON.parse(value)})
        })
        .catch(error => {
            Alert.alert("Error fetching Recently Scanned Codes", "Oops!")
        })
    }

    clearHistory = (index) => {
        if (index == "all") {
            AsyncStorage.removeItem("scanned-codes")
            this.setState({scannedcodes:[]})
        } 
        else {
            index = parseInt(index)
            this.state.scannedcodes.splice(index,1)
            ToastAndroid.showWithGravityAndOffset(
                'Item removed',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                ToastAndroid.CENTER,
                25,
                50
              );

            AsyncStorage.setItem("scanned-codes", JSON.stringify(this.state.scannedcodes))
            this.getCodes()
        }
        
    }

    copyUrl = (url) => {
        Clipboard.setString(url);
        ToastAndroid.showWithGravityAndOffset(
            'URL copied',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            ToastAndroid.CENTER,
            25,
            50
          );
    }

    visitUrl = (url) => {
       this.props.navigation.navigate('Browser', {url :url})
    }  

    componentDidMount = () => {
        AsyncStorage.getItem('scanned-codes')
        .then(value => {
             this.setState({scannedcodes :(value == null) ? [] : JSON.parse(value)})
        })
        .catch(error => {
            Alert.alert("Error fetching Recently Scanned Codes", "Oops!")
        })

        //other
        AsyncStorage.getItem('intro')
        .then(value => {
            if (value == null) {
                Alert.alert("Long Press a scanned item to copy text or url", "Welcome to CodeScanner!")
              AsyncStorage.setItem("intro", "ok")
            }
        })
        .catch(error => { /*do nothing*/})
        this.getCodes()
    }

    render() {
        const {scannedcodes} = this.state
        
        return(
           <View style={styles.bg}>
               {
                (this.state.loading == true) ?
                    <View style={styles.container}>
                         <ActivityIndicator size="large" color="cornflowerblue" />
                         <Text>{scannedcodes}</Text>
                    </View>
                :
                   <ScrollView showsVerticalScrollIndicator={false} >
                       {
                        (scannedcodes.length == 0)
                        ?
                           <View style={{flex: 1, justifyContent: 'center', alignContent : 'center', alignItems : 'center', flexDirection :'column', height: win.height }}>
                               <Ionicons name="ios-qr-code-outline" size={40} color="black" />
                               <Text>No Recently Scanned QRs</Text>
                            </View>
                        :
                           <View>
                               <Text style={{textAlign: 'right', padding : 10, fontSize :15,color : 'cornflowerblue'}} onPress={() => {this.clearHistory('all')}}>Clear</Text>
                        
                                {
                                    scannedcodes.map((data, i) => {
                                        return(
                                            <View key ={i}>
                                                <List.Item style={styles.list}
                                                title={data.url}
                                                description={data.date.split("-")[2].substring(0,2) + "/" + data.date.split("-")[1] + "/" + data.date.split("-")[0] }
                                                right={props => <AntDesign name="close" size={24} color="black" onPress = {() => this.clearHistory(i)}/>}
                                                left={props => <List.Icon {...props} icon="link" />}
                                                onPress={() => {this.visitUrl(data.url)}} 
                                                onLongPress= {() => {this.copyUrl(data.url)}} 
                                                />
                                                <View style={styles.divider}></View>
                                            </View>
                                        )
                                    })
                                }                        
                            </View>
                       }
                        
                   </ScrollView>
                }
            </View>
        )
    }
}
export default MainScreen