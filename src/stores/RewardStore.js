//@flow

'use strict';

import Reward from './../data/Reward';

import {HeapActions} from './../actions';
import Reflux from 'reflux';
import React from 'react';
import { AsyncStorage } from 'react-native';

const REWARD = 'rewardKey';

var RewardStore = Reflux.createStore({
    init() {
        this.currentStreak = new Reward();
        this.load().done();
        this.listenTo(HeapActions.popSuccess,this.popSuccess);
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
            this.currentStreak.total = Number(num);
            this.handleUpdate();
        } catch (e) {
            console.error('error error' ,e )
        }
    },
    
    handleUpdate() {
        console.log('in handle update', this.currentStreak.total,typeof this.currentStreak.total);
        this.currentStreak.total = this.currentStreak.total+=1;    
        console.log('new handle update', this.currentStreak.total);
        this.emit();
    },
    /* @ bool checkIfStreak(function) */
    checkIfStreak(cb) {
        console.log('did i happen?');
        if(cb) {
        if (Number(this.currentStreak.total) % 5 === 0) {
             cb(true);
        }    else {
            cb(false);
        }
        }
    },
    
    popSuccess(cb) {
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