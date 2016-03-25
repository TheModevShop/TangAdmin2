import tree from 'state/StateTree';
import _ from 'lodash';

const tableFilters = tree.select(['tableFilters']);

export function clearFilter() {
  tableFilters.set({
    instructor: null,
    className: null,
    startDate: null,
    endDate: null,
    student: null
  })
  tree.commit();
}

export function setInstructor(instructor, table) {
  tableFilters.set([table, 'instructor'], instructor);
  tree.commit();
}

export function setClassName(className, table) {
  tableFilters.set([table, 'className'], className);
  tree.commit();
}

export function setStudent(student, table) {
  tableFilters.set([table, 'student'], student);
  tree.commit();
}

export function setDate(startDate, endDate, table) {
  tableFilters.set([table, 'startDate'], startDate);
  tableFilters.set([table, 'endDate'], endDate);
  tree.commit();
}

