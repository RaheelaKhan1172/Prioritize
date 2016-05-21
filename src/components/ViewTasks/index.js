'use strict';

import React from 'react';
import AddTask from '../AddTask';
import Reflux from 'reflux';
import { HeapActions } from './../../actions';
import HeapStore from './../../stores/HeapStore';
import RewardStore from './../../stores/RewardStore';

import {
    Animated,
    Alert,
    StyleSheet,
    View,
    Text,
    TouchableHighlight
} from 'react-native';

var ViewTask = React.createClass({
    
    mixins: [Reflux.connect(RewardStore,'rewardStore')],
    
    getInitialState() {
        console.log('me first');
        return {
            currentTask: null,
            priority: 0,
            data: false,
            streak:false,

        };
    },
    
    componentWillMount() {
      RewardStore.emit();
      this.viewTask();
    },
  
    
    viewTask() {
        var _this = this;
        HeapActions.viewCurrentTask(function(result) {
            if (result) {
                console.log('the reuslt',result);
            _this.setState({currentTask:result[0], priority:result[1], data:true});
            } else {
                //update state so rerendering changes
               _this.setState({currentTask:'',priority:0,data:false});
            }
        });
    },
    
    donePop() {
        var _this = this;
        HeapActions.popSuccess();
        
        RewardStore.popSuccess();
        RewardStore.checkIfStreak(function(res) {
            if (res) {
                alert('WOHOO! You are on fiya!');
            }
        });
        _this.viewTask();
    },
    
    deletePop() {
        var _this = this;
        HeapActions.pop(function(res) {
            alert('Deleted ' + res);
            _this.viewTask();
        });
    },
    
    noData() {
      return(
        <View>
          <Text > No tasks yet! </Text>
          <AddTask/>
          </View>
      );  
    },
    
    render() {
        if(this.state.data) {
        return(
            <View style={styles.container}>
                <Text> To Do </Text> 
                <Text> {this.state.currentTask}  , {this.state.priority}</Text>
                <TouchableHighlight
                    onPress={this.donePop}> 
                    <Text> Done </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={this.deletePop}> 
                    <Text> Delete </Text>
                </TouchableHighlight>
            </View>
        );
        } else {
            return this.noData();
        }
    }
});

var styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        
    },
});


module.exports = ViewTask;