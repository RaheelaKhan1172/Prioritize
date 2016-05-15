import React from 'react';

import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableHighlight
} from 'react-native';

const AddTask = React.createClass({
   getInitialState() {
       return {
           task:''
       }
   },
   
   alertStuff() {
     alert('hi', this.state.text);         
   },
    
   render() {
       return (
         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
           <TextInput
             style={{height:40, borderColor:'gray', borderWidth:1}}
             onChangeText={(text) => this.setState({task:text})}
             onSubmitEditing={(text) => this.setState({task:text})} />

         </View>                         
        
       );
   }
});



module.exports = AddTask;