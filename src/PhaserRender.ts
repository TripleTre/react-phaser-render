import ReactFiberReconciler from 'react-reconciler'
import * as ReactDOMFrameScheduling from './ReactDOMFrameScheduling'
import invariant from 'fbjs/lib/invariant'
import Element from 'src/phaser/Element';
import InstanceFactory from './phaser/InstanceFactory'

type PhaserRender = {
  createContainer: any
}

const PhaserRender = ReactFiberReconciler({
  appendInitialChild (parentInstance: Element<any, any>, child) {
    parentInstance.appendChild(child)
  },

  createInstance(type, props, internalInstanceHandle) {
    invariant(typeof InstanceFactory[type] === 'function', `${type} is not a phaser object`)
    return new InstanceFactory[type](internalInstanceHandle, props)
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

  prepareUpdate(element: Element<any, any>, type, oldProps, newProps) {
    console.log('prepareUpdate')
    return element.prepareUpdate(oldProps, newProps)
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
      const { instance } = child
      if (instance.game === parentInstance) {
        parentInstance.world.add(instance)
        return
      }
      debugger
    },

    insertBefore(parentInstance: Element<any, any>, child, beforeChild) {
      parentInstance.insertBefore(child, beforeChild)
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

    commitUpdate(instance: Element<any, any>, updatePayload, type, oldProps, newProps) {
      instance.commitUpdate(updatePayload, oldProps, newProps)
    },
  }
})

console.log(PhaserRender)

export default PhaserRender
