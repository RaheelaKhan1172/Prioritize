'use strict';

class Heap {
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
    
    
    upHeap(taskArray) {
        return taskArray.sort(function(a,b) {
            return b.priority - a.priority;
        });
    }
    
    siftDown(taskArray) {
        console.log('in sort',taskArray);
        return taskArray.sort(function(a,b) {
            return b.priority - a.priority;
        });
    }
    
    deleteATask(taskArray,theTask) {
        console.log(taskArray,'the task array in delete a task', theTask);
        return taskArray.filter(function(a,i) {
            return a.entry !== theTask;
        });
    }
    /*upHeap(childIndex,childNode,taskArray) {
        console.log('ba4', taskArray);
        
        if (childIndex > 0) {
            var parentIndex = this.getParentIndex(childIndex);
            var parentNode = taskArray[parentIndex];
            console.log('parentNode', parentNode)
            if(this.shouldSwap(childNode,parentNode)) {
                console.log('am I happening?');
                taskArray[parentIndex] = childNode;
                taskArray[childIndex] = parentNode;
                this.upHeap(parentIndex,childNode,taskArray);
            }
        }
        
        console.log(taskArray,'hey in upHeap');
        
        return taskArray;
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
    } */
    
    setFromObject(obj) {
        console.log('objest again', obj);
        this.tasks.push({entry: obj.tasks[0].entry, priority: obj.tasks[0].priority});    
    }
    
    static fromObject(object) {
        let h = new Heap();
        console.log('og',object);
        h.setFromObject(object);
        console.log(h,'hey');
        return h;
    }
}

module.exports = Heap;