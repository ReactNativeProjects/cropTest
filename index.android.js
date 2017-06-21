/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//https://www.npmjs.com/package/react-native-image-crop-picker
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Location from './Location/Location'
export default class cropTest extends Component {
  constructor(props){
        super(props);//should always be first statement in constructor when using react native
        this.state={
          croppedImage:this.props.croppedImage,
          uncroppedImage:this.props.uncroppedImage
        }
    }
  static defaultProps={
    croppedImage:'',
    uncroppedImage:''
  }
  openCam(){
    var imageSrc=''
    ImagePicker.openCamera({width: 300,height: 400}).
    then(image => {
                  console.log(image.path);
                  imageSrc=image.path
                  uncroppedImage={uri: image.path}
                  ImagePicker.openCropper({
                    path: imageSrc,
                    width: 300,
                    height: 400,
                    captureTarget:'',
                  }).then(image => {
                                    console.log(image.path);
                                    this.setState({croppedImage:{uri: image.path},
                                                    uncroppedImage:uncroppedImage
                                                  })
                  })
                  .catch((err)=>console.log("ERROR IN IMAGE CROPPER: "+err));
    })
    .catch((err)=>console.log("ERROR IN IMAGE OPEN: "+err));
  } 
  renderIf(){
    if(this.state.croppedImage=='')
    {
      return <Text>Default Text</Text>
    }
    else
    {
        return  <View>
                    
                    <Text>Updated Text</Text>
                    <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={this.state.uncroppedImage}/>
                    <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={this.state.croppedImage}/>
                </View>
    }
  }
  render() {
    return (
      <View>
        <Button title="open cam" onPress={()=>this.openCam()}/>
          <Location/>
          {this.renderIf()}
      </View>
    );
  }
}
AppRegistry.registerComponent('cropTest', () => cropTest);
