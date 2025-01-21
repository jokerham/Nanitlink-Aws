import { NodeApi } from 'react-arborist';

// Extend NodeApi to add the `walk` method
declare module 'react-arborist' {
  interface NodeApi<T> {
    walk(callback: (node: NodeApi<T>) => void): void;
  }
}

// Implement the walk method
NodeApi.prototype.walk = function <T>(this: NodeApi<T>, callback: (node: NodeApi<T>) => void) {
  const recurse = (node: NodeApi<T>) => {
    callback(node); // Perform the desired operation on the node
    node.children?.forEach((child) => recurse(child)); // Recursively walk through children
  };

  recurse(this);
};