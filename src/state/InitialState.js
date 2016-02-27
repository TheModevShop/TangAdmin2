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
      tableFilters: {
        instructor: null,
        className: null,
        startDate: null,
        endDate: null,
      },
      views: {
        GymList: null,
        GymProfile: {
          Profile: null
        },
        GymInstructors: null,
        GymStudents: null,

        AddGym: {
          awaitingSave: false,
          data: {},
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
        StudentProfile: {
          awaitingSave: false,
          error: false,
          success: true,
          response: null,
          studentPrivatesTable: null,
          studentClassesTable: null
        },
        InstructorProfile: {
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


