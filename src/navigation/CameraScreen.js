import React from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'; 

export default class CameraScreen extends React.Component {
   

    constructor() {
      super();
      this.state = {
        switchValue: false ,
        hasCameraPermission: null, //Permission value
        type: Camera.Constants.Type.back,
        accessCameraLabel: 'Take Picture',
        pictures: [],
        currentPhoto: null

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
          let photo = await this.camera.takePictureAsync();
          console.log(photo);
          this.setState({currentPhoto: photo})
          
          this.setState({photos: [photo, ...this.state.photos]})

        }
    }

    restoreCamera = () => {
      this.setState({currentPhoto: null})
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

            {(this.state.currentPhoto != null)? <Image style={{flex: 1}} source={{uri: this.state.currentPhoto.uri}} resizeMode="contain"/> : <View></View>}
        
        <View style={styles.tabBarInfoContainer}>
        <TouchableOpacity onPress={()=>this.snap()}>
                <Text>{this.state.accessCameraLabel}</Text>
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