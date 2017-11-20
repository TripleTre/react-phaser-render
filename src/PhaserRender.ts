import ReactFiberReconciler from 'react-reconciler'
import * as ReactDOMFrameScheduling from './ReactDOMFrameScheduling'
import invariant from 'fbjs/lib/invariant'
import {
  isPhaserGame,
  isPhaserGroup,
  isPhaserSprite
} from './type/type-guards'
import InstanceFactory from './phaser/instance-factory'
import updatePayload from './phaser/update-payload'
import commitUpdate from './phaser/commit-update'
import appendInitialChild from './phaser/append-initial-child'

type PhaserRender = {
  createContainer: any
}

const PhaserRender = ReactFiberReconciler({
  appendInitialChild (parentInstance, child) {
    if (isPhaserGroup(parentInstance)) {
      appendInitialChild.group(parentInstance, child)
      return
    }
    if (isPhaserSprite(parentInstance)) {
      appendInitialChild.spriate(parentInstance, child)
      return
    }
  },

  createInstance(type, props, internalInstanceHandle) {
    invariant(typeof InstanceFactory[type] === 'function', `${type} is not a phaser object`)
    return InstanceFactory[type](props, internalInstanceHandle)
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    debugger
    return 'text, rootContainerInstance, internalInstanceHandle'
  },

  finalizeInitialChildren(domElement, type, props) {
    return false;
  },

  getPublicInstance(instance) {
    return instance;
  },

  prepareForCommit() {
    // Noop
  },

  prepareUpdate(domElement, type, oldProps, newProps) {
    const fn = updatePayload[type]
    if (fn) {
      return fn(oldProps, newProps)
    }
    return void 0
  },

  resetAfterCommit() {
    // Noop
  },

  resetTextContent(domElement) {
    // Noop
  },

  shouldDeprioritizeSubtree(type, props) {
    return false;
  },

  getRootHostContext() {
    return {};
  },

  getChildHostContext() {
    return {};
  },

  scheduleDeferredCallback: ReactDOMFrameScheduling.rIC,

  shouldSetTextContent(type, props) {
    return (
      typeof props.children === 'string' || typeof props.children === 'number'
    );
  },

  now: ReactDOMFrameScheduling.now,

  useSyncScheduling: true,

  mutation: {
    appendChild(parentInstance, child) {
      if (child.parentNode === parentInstance) {
        child.eject();
      }
      child.inject(parentInstance);
    },

    appendChildToContainer(parentInstance, child) {
      if (child.game === parentInstance && isPhaserGame(parentInstance)) {
        parentInstance.world.add(child)
      }
    },

    insertBefore(parentInstance, child, beforeChild) {
      invariant(
        child !== beforeChild,
        'ReactART: Can not insert node before itself',
      );
      child.injectBefore(beforeChild);
    },

    insertInContainerBefore(parentInstance, child, beforeChild) {
      invariant(
        child !== beforeChild,
        'ReactART: Can not insert node before itself',
      );
      child.injectBefore(beforeChild);
    },

    removeChild(parentInstance, child) {
      debugger
      // destroyEventListeners(child);
      child.eject();
    },

    removeChildFromContainer(parentInstance, child) {
      debugger
      // destroyEventListeners(child);
      child.eject();
    },

    commitTextUpdate(textInstance, oldText, newText) {
      // Noop
      debugger
    },

    commitMount(instance, type, newProps) {
      // Noop
      debugger
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      commitUpdate[type](instance, updatePayload, oldProps, newProps)
    },
  }
})

console.log(PhaserRender)

export default PhaserRender
