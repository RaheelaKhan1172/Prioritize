'use strict';

class Heap {
    constructor(tasks) {
        this.tasks = tasks;
    }
    
    getRightChild(parentIndex) {
        return parentIndex * 2 + 2;
    }
    
    getLeftChild(parentIndex) {
        return parentIndex * 2 + 1;
    }
    
    getParentIndex(childIndex) {
        return Math.floor((childIndex-1) / 2);
    }
    
    shouldSwap(childNode,parentNode) {
        return (childNode.priority > parentNode.priority)? true : false;
    }
    
    upHeap(childIndex,childNode,taskArray) {
        if (childIndex > 0) {
            var parentIndex = this.getParentIndex(childIndex);
            var parentNode = taskArray[parentIndex];
            
            if(this.shouldSwap(childNode,parentNode)) {
                taskArray[parentIndex] = childNode;
                taskArray[childIndex] = parentNode;
                this.upHeap(parentIndex,childNode,taskArray);
            }
        }
    }
    
    siftDown(parentIndex,parentNode,taskArray) {
        if (parentIndex < taskArray.length) {
            var targetIndex = parentIndex;
            var targetNode = parentNode;
            
            var leftChildIndex = this.getLeftChild(parentIndex);
            var rightChildIndex = this.getRightChild(parentIndex);
            
            var trySwap = function(index,array, shouldSwap) {
                if (index < array.length) {
                    var data = array[index];
                    
                    if(shouldSwap(data,targetNode)) {
                        targetIndex = index;
                        targetNode = data;
                    }
                }
            };
            
            trySwap(leftChildIndex,taskArray, this.shouldSwap);
            trySwap(rightChildIndex,taskArray, this.shouldSwap);
            
            if(targetIndex !== parentIndex) {
                taskArray[parentIndex] = targetNode;
                taskArray[targetIndex] = parentNode;
                this.siftDown(targetIndex,parentNode);
            }
            
        }
    }
    
    static fromObject(object) {
        let h = new Heap(object);
        return h;
    }
    
}

module.exports = Heap;