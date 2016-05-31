//@flow

'use strict';
import Heap from './../data/Heap';
import PriorityQueue from './../data/Pq';
import {HeapActions} from './../actions';
import Reflux from 'reflux';

import React from 'react';
import { AsyncStorage } from 'react-native';
const KEY = 'PKey';

var HeapStore = Reflux.createStore({
   init() {
       this.tasks = [];
       this.heap = new Heap();
       this.loadHeap().done();
       this.listenTo(HeapActions.push,this.push);
       this.listenTo(HeapActions.getAllTasks,this.getAllTasks);
       this.listenTo(HeapActions.pop, this.pop);
       this.listenTo(HeapActions.deleteTask,this.deleteTask);
       this.listenTo(HeapActions.popSuccess, this.popSuccess);
     //  this.listenTo(HeapActions.deleteAll, this.deleteAll);
       this.listenTo(HeapActions.viewCurrentTask, this.viewCurrentTask);
       this.listenTo(HeapActions.viewNextTasks, this.viewNextTasks);
    //   this.emit();
       
   }, 
    
   async loadHeap() {
     try {
         var task = await AsyncStorage.getItem(KEY);
         console.log(task,'t')
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
           console.log(AsyncStorage,'the storage');
       } catch (error) {
           console.error('Async Storage error: ', error.message);
       }
    },
    
 /*   deleteAll() {
        console.log('o jappen');
        this.tasks=[];
        this.emit();
    }, */
    
    push(entry,priority) {
        if (entry === 'undefined') {throw 'No taask inserted';}
        
        var node = new PriorityQueue(entry,priority);
        this.tasks.push(node);
        console.log(Heap,node,entry,priority,'in push');
        
        this.tasks = this.heap.upHeap(this.tasks);
   //     this.tasks = this.heap.upHeap(this.tasks.length-1,node,this.tasks);
        console.log('and after', this.tasks);
        this.emit();
        
    },
    
    pop(cb) {
        var headNode = this.tasks[0];
        this.tasks.shift();
        console.log('hi in pop',this.tasks);
        this.tasks = this.heap.siftDown(this.tasks);
        this.emit();
        cb(JSON.stringify(headNode));
    },
    
    popSuccess() {
        var deleted = this.tasks[0];
        this.tasks.shift();
        this.tasks = this.heap.siftDown(this.tasks);
        this.emit();
        return deleted;
    },
    
    viewCurrentTask(cb) {
        if (this.tasks.length) {
            var entry = this.tasks[0].entry;
            var prior = this.tasks[0].priority;
            console.log(entry);
            cb([entry,prior]);
        } else {
            cb();
        }
    },
    deleteTask(task,cb) {
        this.tasks = this.heap.deleteATask(this.tasks,task);   
        this.emit();
        cb(this.tasks);
    },
    
    getAllTasks(cb) {
        this.tasks = this.heap.upHeap(this.tasks);
        cb(this.tasks);
    },
    
    viewNextTasks(cb) {
        cb(JSON.stringify([this.tasks[1], this.tasks[2]]));
    },
    
    emit() {
        this.writeHeap().done();
        this.trigger(this.tasks);
    }
});

export default HeapStore;