'use strict';

import Reflux from 'reflux';

export var HeapActions = Reflux.createActions([
    'push',
    'pop',
    'deleteAll',
    'viewCurrentTask',
    'viewNextTasks'
]);