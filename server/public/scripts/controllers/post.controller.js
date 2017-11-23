myApp.controller('PostController', function ($http, $mdDialog, UserService) {
    console.log('PostController created');
    let vm = this;
    vm.userService = UserService

    vm.posts = UserService.posts;
    vm.returnedUser = UserService.returnedUser;

    vm.postToAdd = {
        postname: '',
        postdesc: '',
        postpic: ''
    }
    
    let fsClient = filestack.init('AnXpCAZX8QyrKizqSb76Rz');
    vm.openPicker = () => {
        fsClient.pick({
            fromSources: ["local_file_system", "url", "imagesearch", "facebook", "instagram", "dropbox"]
        }).then(function (response) {
            // declare this function to handle response
            // handleFilestack(response);
            if (UserService.isEditing === false) {
                vm.postToAdd.postpic = response.filesUploaded[0].url;
            } else {
                UserService.editedPost.postpic = response.filesUploaded[0].url;
                console.log(UserService.editedPost);
            }
        });
    }

    UserService.getuser();

    vm.search = (postName) => {
        $http.get('/post/' + postName).then(function (response) {
            console.log(response);
            let lmgtfyUrl = response.data;
            window.open(lmgtfyUrl, "_blank");
        })
    }

    vm.addPost = () => {
        UserService.addPost(vm.postToAdd);
        vm.postToAdd = null;

    }

    vm.getUserInfo = (username) => {
        UserService.getSelectedUser(username);
    }

    UserService.getAllPosts();

    vm.showPrompt = function (ev, post) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('What would you like to edit?')
            .initialValue({ post })
            .targetEvent(ev)
            .ok('Okay!')
            .cancel('I\'m a cat person');
        console.log(post);
        console.log(confirm);
        $mdDialog.show(confirm).then(function (result) {
            console.log(result);
            vm.status = 'You decided to name your dog ' + result + '.';
        }, function () {
            vm.status = 'You didn\'t name your dog.';
        });
    };


});
