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
         <View>
           <TextInput
             style={{height:40, borderColor:'gray', borderWidth:1}}
             onChangeText={(text) => this.setState({task:text})}
             onSubmitEditing={(text) => this.setState({task:text})} />
            
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



module.exports = AddTask;