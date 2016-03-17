import tree from 'state/StateTree';
import _ from 'lodash';

const gymList = tree.select(['views', 'GymList']);
const ClassList = tree.select(['views', 'Classes', 'list']);
const PrivatesList = tree.select(['views', 'Privates', 'list']);
const activeGym = tree.select(['views', 'GymProfile']);
const GymOwnerProfile = tree.select(['views', 'GymOwnerProfile']);
const InstructorProfile = tree.select(['views', 'InstructorProfile']);
const gymInstructorsCursor = tree.select(['views', 'GymInstructors']);
const gymOwnersCursor = tree.select(['views', 'GymOwners']);
const StudentProfile = tree.select(['views', 'StudentProfile']);
const TransactionsList = tree.select(['views', 'Transactions', 'list']);

export async function resetAllCursors(data) {
  gymList.set({stale: true});
  activeGym.set({stale: true});
  GymOwnerProfile.set({stale: true});
  InstructorProfile.set({stale: true});
  gymInstructorsCursor.set({stale: true});
  gymOwnersCursor.set({stale: true});
  StudentProfile.set({stale: true});
  
  TransactionsList.set(null);
  ClassList.set(null);
  PrivatesList.set(null);
  tree.commit();
}