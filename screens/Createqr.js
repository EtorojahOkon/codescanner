import React, { Component } from 'react';
import {View,Text,TextInput,KeyboardAvoidingView,ToastAndroid, TouchableOpacity,Keyboard,ActivityIndicator, Platform,Image,Alert} from 'react-native'
import styles from '../styles/Styles.js'
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { StatusBar } from 'expo-status-bar';

class CreateQR extends Component {
    constructor(props) {
        super(props)
        this.captureRef = React.createRef();
        this.state = {
            title : '',
            created : false,
            info : '',
            instruction : '',
            loading : false,
            shareloader : false,
            selectedPrinter:null
        };
    }

    setTitle = (text) => {
        this.setState({title: text})
    }

    setInstruction = (text) => {
        this.setState({instruction: text})
    }

    setInfo = (text) => {
        this.setState({info: text})
    }

    createQr = () => {
        if (this.state.title == '' || this.state.info == '' || this.state.instruction == '') {
            Alert.alert("Error","Please fill in all fields")
        } 
        else {
            this.setState({loading: true})
            Keyboard.dismiss
            setTimeout(() => {
                this.setState({created: true})
            }, 300);
        }
    }        

    render() {
        const {title,info,instruction,created,loading,shareloader} = this.state
        const html = `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" /></head><body style="text-align: center;"><h4 style="font-size: 60px; font-family: Helvetica Neue; font-weight: bold;">${title}</h4><img src="https://api.qrserver.com/v1/create-qr-code/?data='${info}&amp;size=100x100" style="width: 90vw;" /></body><div style="padding-top : 50px"><span>Generated with Codescanner</div></html>`;

        const preparePrint = () => {
            this.setState({shareloader  :true})
            printToFile()
        }

        const printToFile = async () => {
            const { uri } = await Print.printToFileAsync({html});

            ToastAndroid.showWithGravityAndOffset(
                'Generating Pdf!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
            this.setState({shareloader  : false})
        }

        return(
            <View style={styles.bg}>
                <StatusBar style='light'/>
                {
                (created == false) ?

                    <>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'position'} style={{padding : 15}}>
                            <View style={styles.padded}>
                                <TextInput
                                placeholder="Title"
                                style={styles.inp}
                                value = {title}
                                color = "lightgray"
                                underlineColorAndroid='lightgray'
                                onChangeText={this.setTitle}
                                />
                            </View>
                            <View style={styles.padded}>
                                <TextInput
                                placeholder="Description"
                                style={styles.inp}
                                value = {instruction}
                                color = "cornflowerblue"
                                underlineColorAndroid='lightgray'
                                onChangeText={this.setInstruction}
                                multiline = {true}
                                />
                            </View>
                            <View style={styles.padded}>
                                <TextInput
                                placeholder="QR Code Info"
                                style={styles.inp}
                                value = {info}
                                color = "cornflowerblue"
                                underlineColorAndroid='lightgray'
                                onChangeText={this.setInfo}
                                multiline = {true}
                                />
                            </View>

                            <View style={[styles.padded]}>
                                <TouchableOpacity style={styles.button}  onPress={() => this.createQr()}>
                                    {(loading == false) ? <Text style={styles.btntxt}>Create QR</Text> :<ActivityIndicator size="large" color="white" />}

                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </>
                :
                    <View ref={this.captureRef}  style={styles.qrarea}>
                        <Text style={styles.desc}>{instruction}</Text> 
                        
                        <View style={styles.qrcont}>
                            <Text style={styles.qrtitle}>{title}</Text>
                            <Image style={styles.introimg} source={{uri : 'https://api.qrserver.com/v1/create-qr-code/?data=' + {info}+ '&amp;size=100x100'}} />   
                        </View>
                        
                        <View style={styles.padded}>
                            <TouchableOpacity style={styles.button}  onPress={preparePrint}>
                                {
                                    (shareloader == true) ? 
                                        <ActivityIndicator size='small' color='white'/>
                                    :
                                        <Text style={styles.btntxt}>Share QR Code</Text>
                                }
                            </TouchableOpacity>
                        </View>

                    </View>
                }
            </View>
        )
    }
}
export default CreateQR;