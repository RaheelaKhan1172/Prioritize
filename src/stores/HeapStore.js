//@flow

'use strict';

import Heap from './../data/Heap';
import PriorityQueue from './../data/Pq';
import {HeapActions} from './../actions';
import Reflux from 'reflux';

import React from 'react';
import { AsyncStorage } from 'react-native';
const KEY = 'toDoKey';

var HeapStore = Reflux.createStore({
   init() {
       this.tasks = [];
       this.heap = new Heap();
       this.loadHeap().done();
       this.listenTo(HeapActions.push,this.push);
       this.listenTo(HeapActions.pop, this.pop);
       this.listenTo(HeapActions.deleteAll, this.deleteAll);
       this.listenTo(HeapActions.viewCurrentTask, this.viewCurrentTask);
       this.listenTo(HeapActions.viewNextTasks, this.viewNextTasks);
       this.emit();
       
   }, 
    
   async loadHeap() {
     try {
         var task = await AsyncStorage.getItem(KEY);
         console.log(task,'t');
         if (task != null) {
            this.tasks = JSON.parse(task).map((obj) => {
                return PriorityQueue.fromObject(obj);
            });
             
            this.emit();
         } else {
             console.info(`${KEY} not found.`);
         }
     } catch(error) {
         console.error('storage error: ', error.message);
     }
   },

   async writeHeap() {
       try {
           await AsyncStorage.setItem(KEY,JSON.stringify(this.tasks));
       } catch (error) {
           console.error('Async Storage error: ', error.message);
       }
    },
    
    deleteAll() {
        this.tasks=[];
        this.emit();
    },
    
    push(entry,priority) {
        if (entry === 'undefined') {throw 'No taask inserted';}
        
        var node = new PriorityQueue(entry,priority);
        this.tasks.push(node);
        console.log(Heap,node,entry,priority,'in push');
   //     this.heap.upHeap(this.tasks.length-1,node,this.tasks);
        
        this.emit();
        
    },
    
    pop() {
        var headNode = this.tasks[0];
        var tailNode = this.tasks.pop();
        this.tasks[0] = tailNode;
        Heap.siftDown(0,tailNode,this.tasks);
        this.emit();
        
    },
    
    viewCurrentTask() {
        return this.tasks[0];
    },
    
    viewNextTasks() {
        return [this.tasks[1], this.tasks[2]];
    },
    emit() {
        this.writeHeap().done();
        this.trigger(this.tasks);
        (console.log('hi',this.tasks))
    }
});

export default HeapStore;