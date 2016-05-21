import React from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    TextInput,
    Text,
    Slider,
    View
} from 'react-native';


const FormObj = React.createClass({
    
    getDefaultProps() {
      return {
          value: 0
      }  
    },
    
    getInitialState() {
        return {
            task: '',
            priority: this.props.value
        }    
    },
    
    render() {
        return (
            <View>
                <TouchableHighlight
                    onPress={() =>  this.pushTask()}> 
                    <Text> Add </Text> 
                </TouchableHighlight>
                <Text style={styles.textCenter}> Add a task{this.state.tasks} </Text>
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

module.exports = FormObj;

var styles = StyleSheet.create({
   textCenter: {
       marginLeft:150
   } 
});