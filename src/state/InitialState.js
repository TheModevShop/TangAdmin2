const req = require.context('./facets', false, /\.js$/);
const facets = {};
req.keys().forEach((path) => {
  const fileName = path.match(/\.\/(.*)/)[1];
  facets[fileName.replace('Facet.js', '')] = req(path)();
});



export default function getInitialState() {
  const sessionData = localStorage.getItem('sessionData');
  return {
    cursors: {
      roles: null,
      views: {
        GymList: null,
        GymProfile: {
          Profile: null
        },
        Instructors: null,
        GymStudents: null,
        AddGym: {},
        CreateAccount: {
          awaitingSave: false,
          serverResponse: {}
        },
        AddClass: {
          awaitingSave: false,
          error: null
        }
      },
      user: {
        details: {},
        myGym: null
      },
      authentication: {
        sessionData: sessionData ? sessionData : null
      },
      awaitingAuthentication: false,
    },
    facets: {facets: facets}
  };
}


