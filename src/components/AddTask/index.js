'use strict';

import React from 'react';

import {
    StyleSheet,
    View,
    TextInput,
    Slider,
    Text,
    TouchableHighlight
} from 'react-native';

import { HeapActions } from './../../actions';
import PriorityQueue from './../../data/Pq';
import Heap from './../../data/Heap';

const AddTask = React.createClass({
    
   propTypes: {
       task: React.PropTypes.instanceOf(Heap) 
   },

   getDefaultProps() {
     return {
         value:0
     }        
   },
    
   getInitialState() {
       return {
           task:'',
           priority: this.props.value
       }
   },
    
   pushTask() {
     //  alert(this.state.task,this.state.priority);
       HeapActions.push(this.state.task,this.state.priority);
       
   },
    
   render() {
       return (
         <View style={styles.container}>
           <TouchableHighlight
                onPress={() => this.pushTask()}> 
                    <Text> Add </Text> 
                </TouchableHighlight>
           <Text style={styles.textCenter}> Add a task </Text>
           <TextInput
             style={{height:40, borderColor:'gray', borderWidth:1}}
             value={this.state.text}
             onChangeText={(text) => this.setState({task:text})} />
            <Text> {this.state.task} </Text>
            <Text style={styles.textCenter}> Set Priority </Text>
            <Slider
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
        marginTop:170,
        flex:1,
    },
    textCenter: {
        marginLeft:150
    }
});

module.exports = AddTask;