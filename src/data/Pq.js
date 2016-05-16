'use strict';

 class PriorityQueue {
    constructor(entry,priority) {
        this.entry = entry;
        this.priority = priority;
    }
     
    setFromObject(obj) {
        this.entry = obj.entry;
        this.priority = obj.priority;
    } 
     
    static fromObject(obj) {
        console.log('obj in pq', obj);
        let pq = new PriorityQueue(obj.entry,obj.priority);     
        pq.setFromObject(obj);
        return pq;
    }
}

module.exports = PriorityQueue;