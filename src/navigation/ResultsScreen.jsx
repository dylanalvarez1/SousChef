import React, { Component } from 'react';
import {View, TextInput, Text, Button} from 'react-native';
const Clarifai = require('clarifai');

export default class Results extends Component {
    constructor() {
        super();
        this.state = {
            links: [],
            ingredients: []
        }
    }
    componentDidMount() {
        const {navigate} = this.props.navigation;
        console.log(this.props.navigation.state.params.links);
        this.setState({links: this.props.navigation.state.params.links})
    }

    clarifai = (url) => {
        /* Install the client from NPM
        npm install clarifai
        */
      
        // Require the client
        
      
        // initialize with your api key. This will also work in your browser via http://browserify.org/
        const app = new Clarifai.App({
        apiKey: 'ac35080036184744baa87c4030fd7a91'
        });
      
        /*
        // Post a predict model to the API then get a prediction
        app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
              .then(generalModel => {
                return generalModel.predict("@@sampleTrain");
              })
              .then(response => {
                var concepts = response['outputs'][0]['data']['concepts']
              })
        */
        
      
        //Another way to post a predict model to the api and then get a prediction
        app.models.predict("bd367be194cf45149e75f01d59f77ba7", url)
              .then(response => {
                var concepts = response['outputs'][0]['data']['concepts']    
                this.setState({ingredients: [concepts[0].name, ...this.state.ingredients]});
              })
              .catch(error => {
                console.log(err)
              });
      
        // You can also use the SDK by adding this script to your HTML:
        //<script type="text/javascript" src="https://sdk.clarifai.com/js/clarifai-latest.js"></script>
    }

    render() {
      
      return (
        <View>
            <Button 
            title="Press me :)"
            onPress={() =>{
              this.state.links.forEach((link, i) => {
                this.clarifai(link)
            })
                
            }}>
            </Button>
            {
              this.state.ingredients.map((ingredient, index) => (
                <Text key={index}>{ingredient}</Text>
              ))
            }
        </View>
      );
    }
  }