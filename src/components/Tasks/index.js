'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text
} from 'react-native';

var WindowCheck = require('../WindowChecks');

var Task = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.mText}> No tasks in queue...  </Text>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    mText: {
        fontSize:WindowCheck.fontSize(),
        fontStyle:'normal',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        fontFamily: 'Cochin',
        color: '#B6B6B6',
        marginTop:WindowCheck.marginTop()
    }
});

module.exports = Task;