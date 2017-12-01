myApp.controller('LoginController', function ($http, $location, $route, UserService, $mdDialog) {
  console.log('LoginController created');
  let vm = this;
  vm.userService = UserService;
  vm.user = {
    username: '',
    password: '',
    password2: '',
    firstName: '',
    lastName: '',
    bio: 'Proud user of Nostalgia Trip',
    profilepic: '../views/images/No-Avatar.png'
  };
  vm.message = '';

  let title = '';
  let textContent = '';

  vm.showIncorrect = () => {
    let confirm = $mdDialog.confirm()
      .clickOutsideToClose(true)
      .title(title)
      .textContent(textContent)
      .ok('Try again')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function () {
      title = '';
      textContent = '';
      UserService.showLogin();
    }), function () {
      title = '';
      textContent = '';
      $mdDialog.hide();
    }
  }

  vm.showBadReg = () => {
    let confirm = $mdDialog.confirm()
      .clickOutsideToClose(true)
      .title(title)
      .textContent(textContent)
      .ok('Try again')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function () {
      title = '';
      textContent = '';
      UserService.showRegister();
    }), function () {
      title = '';
      textContent = '';
      $mdDialog.hide();
    }
  }

  vm.login = () => {
    console.log('LoginController -- login');
    if (vm.user.username === '' || vm.user.password === '') {
      title = 'Missing fields';
      textContent = '';
      vm.showIncorrect();
    } else {
      console.log('LoginController -- login -- sending user to server.');
      $http.post('/', vm.user).then(function (response) {
        if (response.data.username) {
          $route.reload();
          $mdDialog.hide();
        } else {
          console.log('LoginController -- login -- failure: ', response);
          title = 'Error Logging In';
          textContent = 'Incorrect username or password. Please try again.';
          vm.showIncorrect();
        }
      }).catch(function (response) {
        console.log('LoginController -- registerUser -- failure: ', response);
        title = 'Error Logging In';
        textContent = 'Incorrect username or password. Please try again.';
        vm.showIncorrect();
      });
    }
  };

  vm.registerUser = () => {
    console.log('LoginController -- registerUser');
    if (vm.user.username === '' || vm.user.password === '') {
      title = 'Missing fields'
      textContent = 'Choose a username and password';
      vm.showBadReg();
    } else if (vm.user.password !== vm.user.password2) {
      title = 'Attention'
      textContent = 'Passwords don\'t match.';
      vm.showBadReg();
    } else {
      console.log('LoginController -- registerUser -- sending new user to server');
      $http.post('/register', vm.user).then(function (response) {
        console.log('LoginController -- registerUser -- success');
        $mdDialog.hide();
        UserService.showLogin();
      }).catch(function (response) {
        console.log('LoginController -- registerUser -- error');
        title = 'User already exists';
        textContent = 'Please try again';
        vm.showBadReg();
      });
    }
  }
});
