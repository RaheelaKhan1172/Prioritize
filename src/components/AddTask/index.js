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

const WindowCheck = require('../WindowChecks');

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
           fadeAnim: new Animated.Value(0),
           showX:false,
       }
   },
   
   alertSuccess() {
       this.setState({
           recentlyAdded: "Task '" + this.state.task + "' in queue and it has " + this.state.intPriority,
           showX:true
       });
       
       Animated.timing(
        this.state.fadeAnim,
        {toValue:1}
       ).start();
       
     /* var _this = this;
       
      setTimeout(function() {
          Animated.timing(
          _this.state.fadeAnim,
          {toValue:0}).start();
      },5000);   */
       
       console.log('hi in alert',this.state.recentlyAdded);
   },
    
   clearText() {
     this._textInput.setNativeProps({text:''});       
   },
       
   getPriority() {
       if (+this.state.priority < 5) {
           this.state.intPriority = 'low priority.';
       }  else if (+this.state.priority < 7) {
           this.state.intPriority = 'medium priority.';
       } else {
           this.state.intPriority = 'high priority.';
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

   remove() {
     Animated.timing(this.state.fadeAnim,{
         toValue:0
     }).start();  
   },
    
   render() {
       return(
             <View style={styles.container}>
                <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this.remove()}>
                    <Animated.Text
                     style={{opacity:this.state.fadeAnim,color:'#B6B6B6',marginBottom:40,marginTop:45}}>
                        {this.state.recentlyAdded} 
                     </Animated.Text>
                </TouchableHighlight>
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
                    style={styles.button}
                    underlayColor={'transparent'}
                    onPress={() =>  this.pushTask()}> 
                  <Image
                    source={require('./../../../images/plus.png')}
                    style={{width:40 ,height:40,marginLeft:WindowCheck.getImageProp(),padding:0,marginTop:10}} />
                </TouchableHighlight>
             </View>    
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop:80
    },
    textCenter: {
        marginLeft:10,

        color:'#727272',
        marginBottom:10,
        fontSize:20
    },
    form: {
        width:WindowCheck.getFormWidth(),
        height:40,
        borderRadius:20,
        borderColor: '#03A9F4',
        borderWidth:1,
        marginLeft:WindowCheck.marginNeeded()
    },
    slider: {
        width:WindowCheck.getFormWidth(),
        marginLeft:WindowCheck.marginNeeded()
    },
    button: {
        padding:0,
    }

});

module.exports = AddTask;