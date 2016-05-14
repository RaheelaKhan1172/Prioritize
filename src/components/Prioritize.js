//@flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity
} from 'react-native';

import Task from './Tasks';
import ViewTask from './ViewTasks';

export default class Prioritize extends Component {
    
    
    handleTouch() {
        this.navigator.push({
            name: 'view'
        });    
    }
    
    renderScene(route,navigator) {
        console.info('hi', route,route.name);
        switch(route.name) {
            case 'tasks':
                console.info('hm');
                return <Task/>;
            case 'view':
                return <ViewTask/>;
        }    
    }
    
    render() {
        //navigator will not work if put inside container 
        return (
                <Navigator
                 initialRoute={{name: 'tasks'}}
                 renderScene={this.renderScene} />
       
        );
    }
};

var styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})