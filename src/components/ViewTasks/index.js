'use strict';
//next to do
import React from 'react';
import Reflux from 'reflux';
import { HeapActions } from './../../actions';
import HeapStore from './../../stores/HeapStore';
//import RewardStore from './../../stores/RewardStore';
import Task from '../Tasks';

import {
    Animated,
    Alert,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';

var ViewTask = React.createClass({
    
  //  mixins: [Reflux.connect(RewardStore,'rewardStore')],
    
    getInitialState() {
        return {
            currentTask: null,
            priority: 0,
            data: false,
            streak:false,

        };
    },
    currentStreak:0,
    
    componentWillMount() {
   //   RewardStore.emit();
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
        ++this.currentStreak;
        if (this.currentStreak % 5 === 0) {
            alert('WOHOO! You are on fiya!');
        } 
     /*   RewardStore.popSuccess();
        RewardStore.checkIfStreak(function(res) {
            if (res) {
                alert('WOHOO! You are on fiya!');
            }
        }); */
        _this.viewTask();
    },
    
    deletePop() {
        var _this = this;
        HeapActions.pop(function(res) {
            res = JSON.parse(res);
            alert('Deleted ' + res.entry);
            _this.viewTask();
        });
    },
    
    noData() {
      return(
        <View style={styles.container}>
          <Task/>
          </View>
      );  
    },
    
    render() {
        if(this.state.data) {
        return(
            <View style={styles.container}>
                <Text style={styles.headline}> This task has the highest priority. </Text> 
                <Text style={styles.mainText}> {this.state.currentTask}</Text>
                <View style={styles.left}>
                    <TouchableHighlight
                        activeOpacity={0.5}
                        underlayColor={'transparent'}
                        onPress={this.donePop}> 
                        <Image
                        source={require('./../../../images/success.png')}
                        style={{width:40, height:40}}/>
                    </TouchableHighlight>
                <View style={styles.horizontal}>
                    <TouchableHighlight
                        activeOpacity={0.5}
                        underlayColor={'transparent'}
                        onPress={this.deletePop}> 
                        <Image 
                            source={require('./../../../images/error.png')}
                            style={{width:40,height:40}} />
                    </TouchableHighlight>
                 </View>
                </View>
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
    },
    mainText: {
        fontSize:50,
        fontStyle:'normal',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        fontFamily: 'Cochin',
        color: '#212121',
        marginTop:70
    },
    left: {
         flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    horizontal: {
        padding:4,
        justifyContent:'center',
        alignItems:'center'
    },
    headline: {
        marginTop:45,
        color:'#727272',
        fontSize:15,
        textAlign:'left',
    },
});


module.exports = ViewTask;