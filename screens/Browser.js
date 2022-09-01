import React, { Component } from 'react';
import {View, ActivityIndicator,Text} from 'react-native'
import styles from '../styles/Styles.js'
import { StatusBar } from 'expo-status-bar';
import { Ionicons, Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';

class Browser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading : true,
        };
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({loading : false})
        }, 6000);
    }

    render() {
        const {loading} = this.state
        const {url} = this.props.route.params
        const type = (url.indexOf("http://") == -1 || url.indexOf("https://") == -1 || url.indexOf("www.") == -1) ? "text" : "url"
        
        const _handlePressButtonAsync = async () => {
            let result = await WebBrowser.openBrowserAsync(url);
            setResult(result);
        };

        return(
            <View style={styles.full}>
                <StatusBar style='light'/>
                <View>
                    {
                    (type == "text") ?
                		<View>
                 			<View>
                                <Ionicons name="ios-chevron-back-outline" size={30} color="black" onPress={() => this.props.navigation.navigate('Home')}  />
                            </View>
		                </View>	
		            :  
                       <View  style={styles.row}>
                            <View>
                                <Ionicons name="ios-chevron-back-outline" size={30} color="black" onPress={() => this.props.navigation.navigate('Home')}  />
                            </View>
                            
                            <View>
                                <TextInput
                                style={styles.input}
                                label={url}
                                right={<TextInput.Icon name="link" />}
                                editable={false}
                                />
                            </View>

                            <View>
                                <Feather name="arrow-up-right" size={30} color="black" onPress={_handlePressButtonAsync}/>
                            </View>
                        </View>
                    }
                </View>
    
                {
                loading == true ?
                    <View style={{justifyContent : 'center', paddingTop : 100}}>
                        <ActivityIndicator color={"cornflowerblue"} size={50}></ActivityIndicator>
                    </View>
                :
                    <View>
                        {
                        (type == "text") ?
                            <View style={{justifyContent : 'center', paddingTop : 100}}>
                                <Text style={{fontSize:24, textAlign: 'center'}}>{url}</Text>
                            </View>
                        :
                            <WebView  source={{ uri: url }}/>
                        }
                    </View>
                }
            </View>
        )
    }
}

export default Browser