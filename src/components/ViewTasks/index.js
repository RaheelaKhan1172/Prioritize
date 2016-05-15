'use strict';

import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Text
} from 'react-native';

var ViewTask = React.createClass({
    render() {
        return(
            <View>
                <Text> Test in another route </Text>
            </View>
        );
    }
});

module.exports = ViewTask;