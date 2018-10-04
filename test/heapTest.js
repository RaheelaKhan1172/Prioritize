const assert = require('assert');
const Heap = require('../src/data/Heap');

describe('Heap', function() {
  var heap;
  describe('Heap basic functions', function() {
    beforeEach('create empty Heap', function() {
      heap = new Heap();
    })
    it('should start with an empty array', function() {
      assert.equal(0, heap.tasks.length)
    })

    it('should add a new task', function() {
      heap.tasks.push(new Pq('test', 10))
      assert.equal(1, heap.tasks.length)
    })

    it('should swap these tasks', function() {
      assert.equal(true, heap.shouldSwap({priority: 15}, {priority: 12}))
    })
  })

  describe('heap sorting', function() {
      before('create unsorted heap', function() {
        heap = new Heap();
        heap.tasks.push({priority: 5})
        heap.tasks.push({priority: 15})
        heap.tasks.push({priority: 20})
        heap.tasks.push({priority: 5})
      })

      it('should change order', function() {
        heap.upHeap();
        let ordered = true;
        for (var i = 0; i < heap.tasks.length - 1; i++) {
          if (heap.tasks.length[i] < heap.tasks.length[i+1]) ordered = false;
        }
        assert.equal(true, ordered);
      })

      it('should not change the array', function() {
        let c = heap.tasks.concat();
        heap.upHeap();
        let same = true;
        for (var i = 0; i < c.length; i++) if (c[i].priority !== heap.tasks[i].priority) same = false;
        assert.equal(same, true)
      })
  })

  describe('deleting tasks', function() {
    beforeEach('create tasks', function() {
      heap = new Heap();
      heap.tasks.push({entry: 'walk'})
      heap.tasks.push({entry: 'talk'})
      heap.tasks.push({entry: 'rock'})
      heap.tasks.push({entry: 'sock'})
    })

    it('should delete a task', function() {
      heap.deleteATask('walk');
      assert.equal(3, heap.tasks.length)
    })

    it('shouldnt delete a task', function() {
      heap.deleteATask('dock');
      assert.equal(4, heap.tasks.length);
    })
  })
})
