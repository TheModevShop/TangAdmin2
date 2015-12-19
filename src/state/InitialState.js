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
        GymList: {},
        GymProfile: {
          Profile: null
        },
        GymInstructors: null,
        GymStudents: null,
        AddGym: {},
        CreateAccount: {
          awaitingSave: false,
          serverResponse: {}
        },
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


