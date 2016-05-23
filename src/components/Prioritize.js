//@flow
//next to do fix navigation
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
            dataAvail:false
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
            _this.setState({initRoute:'view', loaded:true,dataAvail:true});          
          } else {
              _this.setState({initRoute:'tasks', loaded:true,dataAvail:false});
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
    noData() {
        return (
           <View style={styles.container}>
                <Navigator
                     ref='navigator'
                     initialRoute={{name:'tasks'}}
                     renderScene={this.renderScene}>
                </Navigator> 
                    <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor={'transparent'}
                    style={styles.noDataButton}
                    onPress={() => this.addTask()}>
                    <Text> Add Task </Text>
                </TouchableHighlight>
            </View>
         );
    },
        
    dataAvailable() {
        return (
            <View style={styles.container}>
                <Navigator
                     ref='navigator'
                     initialRoute={{name:'view'}}
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
    },
        
    loading() {
        return (
          <View>
               <Text> 
                Loading.. 
                </Text>
                
            </View>
        );
    },
            
    render() {
        if (!this.state.loaded) {
            return this.loading();
        }
        if (this.state.dataAvail) {
            return this.dataAvailable();
        } else {
            return this.noData();
        }
    }
});

var styles = StyleSheet.create({
    container: {
     flex:1,
     backgroundColor:'#D1C4E9'
    },
    noDataButton: {
        marginBottom:340,
        alignItems: 'center',
        justifyContent:'center',
        borderColor:'#9C27B0',
        borderWidth:1,
        borderRadius:10,
        width:70,
        marginLeft:150
    }
});

export default Prioritize;