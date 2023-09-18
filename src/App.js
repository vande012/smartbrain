import './App.css';
import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '3331da2aaea84c5b8a7076e698074a4e';
// Specify the correct user_id/app_id pairings
const USER_ID = 'vander12';       
const APP_ID = 'smartbrain';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  } 

  calculateFaceLocation = (data) => {
    const clarifaiFace = data?.outputs?.[0]?.data?.regions?.[0]?.region_info?.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": this.state.input
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json()) // Convert the response to JSON
      .then(data => {
          // Use optional chaining to access nested properties
          const boundingBox = data?.outputs?.[0]?.data?.regions?.[0]?.region_info?.bounding_box;
          if (boundingBox) {
              console.log(boundingBox);
              this.displayFaceBox(this.calculateFaceLocation(data));
          } else {
              console.log("Bounding box data not found.");
          }
      })
      .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState({isSignedIn: false});
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
      this.setState({route: route});
  }


render() {
  const { isSignedIn, imageUrl, route, box } = this.state;
  return (
      <div className="App"> 
        <ParticlesBg type="cobweb" color='#ffffff' bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
        ? <>
            <Logo />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <Rank />
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </>
        : (
          route === 'signin' 
          ? <Signin onRouteChange={this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange}/>
          )         
        }   
      </div>
    );
  }
}

export default App;
