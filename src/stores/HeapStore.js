//@flow

'use strict';

import Heap from './../data/Heap';
import PriorityQueue from './../data/Pq';
import {HeapActions} from './../actions';
import Reflux from 'reflux';

import React from 'react';
import {
    AsyncStorage
} = 'react-native';

const KEY = 'toDoKey';

var HeapStore = Reflux.createStore({
   init() {
       this.loadHeap().done();
       this.listenTo(HeapActions.push,this.push);
       this.listenTo(HeapActions.pop, this.pop);
       this.listenTo(HeapActions.deleteAll, this.deleteAll);
       this.listenTo(HeapActions.viewCurrentTask, this.viewCurrentTask);
       this.listenTo(HeapActions.viewNextTasks, this.viewNextTasks);
       this.tasks = [];
       this.emit();
   }, 
});