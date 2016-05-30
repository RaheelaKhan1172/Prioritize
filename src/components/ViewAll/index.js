//@flow

import React from 'react';
import Reflux from 'reflux';
import { HeapActions } from './../../actions';
import HeapStore from './../../stores/HeapStore';
import Task from '../Tasks';
import Prioritize from '../Prioritize';

import {
    StyleSheet,
    View,
    ListView,
    Text,
    TouchableHighlight,
    Image,
    Animated
} from 'react-native';

var ViewAll = React.createClass({
   
    getInitialState() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1,row2) => row1 !== row2
            }),
            loaded:false,
            dataAvail:false,
            anim: new Animated.Value(0)
        }
    },
    
    componentWillMount() {
        var _this = this;
        HeapStore.getAllTasks(function(result) {
            console.log('results',result);
          /*  var newTasks = [];
            newTasks.push(result.map(function(a,i) {
                return {entry:a.entry,priority:a.priority};
            })); */
            if (result.length) {
                _this.setTheState(result);
            } else {
                _this.setState({dataAvail:false,loaded:true});
            }
        });    
    },
    
    setTheState(arr) {
        console.log('hi')
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(arr),
            loaded:true,
            dataAvail:true
        });
        console.log(this.state.dataSource);
    },
    
    loading() {
        return (
            <View>
                <Text> Loading View </Text>
            </View>
        );
    },

    deleteTask(currentTask) {
        var _this = this;
        HeapActions.deleteTask(currentTask,function(result) {
            console.log('after delete', result);
            if (result.length) {
                _this.setTheState(result);
            } else {
                _this.setState({
                    dataAvail:false,
                    dataSource: _this.state.dataSource.cloneWithRows(result)
                });
            }
        });
    },
    
    fix() {
        if (this.state.anim._value) {
          Animated.timing(this.state.anim,{
              toValue:0,
        }).start();  
        } else {
            Animated.timing(this.state.anim, {
                toValue:1,
            }).start();
        }
    },
    
    renderTask(task) {
        return (
            <View style={styles.container}>
                <View style={styles.rightContainer}>
                <TouchableHighlight
                    style={styles.button}
                    activeOpacity={0.5}
                    underlayColor={'transparent'}
                    onPress={() => this.fix()}>
                    <View>
                    <Text style={styles.textTask}> {task.entry} </Text>
                    <TouchableHighlight
                        activeOpacity={0.5}
                        underlayColor={'transparent'}
                        style={styles.rightContainer}
                        onPress={() => this.deleteTask(task.entry)}>
                    <Animated.Image
                        source={require('./../../../images/cross.png')}
                        style={{opacity:this.state.anim,width:15,height:15,marginLeft:2}} />
                    </TouchableHighlight>
                    </View>
                </TouchableHighlight>
                </View>
            </View>
        );    
    },

    noData() {
        return (
            <Task/>
        );
    },
        
    render() {
        if (!this.state.loaded) {
            return this.loading();
        }
        if (!this.state.dataAvail) {
            return this.noData();
        } 
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderTask}
                style={styles.listView}
            />
        
        );    
    }
});

var styles = StyleSheet.create({
    container: {
        marginTop:35,
        flex:1,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    },
    textTask: {
        fontFamily: 'Cochin',
        color: '#212121',
        fontSize:34,
        textDecorationLine:'underline',
        textDecorationColor:'#B6B6B6'
    },
    rightContainer: {
        flex:1
    },
    listView: {
        paddingTop:20
    }
});

module.exports = ViewAll;