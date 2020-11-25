/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,

  TextInput,
  Button,
  Alert,
  Platform,
  
  NativeModules,
  NativeEventEmitter,
  DeviceEventEmitter,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import CameraViewer from './CameraViewer';

const { Console: RNConsole } = NativeModules;
const emitter = new NativeEventEmitter(RNConsole);

// const App: () => React$Node = () => {
  // const {textValue, setTextValue} = useState('');

  class App extends Component {

  

  state = {
    text: '',
    eventCount: 0,
  }

  render() {

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            
            <View style={[styles.body, {marginHorizontal:20}]}>

              <View style={{marginVertical:20}}>
                <Text>text:</Text>
                <TextInput
                  style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    paddingHorizontal: 8,
                    minWidth: 100,
                  }}
                  onChangeText={(text) => this.setState({text})}
                  value={this.state.text}
                />
              </View>

              <View style={{width:300, marginVertical:20}}>
                <Button title='writeText() - callback' 
                  onPress={async () => {
                    RNConsole.writeText(this.state.text, (err, result) => {
                      Alert.alert(
                        'callback',
                        `err: ${err}\nresult: ${result}`,
                      );
                  });
                }} />
              </View>

              <View style={{width:300, marginVertical:20}}>
                <Button title='writeText() - promise' onPress={async () => {
                  try {
                    const result = await RNConsole.writeTextWithPromise(this.state.text);
                    Alert.alert(
                      'promise resolve',
                      `result: ${result}`,
                    );
                  } catch (err) {
                    Alert.alert(
                      'promise reject',
                      `err: ${err}`,
                    );
                  }
                }} />
              </View>

              <View style={{width:300, marginVertical:20, flexDirection:'row'}}>
                <Button title='timer Event' style={{flex: 1, }}
                  onPress={() => {

                    this.setState({eventCount: 0});

                    RNConsole.runTimer();
                    if (Platform.OS === 'android') {
                      const subscription = DeviceEventEmitter.addListener(
                        'my_event', 
                        (evt) => {
                          console.log('event', evt);
                          if( this.state.eventCount+1 === 10 ) {
                            DeviceEventEmitter.removeAllListeners();
                          }
                          this.setState({eventCount: this.state.eventCount+1});  
                        }
                      );
                    } else {
                      const subscription = emitter.addListener(
                        'my_event',
                        (evt) => {
                          // console.log('event', evt)
                          if( this.state.eventCount+1 === 10 ) {
                            emitter.removeAllListeners();
                          }
                          this.setState({eventCount: this.state.eventCount+1});  
                        }
                      );
                    }
                  }} 
                />
                <Text style={{marginLeft: 20}}>eventCount: {this.state.eventCount}</Text>
              </View>


              <CameraViewer
                onMyClick={(evt) => {
                  console.log('onMyClick', evt.nativeEvent);
                }}
                style={{
                  width: 300,
                  height: 150,
                  backgroundColor: 'gray',
                }}
              />

            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
