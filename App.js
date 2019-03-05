/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import WaveForm from 'react-native-audiowaveform';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
var audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';
type Props = {};
export default class App extends Component<Props> {
	
	constructor(props) {
    	super(props);
    	this.state = {
      		isPlaying: false,
			currentMetering:0
	   	};
	}
	  
	componentDidMount(){
		console.log(AudioRecorder);
		console.log(AudioUtils.DocumentDirectoryPath);
		console.log(audioPath);
		console.log(WaveForm);
		
		AudioRecorder.prepareRecordingAtPath(audioPath, {
		  SampleRate: 22050,
		  Channels: 1,
		  AudioQuality: "High",
		  AudioEncoding: "aac",
		  MeteringEnabled: true,
		});
		
		AudioRecorder.onProgress = (data) => {
			var x = ((-160)-data.currentMetering);
			x *= -1;
			this.setState({currentMetering: x });
			console.log(data.currentMetering, data.currentPeakMetering)
		};
	}
	
	handleOnPress(){
		if(this.state.isPlaying == true){
			console.log('pausing');
			AudioRecorder.pauseRecording();
			AudioRecorder.stopRecording();
		}
		else {
			console.log('play');
			AudioRecorder.startRecording();
		}
		
		this.setState({ isPlaying: !this.state.isPlaying })
	}
	
  render() {
	  const {isPlaying} = this.state;
	  const angle = this.state.currentMetering - 90;
    return (
      <View style={styles.container}>
        
		<View style={{height:250, backgroundColor:'pink', width:300, marginBottom:50,}}>
			<Image  source={require('./meter.png')} style={{width: 300, height:250, position:'absolute', left:0,right:0,bottom:0,top:0}}/>
			<Image  source={require('./pin.png')} style={{
					position:'absolute',
					left:'50%',
					bottom:0,
					transform:[
						{rotate: (angle)+"deg" },
						{translateX: 0},
						{translateY:0}
					]
				}}
				/>
		</View>
		
        <TouchableOpacity onPress={()=>{this.handleOnPress()}}>
			<View style={{backgroundColor:'#fff', padding:10}}>
				<Text>{isPlaying? "Pause": "Play"}</Text>
			</View>
		</TouchableOpacity>
		<Text style={{color:"#fff"}}><Text>Current Meter:</Text>{this.state.currentMetering}<Text> dB</Text></Text>
		<View style={{ height:100, width:200, borderTopWidth:1, color:'#fff',marginTop:40,paddingTop:10}}>
			<Text style={{color:'#fff', textAlign:'center'}}>Realtime Wave form</Text>
			{/*<WaveForm
			style={{flex:1}}
			autoplay={true}
			play={isPlaying?true:false}
				stop={isPlaying? false:true}
				waveFormStyle={{waveColor:'red', scrubColor:'white'}}
				source={{uri:"file:///"+audioPath}}  />*/}
		</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#403E3E',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
	color: '#fff'
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
});
