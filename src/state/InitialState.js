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
        AddGym: {
          awaitingSave: false,
          data: {name: null, description: null, address: {street: null, city: null, state: null, zipcode: null}, contact: {email: null, phone: null, website: null}, hours:{mon_open: null, mon_close: null, tue_open: null, tue_close: null, wed_open: null, wed_close: null, thu_open: null, thu_close: null, fri_open: null, fri_close: null, sat_open: null, sat_close: null, sun_open: null, sun_close: null}, privateSessionPrice: null, cancellationPolicy: {percent: null, time: null}, location: []},
          error: false,
          success: true,
          response: null
        },
        CreateAccount: {
          awaitingSave: false,
          serverResponse: {}
        },
        AddClass: {
          awaitingSave: false,
          error: false,
          success: true,
          response: null
        },
        ClassList: null,
        PrivatesList: null
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


