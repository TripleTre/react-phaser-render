# [setState](https://github.com/huaguhzheng/react/blob/master/packages/react/src/ReactBaseClasses.js#L53)

setState 调用了 [this.updater.enqueueSetState](https://github.com/huaguhzheng/react/blob/master/packages/react-reconciler/src/ReactFiberClassComponent.js#L90)

this.updater.enqueueSetState 传入四个参数

1. **this** Component 实例
2. **partialState** 要更改的那部分 state
3. **callback** setState 的 callback 回调
4. **'setState'** 字符串

```javascript
enqueueSetState(instance, partialState, callback) {
  // 获取 instance 内部 fiber， 其实就是 instance._reactInternalFiber
  const fiber = ReactInstanceMap.get(instance);
  callback = callback === undefined ? null : callback;
  if (__DEV__) {
    warnOnInvalidCallback(callback, 'setState');
  }
  // expirationTime 代表了 fiber 优先级
  const expirationTime = computeExpirationForFiber(fiber);
  const update = {
    expirationTime,
    partialState,
    callback,
    isReplace: false,
    isForced: false,
    nextCallback: null,
    next: null,
  };
  insertUpdateIntoFiber(fiber, update);
  scheduleWork(fiber, expirationTime);
}
```
### [computeExpirationForFiber](https://github.com/huaguhzheng/react/blob/master/packages/react-reconciler/src/ReactFiberScheduler.js#L1163)

获取 fiber 优先级，当前版本中，异步更新尚未开启。

```javascript
function computeExpirationForFiber(fiber: Fiber) {
  let expirationTime;
  // expirationContext 代表即将到来的更新的 expirationTime
  if (expirationContext !== NoWork) {
    // An explicit expiration context was set;
    expirationTime = expirationContext;
  } else if (isWorking) { // isWorking 表示正在 commit 阶段
    if (isCommitting) {
      // 在提交阶段发生的更新应该具有同步优先级
      // Updates that occur during the commit phase should have sync priority
      // by default.
      expirationTime = Sync;
    } else {
      // 渲染阶段中的更新应该与正在渲染的工作同时过期。
      // Updates during the render phase should expire at the same time as
      // the work that is being rendered.
      expirationTime = nextRenderExpirationTime;
    }
  } else {
    // No explicit expiration context was set, and we're not currently
    // performing work. Calculate a new expiration time.
    if (useSyncScheduling && !(fiber.internalContextTag & AsyncUpdates)) {
      // This is a sync update
      expirationTime = Sync;
    } else {
      // This is an async update
      expirationTime = computeAsyncExpiration();
    }
  }
  return expirationTime;
}
```

### [insertUpdateIntoFiber](https://github.com/huaguhzheng/react/blob/master/packages/react-reconciler/src/ReactFiberUpdateQueue.js#L108)

update 描述了要更新的部分 state, 要更新的时机。这个方法将 update 插入到 fiber 的 updateQueue 中。

在本次测试中，插入 update 对象之前，fiber 对象的 updateQueue 属性为 null。

fiber.alternate 属性也为 null

```javascript

export function insertUpdateIntoFiber<State>(
  fiber: Fiber,
  update: Update<State>,
): void {
  // We'll have at least one and at most two distinct update queues.
  // 
  const alternateFiber = fiber.alternate;
  let queue1 = fiber.updateQueue;
  if (queue1 === null) {
    // TODO: We don't know what the base state will be until we begin work.
    // It depends on which fiber is the next current. Initialize with an empty
    // base state, then set to the memoizedState when rendering. Not super
    // happy with this approach.
    queue1 = fiber.updateQueue = createUpdateQueue((null: any));
  }

  let queue2;
  if (alternateFiber !== null) {
    queue2 = alternateFiber.updateQueue;
    if (queue2 === null) {
      queue2 = alternateFiber.updateQueue = createUpdateQueue((null: any));
    }
  } else {
    queue2 = null;
  }
  queue2 = queue2 !== queue1 ? queue2 : null;

  // Warn if an update is scheduled from inside an updater function.
  if (__DEV__) {
    if (
      (queue1.isProcessing || (queue2 !== null && queue2.isProcessing)) &&
      !didWarnUpdateInsideUpdate
    ) {
      warning(
        false,
        'An update (setState, replaceState, or forceUpdate) was scheduled ' +
          'from inside an update function. Update functions should be pure, ' +
          'with zero side-effects. Consider using componentDidUpdate or a ' +
          'callback.',
      );
      didWarnUpdateInsideUpdate = true;
    }
  }

  // If there's only one queue, add the update to that queue and exit.
  if (queue2 === null) {
    insertUpdateIntoQueue(queue1, update);
    return;
  }

  // If either queue is empty, we need to add to both queues.
  if (queue1.last === null || queue2.last === null) {
    insertUpdateIntoQueue(queue1, update);
    insertUpdateIntoQueue(queue2, update);
    return;
  }

  // If both lists are not empty, the last update is the same for both lists
  // because of structural sharing. So, we should only append to one of
  // the lists.
  insertUpdateIntoQueue(queue1, update);
  // But we still need to update the `last` pointer of queue2.
  queue2.last = update;
}
```

### [insertUpdateIntoQueue](https://github.com/huaguhzheng/react/blob/master/packages/react-reconciler/src/ReactFiberUpdateQueue.js#L88)

调用 insertUpdateIntoQueue 后， fiber.updateQueue 就了需要执行的 update。

```javascript
fiber.updateQueue.first =  
fiber.updateQueue.last  =
{
  callback: null,
  expirationTime: 1,
  isForced: false,
  isReplace: false,
  next: null,
  nextCallback: null
  partialState: {
    foo: 'bar'
  }
}

```


```javascript
export function insertUpdateIntoQueue<State>(
  queue: UpdateQueue<State>,
  update: Update<State>,
): void {
  // Append the update to the end of the list.
  if (queue.last === null) {
    // Queue is empty
    queue.first = queue.last = update;
  } else {
    queue.last.next = update;
    queue.last = update;
  }
  if (
    queue.expirationTime === NoWork ||
    queue.expirationTime > update.expirationTime
  ) {
    queue.expirationTime = update.expirationTime;
  }
}
```

### [scheduleWork](https://github.com/huaguhzheng/react/blob/master/packages/react-reconciler/src/ReactFiberScheduler.js#L1192)
