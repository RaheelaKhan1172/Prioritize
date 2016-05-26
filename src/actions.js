'use strict';

import Reflux from 'reflux';

export var HeapActions = Reflux.createActions([
    'push',
    'popSuccess',
    'pop',
    'deleteAll',
    'getAllTasks',
    'deleteTask',
    'viewCurrentTask',
    'viewNextTasks',
]);