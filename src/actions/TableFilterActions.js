import tree from 'state/StateTree';
import _ from 'lodash';

const tableFilters = tree.select(['tableFilters']);

export function clearFilter() {
  tableFilters.set({
    instructor: null,
    className: null,
    startDate: null,
    endDate: null
  })
  tree.commit();
}

export function setInstructor(instructor) {
  tableFilters.set({instructor: instructor});
  tree.commit();
}

export function setClassName(className) {
  tableFilters.set({className: className});
  tree.commit();
}

export function setStudent(student) {
  tableFilters.set({student: student});
  tree.commit();
}

export function setStartDate(startDate) {
  tableFilters.set({startDate: startDate});
  tree.commit();
}

export function setEndDate(endDate) {
  tableFilters.set({endDate: endDate});
  tree.commit();
}

