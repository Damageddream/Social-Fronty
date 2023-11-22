const initialState = {
    user: {
      loggedIn: true,
      name: "",
      photo: "",
      _id: "id1",
      friends: [],
      invites: [],
      invitesSent: [],
      friendsS: [],
    },
    ui: {
      loading: false,
      error: {
        errorStatus: false,
        errorInfo: "",
      },
    },
    modal: {
      showPost: false,
      showUser: false,
    },
    edit: {
      editedComment: 0,
      editedPost: 0,
      editProfile: 0,
    },
    delete: {
      deleteComment: 0,
      deletedPost: 0,
      deleteProfile: 0,
    },
  };

  export default initialState;