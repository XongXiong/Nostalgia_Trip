myApp.controller('LoginController', function ($http, $location, $route, UserService, $mdDialog) {
  console.log('LoginController created');
  var vm = this;
  vm.user = {
    username: '',
    password: '',
    password2: '',
    firstName: '',
    lastName: ''
  };
  vm.message = '';

  vm.login = () => {
    console.log('LoginController -- login');
    if (vm.user.username === '' || vm.user.password === '') {
      vm.message = "Enter your username and password!";
    } else {
      console.log('LoginController -- login -- sending to server...', vm.user);
      $http.post('/', vm.user).then(function (response) {
        if (response.data.username) {
          console.log('LoginController -- login -- success: ', response.data);
          // location works with SPA (ng-route)
          // $location.path('/home'); // http://localhost:5000/#/home
          $route.reload();
          $mdDialog.cancel();
        } else {
          console.log('LoginController -- login -- failure: ', response);
          vm.message = "Incorrect username or password. Please try again";
        }
      }).catch(function (response) {
        console.log('LoginController -- registerUser -- failure: ', response);
        vm.message = "Incorrect username or password. Please try again";
      });
    }
  };

  vm.registerUser = () => {
    console.log('LoginController -- registerUser');
    if (vm.user.username === '' || vm.user.password === '') {
      vm.message = "Choose a username and password!";
    } else if (vm.user.password !== vm.user.password2) {
      vm.message = "Passwords don't match!";
    } else {
      console.log('LoginController -- registerUser -- sending to server...', vm.user);
      $http.post('/register', vm.user).then(function (response) {
        console.log('LoginController -- registerUser -- success');
        $mdDialog.cancel();
        UserService.showLogin();
      }).catch(function (response) {
        console.log('LoginController -- registerUser -- error');
        vm.message = "Please try again."
      });
    }
  }
});
