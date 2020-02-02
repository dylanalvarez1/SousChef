import React from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import apiKey from  '../credentials';

export default class CameraScreen extends React.Component {
   

    constructor() {
      super();
      this.state = {
        switchValue: false ,
        hasCameraPermission: null, //Permission value
        type: Camera.Constants.Type.back,
        accessCameraLabel: 'Add Photo',
        pictures: [],
        currentPhoto: null,
        links: []
      };

    }
    
    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });
    };

    snap = async() => {
        if(this.camera) {
          const { base64 } = await this.camera.takePictureAsync({
            base64: true,
            quality: 0.1
          });
         
          this.setState({currentPhoto: base64})
          
          this.setState({pictures: [base64, ...this.state.pictures]})

        }
    }

    restoreCamera = () => {
      this.setState({currentPhoto: null})
    }

    postData = async (url = '', data = {}) => {

      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Client-ID ${apiKey}`
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: data // body data type must match "Content-Type" header
      });
      return await response.json(); // parses JSON response into native JavaScript objects
    }

    updateImages = async () => {
      this.state.pictures.forEach(photo => {
        this.postData('https://api.imgur.com/3/upload', photo).then((data) => {
          this.setState({links: [data.data.link, ...this.state.links]})
        });
      });
    }

    clearImages = () => {
      this.setState({photos: []});
    }

    render() {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => {
            this.camera = ref;
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                let type = (this.state.type === Camera.Constants.Type.back)? Camera.Constants.Type.front : Camera.Constants.Type.back;
                
                this.setState({type: type})
                
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, backgroundColor: 'white' }}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>

            {(this.state.currentPhoto != null)? <Image style={{flex: 1}} source={{uri: `data:image/jpg;base64,'${this.state.currentPhoto}`}} resizeMode="contain"/> : <View></View>}
        
        <View style={styles.tabBarInfoContainer}>
          <TouchableOpacity onPress={()=>this.snap()}>
                  <Text>{this.state.accessCameraLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.updateImages()}>
                  <Text>Find Recipes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            console.log(this.state.links)}
          }>
                  <Text>Print</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});