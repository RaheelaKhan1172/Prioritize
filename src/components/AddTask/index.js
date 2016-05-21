'use strict';

import React from 'react';

import {
    StyleSheet,
    View,
    TextInput,
    Slider,
    Text,
    ListView,
    TouchableHighlight
} from 'react-native';

import { HeapActions } from './../../actions';
import PriorityQueue from './../../data/Pq';
import FormObj  from './Form';
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
       }
   },
   
   alertSuccess() {
       console.log('hmmm');
       this.setState({
           recentlyAdded: "Added '" + this.state.task + "' and it is  " + this.state.intPriority + ' to do.'
       });
       
       console.log('hi in alert',this.state.recentlyAdded);
   },
   clearText() {
     this._textInput.setNativeProps({text:''});       
   },
       
   getPriority() {
       if (+this.state.priority < 5) {
           this.state.intPriority = 'not that urgent';
       }  else if (+this.state.priority < 7) {
           this.state.intPriority = 'a bit urgent';
       } else {
           this.state.intPriority = 'really, really urgent';
       }
   },
    
   pushTask() {
       this.getPriority();
       this.alertSuccess();
       this.clearText();
       HeapActions.push(this.state.task,this.state.priority);
   },
    
   render() {
       return(
             <View style={styles.container}>
                <Text> {this.state.recentlyAdded} </Text>
                <TouchableHighlight
                    onPress={() =>  this.pushTask()}> 
                    <Text> Add </Text> 
                </TouchableHighlight>
                <Text style={styles.textCenter}> Add a task {this.state.tasks} </Text>
                <TextInput
                     ref={component => this._textInput = component}
                     style={{height:40, borderColor:'gray', borderWidth:1}}
                     value={this.state.text}
                     onChangeText={ (text) => this.setState({task:text})} />
                <Text> {this.state.task} </Text>
                <Text style={styles.textCenter}> Set Priority </Text>
                <Slider
                  ref={component => this._slider = component}
                  minimumValue={0}
                  maximumValue={10}
                  step={1}
                  {...this.props}
                  onValueChange={ (value) => this.setState({priority:value})} 
                  onSlidingComplete={(value) => this.setState({priority:value})} /> 
                  <Text> {this.state.priority} </Text>  
             </View>    
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
    },
    textCenter: {
        marginLeft:150
    }
});

module.exports = AddTask;