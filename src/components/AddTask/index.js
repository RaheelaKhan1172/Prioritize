'use strict';

import React from 'react';

import {
    StyleSheet,
    View,
    TextInput,
    Slider,
    Text,
    Image,
    TouchableHighlight
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
           this.state.intPriority = 'not urgent';
       }  else if (+this.state.priority < 7) {
           this.state.intPriority = 'a bit urgent';
       } else {
           this.state.intPriority = 'really, really urgent';
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
                <Text> {this.state.recentlyAdded} </Text>
             
                <Text style={styles.textCenter}> Add a task </Text>
                <TextInput
                     ref={component => this._textInput = component}
                     style={{height:40, borderColor:'gray', borderWidth:1}}
                     value={this.state.text}
                     onChangeText={ (text) => this.setState({task:text})} />
                <Text style={styles.textCenter}> Set Priority </Text>
                <Slider
                  minimumValue={0}
                  maximumValue={10}
                  step={1}
                  {...this.props}
                  onValueChange={ (value) => this.setState({priority:value})} 
                  onSlidingComplete={(value) => this.setState({priority:value})} /> 
                   <TouchableHighlight
                    onPress={() =>  this.pushTask()}> 
                  <Image
                    source={require('./../../../images/plus.png')}
                    style={{width:40 ,height:40,marginLeft:300}} />
                </TouchableHighlight>
             </View>    
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        backgroundColor: '#F5FCFF'
    },
    textCenter: {
        marginLeft:150
    }
});

module.exports = AddTask;