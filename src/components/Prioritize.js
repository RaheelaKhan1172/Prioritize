//@flow


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight
} from 'react-native';

import Task from './Tasks';
import ViewTask from './ViewTasks';
import AddTask from './AddTask';


export default class Prioritize extends Component {
    
    addTask() {
      this.refs.navigator.push({
          component:'AddTask',
          name: 'add'
      });
    }
    
    view() {
        this.refs.navigator.push({
            component: 'ViewTask',
            name:'view'
        });
    }
    
    
    renderScene(route,navigator) {
        console.info('hi', route,route.name);
        switch(route.name) {
            case 'tasks':
                console.info('hm');
                return <Task 
                        addTask={this.addTask}
                        view={this.view} 
                        {...route.data}/>;
            case 'view':
                return <ViewTask/>;
            case 'add':
                return <AddTask/>
        }    
    }
    
    render() {
        //navigator will not work if put inside container 
        return (
            <View style={styles.container}>
                <Navigator
                     ref='navigator'
                     initialRoute={{name: 'tasks'}}
                     renderScene={this.renderScene}>
                </Navigator>
            
                <TouchableHighlight 
                 onPress={() => this.view()}>
                    <Text>View</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => this.addTask()}>
                    <Text> Add Task </Text>
                </TouchableHighlight>
                
            </View>
                
        );
    }
};

var styles = StyleSheet.create({
    container: {
     flex:1,
    }
});