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
            <View>
                <Text> Taught wrong </Text>
                <Text> haha </Text>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

module.exports = Task;