import tree from 'state/StateTree';
import _ from 'lodash';
import moment from 'moment';
import {getGymOwnerReports} from 'api/reportsApi';

const GymOwnerReports = tree.select(['views', 'GymOwnerReports']);
const myGym = tree.select(['user', 'myGym']);
const tableFilters = tree.select(['tableFilters']);

export async function gymOwnerReport() {
  const myGymId = _.get(myGym.get(), 'gymDetails._id');
  const filters = tableFilters.get();

  const startDate = filters.startDate ? moment(filters.startDate).format() : '';
  const endDate = filters.endDate ? moment(filters.endDate).format() : '';

  GymOwnerReports.set({isLoading: true});
  try {
    const report = await getGymOwnerReports(myGymId, {startDate, endDate});
    GymOwnerReports.set('report', report.body);
  } catch (err) {
    GymOwnerReports.set('error', err);
  }
  GymOwnerReports.set('isLoading', false);
  tree.commit();
}
