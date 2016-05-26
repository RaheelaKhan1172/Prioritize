'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text
} from 'react-native';


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
        fontSize:40,
        fontStyle:'normal',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        fontFamily: 'Cochin',
        color: '#B6B6B6',
        marginTop:70
    }
});

module.exports = Task;