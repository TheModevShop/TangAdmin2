import tree from 'state/StateTree';
import _ from 'lodash';
import moment from 'moment';
import {getGymOwnerReports, getAppOwnerReports} from 'api/reportsApi';

const GymOwnerReports = tree.select(['views', 'GymOwnerReports']);
const myGym = tree.select(['user', 'myGym']);
const tableFilters = tree.select(['tableFilters']);

const AppOwnerGymReports = tree.select(['views', 'AppOwnerGymReports']);

export async function gymOwnerReport() {
  const myGymId = _.get(myGym.get(), 'gymDetails._id');
  let filters = tableFilters.get();
  filters = filters.reports || {};

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

export async function appOwnerReport() {
  let filters = tableFilters.get();
  filters = filters.appOwnerGymReports || {};

  const startDate = filters.startDate ? moment(filters.startDate).format() : '';
  const endDate = filters.endDate ? moment(filters.endDate).format() : '';

  AppOwnerGymReports.set({isLoading: true});
  try {
    const report = await getAppOwnerReports({startDate, endDate});
    AppOwnerGymReports.set('report', report.body);
  } catch (err) {
    AppOwnerGymReports.set('error', err);
  }
  AppOwnerGymReports.set('isLoading', false);
  tree.commit();
}
