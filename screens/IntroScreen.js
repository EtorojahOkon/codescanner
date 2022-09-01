import React, { Component } from 'react';
import {View, Text,Image,TouchableOpacity} from 'react-native'
import PagerView from 'react-native-pager-view';
import styles from '../styles/Styles.js'
import { StatusBar } from 'expo-status-bar';
import { Feather,Entypo } from '@expo/vector-icons';

class IntroScreen extends Component {
    constructor(props) {
       super(props)
       this.state = {};
    }

    render() {
        return(
            <View style={{ flex: 1 }}>
                <StatusBar style='light'/>
                <PagerView style={styles.viewPager} initialPage={0}>
                    <View style={styles.page} key="1">
                        <View style={styles.introtop}>
                            <Text style={styles.skip} onPress={() => this.props.navigation.push('Home')}>Skip<Feather name="arrow-right" size={20} color="white" /></Text>
                            <View style={styles.imgview}>
                                <Image style={styles.introimg} source={require('../assets/images/create.png')} />
                            </View>
                        </View>
                        <View style={styles.introdetail}>
                            <Text style={styles.introtext}>Create QR Codes</Text>
                            <Text style={styles.introsub}>Create and share your own generated QR Codes</Text>
                            <Text style={styles.dot}>
                                <Entypo name="dot-single" size={20} color="cornflowerblue"  />
                                <Entypo name="dot-single" size={20}  color="darkgray"  />
                            </Text>
                            <TouchableOpacity style={styles.button}  onPress={() => this.props.navigation.push('CreateQr')}>
                                <Text style={styles.btntxt}>Get Started</Text>
                            </TouchableOpacity>
                        </View>
                </View>

                <View style={styles.page} key="2">
                    <View style={styles.introtop}>
                       <View style={styles.imgview}>
                            <Image style={styles.introimg} source={require('../assets/images/scan.jpg')} />
                        </View>
                    </View>
                    <View style={styles.introdetail}>
                        <Text style={styles.introtext}>Scan QR Codes</Text>
                        <Text style={styles.introsub}>Scan QR Codes and extract needed info</Text>
                        <Text style={styles.dot}>
                           <Entypo name="dot-single" size={20} color="darkgray"  />
                            <Entypo name="dot-single" size={20}  color="cornflowerblue"  />
                        </Text>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.push('ScanQr')}>
                            <Text style={styles.btntxt}>Get Started</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </PagerView>
        </View>
       )
    }
 }

 export default IntroScreen;