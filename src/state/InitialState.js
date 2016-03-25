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
      locationClassNames: null,
      views: {
        Dashboard: null,
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
        GymOwnerProfile: {
          awaitingSave: false,
          error: false,
          success: true,
          response: null
        },
        GymOwners: null,

        Classes: {
          page: 0,
          list: null
        },
        Privates: {
          page: 0,
          list: null
        },
        Transactions: {
          page: 0,
          list: null
        },
        TransactionProfile: {
          awaitingSave: false,
          error: false,
          success: true,
          response: null,
          activeTransaction: null
        },
        GymOwnerReports: {
          list: null
        },
      },
      user: {
        details: {},
        myGym: null,
        myGyms: null
      },
      authentication: {
        sessionData: sessionData ? sessionData : null
      },
      awaitingAuthentication: false,
      tableFilters: {
        classes: {},
        privates: {},
        transactions: {},
      },
    },
    facets: {facets: facets}
  };
}


