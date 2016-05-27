'use strict';

import React from 'react';

import {
    StyleSheet,
    View,
    TextInput,
    Slider,
    Text,
    Image,
    TouchableHighlight,
    Animated,
    Easing
} from 'react-native';

import { HeapActions } from './../../actions';
import PriorityQueue from './../../data/Pq';
import Heap from './../../data/Heap';
import ViewTask from '../ViewTasks';


const AddTask = React.createClass({
    
   propTypes: {
       task: React.PropTypes.instanceOf(Heap),
   },

   getDefaultProps() {
     return {
         value:0,
     }        
   },
    
   getInitialState() {
       
       return {
           task:'',
           priority: this.props.value,
           intPriority: '',
           recentlyAdded: '',
           fadeAnim: new Animated.Value(0)
       }
   },
   
   alertSuccess() {
       
       this.setState({
           recentlyAdded: "Added '" + this.state.task + "' and it is  " + this.state.intPriority + ' to do.'
       });
       Animated.timing(
        this.state.fadeAnim,
        {toValue:1,
        duration:3000}
       ).start();
       
       console.log('hi in alert',this.state.recentlyAdded);
   },
    
   clearText() {
     this._textInput.setNativeProps({text:''});       
   },
       
   getPriority() {
       if (+this.state.priority < 5) {
           this.state.intPriority = 'not urgent';
       }  else if (+this.state.priority < 7) {
           this.state.intPriority = 'a bit urgent';
       } else {
           this.state.intPriority = 'really, really urgent';
       }
   },
    
   checkUpdate() {
        if (this.state.recentlyAdded) {
            return true;
        } else {
            return false;
        }
   },
    
   pushTask() {
       if (this.state.task) {
           this.getPriority();
           this.alertSuccess();
           this.clearText();
           HeapActions.push(this.state.task,this.state.priority);
       } 
   },
    
   render() {
       return(
             <View style={styles.container}>
                <Animated.Text
                 style={{opacity:this.state.fadeAnim,color:'#B6B6B6',marginBottom:40,marginTop:45}}>
                    {this.state.recentlyAdded} 
                 </Animated.Text>
             
                <Text style={styles.textCenter}> Add a task </Text>
                <TextInput
                     ref={component => this._textInput = component}
                     style={styles.form}
                     value={this.state.text}
                     onChangeText={ (text) => this.setState({task:text})} />
                <Text style={styles.textCenter}> Set Priority </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={10}
                  maximumTrackTintColor={'#B3E5FC'}
                  minimumTrackTintColor={'#D32F2F'}
                  step={1}
                  {...this.props}
                  onValueChange={ (value) => this.setState({priority:value})} 
                  onSlidingComplete={(value) => this.setState({priority:value})} /> 
                   <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor={'transparent'}
                    onPress={() =>  this.pushTask()}> 
                  <Image
                    source={require('./../../../images/plus.png')}
                    style={{width:40 ,height:40,marginLeft:300,padding:0}} />
                </TouchableHighlight>
             </View>    
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex:1,
    },
    textCenter: {
        marginLeft:10,

        color:'#727272',
        marginBottom:10,
        fontSize:20
    },
    form: {
        width:366,
        height:40,
        borderRadius:20,
        borderColor: '#03A9F4',
        borderWidth:1
    },
    slider: {
        width:366
    }
});

module.exports = AddTask;