/* Install the client from NPM
npm install clarifai
*/

// Require the client
const Clarifai = require('clarifai');

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
let url = 'https://edge.bonnieplants.com/www/uploads/20190122192650/Solanum_MountainMerit_BonniePlants_v2.jpg'

//Another way to post a predict model to the api and then get a prediction
app.models.predict("bd367be194cf45149e75f01d59f77ba7", url)
      .then(response => {
        var concepts = response['outputs'][0]['data']['concepts']
        console.log(concepts[0].name)
      })
      .catch(error => {
        console.log(err)
      });

// You can also use the SDK by adding this script to your HTML:
//<script type="text/javascript" src="https://sdk.clarifai.com/js/clarifai-latest.js"></script>