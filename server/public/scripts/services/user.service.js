myApp.service('UserService', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.loggedIn = false;
  self.posts = {data: []};

  self.getAllPosts = () => {
    $http.get('/post').then(function (response) {
      console.log(response.data);
      self.posts.data = response.data;
    }).catch(function (err) {
      console.log('Could not get all posts');
    });
  }

  self.getuser = () => {
    console.log('UserService -- getuser');
    $http.get('/user').then(function(response) {
        if(response.data.username) {
            // user has a curret session on the server
            console.log(response);
            self.userObject.userName = response.data.username;
            self.userObject.id = response.data.id;
            console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
        } else {
          console.log(response);
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
      self.userObject = {};
    });
  }

  self.toggleLog = () => {
    self.loggedIn = !self.loggedIn;
  }

  self.postVote = (upDown, postId, votes) => {
    let postVotes = {
      voteCount: votes
    }
    if(self.loggedIn === true){
      if (upDown === 'up') {
        postVotes.voteCount += 1;
        console.log(postVotes);
        $http.put('/post/' + postId, postVotes).then(function(response) {
          console.log('Upvote!');
          self.getAllPosts();
        }).catch(function(err) {
          console.log('Error upvoting');
        })
      } else if (upDown === 'down') {
        postVotes.voteCount -= 1;
        console.log(postVotes);
        $http.put('/post/' + postId, postVotes).then(function (response) {
          console.log('Downvote!');
          self.getAllPosts();
        }).catch(function (err) {
          console.log('Error downvoting');
        })
      } else {
        console.log('Vote not working');
      }
  } else {
    alert('You must be logged in to relate!');
  }
}
});
