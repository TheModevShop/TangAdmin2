import tree from 'state/StateTree';
import _ from 'lodash';

const tableFilters = tree.select(['tableFilters']);

export function next(path) {
  const page = tree.select(path).get('page');
  tree.select(path).set('page', page + 1);

  path.push('list'); // we want to stale the list not the view.
  tree.select(path).set('stale', true);
  tree.commit();
}

export function prev(path) {
  const page = tree.select(path).get('page');
  tree.select(path).set('page', page > 0 ? page - 1 : 0);

  path.push('list'); // we want to stale the list not the view.
  tree.select(path).set('stale', true);
  tree.commit();
}
