import getInitialState from './InitialState';
import tree from 'state/StateTree';
import _ from 'lodash';

const {cursors, facets} = getInitialState();
export function resetState() {
  tree.set(cursors);
  _.forOwn(facets, (v, k) => {
    tree.addFacet(k, v);
  });
  tree.commit();
}