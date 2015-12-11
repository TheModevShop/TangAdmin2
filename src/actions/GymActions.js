import tree from 'state/StateTree';
// import xhr from 'utility/xhr';
// const authentication = tree.select('authentication');
const activeGym = tree.select(['views', 'GymProfile', 'ActiveId']);



// export async function deleteGym() {
//   try {
//     const session = await xhr('GET', `${BASE}/deteGym`);
//     allGyms.set({'stale', true});
//     return session;
//   } catch(e) {
//     return false;
//   }
// }

export function setActiveGym(id) {
  console.log(id)
  activeGym.set(id);
  tree.commit();
  // console.log(activeGym.get());
}
