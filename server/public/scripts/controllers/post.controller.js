myApp.controller('PostController', function (UserService) {
    console.log('PostController created');
    var vm = this;

    UserService.getuser();
});
