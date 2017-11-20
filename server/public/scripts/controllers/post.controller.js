myApp.controller('PostController', function ($http, UserService) {
    console.log('PostController created');
    let vm = this;
    vm.userService = UserService
    
    vm.posts = UserService.posts;

    let postToAdd = {
        postName: '',
        postDesc: '',
        postPic: ''
    }


    UserService.getuser();

    vm.search = (postName) => {
        $http.get('/post/' + postName).then(function(response) {
            console.log(response);
            let lmgtfyUrl = response.data;
            window.open(lmgtfyUrl, "_blank"); 
        })
    }

    vm.addPost = () => {
        $http.post('/post/add', postToAdd).then(function(response) {
            console.log(response);
        })
    }

    UserService.getAllPosts();
});
