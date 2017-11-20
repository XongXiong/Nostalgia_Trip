myApp.service('UserService', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.loggedIn = false;

  self.getuser = () => {
    console.log('UserService -- getuser');
    $http.get('/user').then(function(response) {
        if(response.data.username) {
            // user has a curret session on the server
            self.userObject.userName = response.data.username;
            self.userObject.id = response.data.id;
            console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
        } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

  self.logout = () => {
    console.log('UserService -- logout');
    $http.get('/user/logout').then(function(response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  }

  self.toggleLog = () => {
    self.loggedIn = !self.loggedIn;
  }

  self.postVote = (upDown) => {
    if (upDown === 'up') {
      console.log('upvote');
    } else if (upDown === 'down') {
      console.log('downvote');
    } else {
      console.log('not working');
    }
  }

  self.getAllPosts = () => {
    $http.get('/post', )
  }
});
