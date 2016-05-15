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

const AddTask = React.createClass({

   getDefaultProps() {
     return {
         value:0
     }        
   },
    
   getInitialState() {
       return {
           task:'',
           value: this.props.value
       }
   },
   
   alertStuff() {
     alert('hi', this.state.text);         
   },
    
   render() {
       return (
         <View style={styles.container}>
           <Text style={styles.textCenter}> Add a task </Text>
           <TextInput
             style={{height:40, borderColor:'gray', borderWidth:1}}
             onChangeText={(text) => this.setState({task:text})}
             onSubmitEditing={(text) => this.setState({task:text})} />
            
            <Text style={styles.textCenter}> Set Priority </Text>
            <Slider
              minimumValue={0}
              maximumValue={10}
              step={1}
              {...this.props}
              onValueChange={ (value) => this.setState({value:value})} />
              <Text> {this.state.value} </Text>
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