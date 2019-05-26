import * as t from '@babel/types';

export function getName(asset, type, ...rest) {
  return (
    '$' +
    t.toIdentifier(asset.id) +
    '$' +
    type +
    (rest.length
      ? '$' +
        rest
          .map(name => (name === 'default' ? name : t.toIdentifier(name)))
          .join('$')
      : '')
  );
}

export function getIdentifier(asset, type, ...rest) {
  return t.identifier(getName(asset, type, ...rest));
}

export function getExportIdentifier(asset, name) {
  return getIdentifier(asset, 'export', name);
}

export function removeReference(node, scope) {
  let binding = scope.getBinding(node.name);
  if (binding) {
    let i = binding.referencePaths.findIndex(v => v.node === node);
    if (i >= 0) {
      binding.dereference();
      binding.referencePaths.splice(i, 1);
    }
  }
}
