myApp.controller('LoginController', function ($http, $location, $route, UserService, $mdDialog) {
  console.log('LoginController created');
  let vm = this;
  vm.userService = UserService;
  vm.user = {
    username: '',
    password: '',
    password2: '',
    firstName: '',
    lastName: ''
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
      $mdDialog.cancel();
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
      $mdDialog.cancel();
    }
  }

  vm.login = () => {
    console.log('LoginController -- login');
    if (vm.user.username === '' || vm.user.password === '') {
      title = 'Missing fields';
      textContent = '';
      vm.showIncorrect();
    } else {
      console.log('LoginController -- login -- sending to server...', vm.user);
      $http.post('/', vm.user).then(function (response) {
        if (response.data.username) {
          console.log('LoginController -- login -- success: ', response.data);
          // location works with SPA (ng-route)
          $route.reload();
          $mdDialog.cancel();
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
      console.log('LoginController -- registerUser -- sending to server...', vm.user);
      $http.post('/register', vm.user).then(function (response) {
        console.log('LoginController -- registerUser -- success');
        $mdDialog.cancel();
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
