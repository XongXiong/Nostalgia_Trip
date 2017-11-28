myApp.service('UserService', function ($http, $mdDialog, $location) {
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.posts = { data: [] };
  self.isEditing = false;
  self.returnedUser = {data:[]};

  self.getAllPosts = () => {
    $http.get('/post').then(function (response) {
      console.log(response.data);
      self.posts.data = response.data;
    }).catch(function (err) {
      console.log('Could not get all posts');
    });
  }

  self.showLogin = () => {
    $mdDialog.show({
      templateUrl: '../views/templates/login.html',
      controller: 'LoginController as lc',
      clickOutsideToClose: true,
      escapeToClose: true,
    })
  }

  self.showAlert = () => {
    var confirm = $mdDialog.confirm()
      .clickOutsideToClose(true)
      .title('You are not logged in')
      .textContent('Please log in before proceeding')
      .ok('Log In')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      self.showLogin();
    }), function() {
      $mdDialog.cancel();
    }
  };

  self.getSelectedUser = (username) => {
    if (self.userObject.id !== undefined) {
      $http.get('/post/user/' + username).then(function (response) {
        console.log('Getting ' + username + '\'s data');
        console.log(response.data);
        if (response.data.length === 0){
          $http.get('/user/' + username).then(function(response) {
            console.log(response.data);
            self.returnedUser.data = response.data;
          })
        } else {
        self.returnedUser.data = response.data;
      }
      $location.path('/user')
      })
    } else {
      self.showAlert();
    }
  }

  self.getuser = () => {
    console.log('UserService -- getuser');
    $http.get('/user').then(function (response) {
      if (response.data.username) {
        // user has a curret session on the server
        self.userObject.userName = response.data.username;
        self.userObject.id = response.data.id;
        console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
      } else {
        console.log(response);
        console.log('UserService -- getuser -- failure');
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    }, function (response) {
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  }

    self.logout = () => {
      console.log('UserService -- logout');
      $http.get('/user/logout').then(function (response) {
        console.log('UserService -- logout -- logged out');
        self.isEditing = false;
        $location.path("/home");
        self.userObject = {};
      });
    }

  self.postVote = (upDown, postId, votes) => {
    var postVotes = {
      voteCount: votes
    }
    if (self.userObject.id !== undefined) {
      if (upDown === 'up') {
        postVotes.voteCount += 1;
        console.log(postVotes);
        $http.put('/post/' + postId, postVotes).then(function (response) {
          console.log('Upvote!');
          self.getAllPosts();
        }).catch(function (err) {
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
        });
      } else {
        console.log('Vote not working');
      }
    } else {
      self.showAlert();
    }
  }

  self.editedPost = {
    postname: '',
    postdesc: '',
    postpic: '',
    postid: ''
  }

  self.editPost = (post) => {
    console.log(post);
    self.isEditing = true;
    self.editedPost = {
      postname: post.postname,
      postdesc: post.postdesc,
      postpic: post.postpic,
      postid: post.p_id
    }
    return self.editedPost;
    console.log(self.editedPost);
    console.log(self.isEditing);
  }

  self.addEditedPost = () => {
    console.log(self.editedPost);
    $http.put('/post/edit/' + self.editedPost.postid, self.editedPost).then(function (response) {
      self.isEditing = false;
      $mdDialog.cancel();
      self.getAllPosts();
    })
  }

  self.deletePost = (postId) => {
    $http.delete('/post/' + postId).then(function (response) {
      console.log('Post Deleted');
      self.getAllPosts();
      $location.path('/home');
    })
  }

  self.addPost = (newPost) => {
    console.log(self.userObject);
    console.log(newPost);
    var postToAdd = {
      postname: newPost.postname,
      postdesc: newPost.postdesc,
      postpic: newPost.postpic,
      id: self.userObject.id,
      username: self.userObject.userName
    }
    if (postToAdd.postpic === '' || postToAdd == undefined) {
      postToAdd.postpic = '../views/images/clock.jpg';
    }
    console.log(postToAdd);
    $http.post('/post/add', postToAdd).then(function (response) {
      self.getAllPosts();
      $mdDialog.cancel();
    })
  }

  self.userToEdit = {
    username: '',
    firstname: '',
    lastname: '',
    bio: '',
    profilepic: ''
  }

  self.editUser = (loggedUser) => {
    self.userToEdit = {
      username: loggedUser.username,
      firstname: loggedUser.firstname,
      lastname: loggedUser.lastname,
      bio: loggedUser.bio,
      profilepic: loggedUser.profilepic
    }
    console.log(self.userToEdit);
    return self.userToEdit;
  }

  self.addEditedUser = () => {
    console.log(self.userToEdit);
    $http.put('/user/edit/' + self.userToEdit.username, self.userToEdit).then(function(response) {
      self.getSelectedUser(self.userObject.userName);
      $mdDialog.cancel();
    }).catch(function(err) {
      console.log(err);
      console.log('not working');
    })
  }

  self.showEditUser = () => {
    $mdDialog.show({
      templateUrl: '../views/templates/editUser.html',
      controller: 'PostController as pc',
      clickOutsideToClose: true,
      escapeToClose: true,
    })
  }

  self.showRegister = () => {
    $mdDialog.show({
      templateUrl: '../views/templates/register.html',
      controller: 'LoginController as lc',
      clickOutsideToClose: true,
      escapeToClose: true
    })
  }

  self.showAddEdit = () => {
    $mdDialog.show({
      templateUrl: '../views/templates/add.html',
      controller: 'PostController as pc',
      clickOutsideToClose: true,
      escapeToClose: true,
      onRemoving: function () {
        self.isEditing = false;
      }
    })
  }
});