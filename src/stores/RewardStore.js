//@flow

'use strict';

import Reward from './../data/Reward';

import {HeapActions} from './../actions';
import HeapStore from './HeapStore';
import Reflux from 'reflux';
import React from 'react';
import {AsyncStorage} from 'react-native';

const REWARD = 'rewardKey';

var RewardStore = Reflux.createStore({
    init() {
        this.currentStreak = new Reward();
        this.load().done();
        this.listenTo(HeapActions.popSuccess,this.popRS);
        this.emit();
    },
    async load() {
        try {
            var result = await AsyncStorage.getItem(REWARD);
            console.log(result,'result in reward store');
            if (result !== null) {
                console.log('res',result);
                this.currentStreak.total = result;
            }
            this.emit();
        } catch (e) {
            console.error('Async Storage error ' + e);
        }
    },
    
    async write() {
        try {
            await AsyncStorage.setItem(REWARD,String(this.currentStreak.total));
        } catch (error) {
            console.error('Async Storage error' + e);
        }
    },
    
    async update() {
        try {
            var num = await AsyncStorage.getItem(REWARD);
            console.log('the num', num);
            //await AsyncStorage.setItem(REWARD,num);
            //this.emit();
        } catch (e) {
            console.error('error error' ,e )
        }
    },
    
    popRS() {
        console.log('i was hit in pop store');
        this.update().done();        
        
    },
    
    emit() {
        this.write().done();
        this.trigger(this.currentStreak.total);
        console.log('wohoooooo', this.currentStreak);
    }
});

export default RewardStore;