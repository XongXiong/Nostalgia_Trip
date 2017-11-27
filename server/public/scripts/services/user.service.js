myApp.service('UserService', function ($http, $location) {
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

  self.getSelectedUser = (username) => {
    if (self.userObject.id !== undefined) {
      $http.get('/post/user/' + username).then(function (response) {
        console.log('Getting ' + username + '\'s data');
        console.log(response.data);
        self.returnedUser.data = response.data;
        $location.path('/user')
      })
    } else {
      alert('You must be logged in to view user!');
      $location.path('/login');
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
    let postVotes = {
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
      alert('You must be logged in to relate!');
      $location.path('/login');
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
    $location.path('/add')
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
      $location.path('/home');
      self.getAllPosts();
    })
  }

  self.deletePost = (postId) => {
    $http.delete('/post/' + postId).then(function (response) {
      console.log('Post Deleted');
      self.getAllPosts();
      $location.path('/home')
    })
  }

  self.addPost = (newPost) => {
    console.log(self.userObject);
    console.log(newPost);
    let postToAdd = {
      postname: newPost.postname,
      postdesc: newPost.postdesc,
      postpic: newPost.postpic,
      id: self.userObject.id,
      username: self.userObject.userName
    }
    if (postToAdd.postpic === '' || postToAdd == undefined) {
      postToAdd.postpic = 'http://hdwall.us/wallpaper/abstract_artistic_clocks_lacza_psychedelic_surreal_surrealism_time_desktop_2560x1440_hd-wallpaper-1331725.jpg';
    }
    console.log(postToAdd);
    $http.post('/post/add', postToAdd).then(function (response) {
      $location.path('/home')
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
    $location.path('/editUser');
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
      $location.path('/home');
    }).catch(function(err) {
      console.log(err);
      console.log('not working');
    })
  }
});