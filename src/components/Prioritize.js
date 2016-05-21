//@flow

'use strict';

import React, { Component } from 'react';
import Reflux from 'reflux';
import { HeapActions } from './../actions';
import HeapStore from './../stores/HeapStore';
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


const Prioritize = React.createClass({
    
    mixins: [Reflux.connect(HeapStore,'heapStore')],
    
    getInitialState() {
        return {
            initRoute: null,
            loaded:false,
        };
    },
    
    componentWillMount() {
        this.renderInitialRoute();
        HeapStore.emit();    
    },
    
     renderInitialRoute() {
      var _this = this;
      HeapActions.viewCurrentTask(function(result) {
          console.log(result,'res', result);
          if (result) {
            _this.setState({initRoute:'view', loaded:true});          
          } else {
              _this.setState({initRoute:'tasks', loaded:true});
          }
      });
    },

    main() {
        this.refs.navigator.push({
            component: 'Task',
            name: 'tasks'
        });
    },
    
    addTask() {
      this.refs.navigator.push({
          component:'AddTask',
          name: 'add'
      });
    },
    
    viewNext() {
      var _this = this;
      HeapActions.viewNextTasks(function(result) {
          console.log(result,'hi');
      });
    },
    
    view() {
        this.refs.navigator.push({
            component: 'ViewTask',
            name:'view'
        });
    },
    
    renderScene(route,navigator) {
        console.log('route', route, route.name);
        switch(route.name) {
            case 'tasks':
                return <Task 
                        addTask={this.addTask}
                        view={this.view} 
                        {...route.data}/>;
            case 'view':
                return <ViewTask/>;
            case 'add':
                return <AddTask/>
        }    
    },
        
    loading() {
        return (
            <View>
            <Text>
                Just wait...
            </Text>
            </View>
        );
    },
            
    render() {
        if (!this.state.loaded) {
            return this.loading();
        }
        return (
            <View style={styles.container}>
                <Navigator
                     ref='navigator'
                     initialRoute={{name:this.state.initRoute}}
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
                <TouchableHighlight
                    onPress={ () => this.main()}>
                    <Text> Home </Text>
                </TouchableHighlight>
                
            </View>
                
        );
    }
});

var styles = StyleSheet.create({
    container: {
     flex:1,
    }
});

export default Prioritize;