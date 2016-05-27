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
    Image,
    TouchableHighlight
} from 'react-native';

import Task from './Tasks';
import ViewTask from './ViewTasks';
import AddTask from './AddTask';
import ViewAll from './ViewAll';

const Prioritize = React.createClass({
    
    mixins: [Reflux.connect(HeapStore,'heapStore')],
    
    getInitialState() {
        return {
            initRoute: null,
            loaded:false,
            dataAvail:false,
            show: true,
            dataLength:0,
        };
    },
    
    componentWillMount() {
        this.renderInitialRoute();
        HeapStore.emit();    
    },    
    
    componentDidMount() {
        this.listenTo(HeapStore,
                     this.onChange,
                     this.onChange);
    },
    
     onChange(data) {
         console.log('i changed',data);
        if (data.length) {
            this.setState({dataAvail:true,dataLength:data.length});
        } else {
            this.setState({dataAvail:false,dataLength:0,initRoute:'tasks',show:true});
        }
    }, 
    
    shouldComponentUpdate(nextProps,nextState) {
        console.log('the stuff',nextProps,nextState);
        return true;
    },
    
    renderInitialRoute() {
      var _this = this;
      HeapActions.viewCurrentTask(function(result) {
          console.log(result,'res', result);
          if (result) {
              console.log('ho hey')
            _this.setState({initRoute:'view', loaded:true,dataAvail:true,dataLength:result.length});          
          } else {
              _this.setState({initRoute:'tasks', loaded:true,dataAvail:false});
              _this.toggleVis();
          }
      });
    },
    getData() {
        var _this = this;
        HeapActions.viewCurrentTask(function(result) {
            console.log('hey in here');
            if (result) {
                console.log('result in here');
                _this.setState({dataAvail:true,dataLength:result.length});
            } else {
                _this.setState({dataAvail:false,dataLength:0,initRoute:'tasks',show:true});
            }
        });
    },
    
    toggleVisibility() {
        this.setState({show:false});    
    },
    
    toggleVis() {
        this.setState({show:true});    
    },
    
    main() {
        this.toggleVis();
        this.refs.navigator.push({
            component: 'Task',
            name: 'tasks'
        });
    },
    
    addTask() {        
      this.toggleVisibility(); 
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
    
    viewAll() {
            this.refs.navigator.push({
                component:'ViewAll',
                name:'viewAll'
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
            case 'viewAll':
                return <ViewAll/>;
        }    
    },
        
    toggleAdd() {
        console.log('this.state.show',this.state.show);
        if (this.state.show) {
            return (
                <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor={'transparent'}
                    style={styles.noDataButton}
                    onPress={() => this.addTask()}>
                    <Text> Add Task </Text>
                </TouchableHighlight>
            );
        } else {
            return null;
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
                  {this.toggleAdd()}
                  {this.state.dataLength ? this.nav() : null}
            </View>
         );
    },
        
    nav() {
        return (
             <View style={styles.navWrapper}>
                <TouchableHighlight 
                 activeOpacity={0.5}
                 underlayColor={'transparent'}
                 onPress={() => this.view()}>
                    <Image
                        source={require('./../../images/add.png')}
                        style={styles.image}>
                    </Image>
                </TouchableHighlight>
                <Text style={styles.text}> Current Task </Text>
                <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor={'transparent'}
                    onPress={() => this.addTask()}>
                    <Image
                        source={require('./../../images/list.png')}
                        style={styles.image}/>
                </TouchableHighlight>
                <Text style={styles.text}> Add Task </Text>
                
                <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor={'transparent'}
                    onPress={() => this.viewAll()}>
                    <Text> View All </Text>
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
                {this.nav()}
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
    //    this.getData();
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
    },
    navWrapper: {
        flex:-1,
        flexDirection:'row',
        justifyContent:'center',
        borderTopColor:'#D1C4E9',
        borderTopWidth:2,
        backgroundColor:'#FFFFFF',
        height:40
    },
    
    image: {
        flexDirection:'row',
        width:30,
        height:30
    },
    text: {
        fontSize:12,
        color: '#B6B6B6'
    }
    
});

export default Prioritize;