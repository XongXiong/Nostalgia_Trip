myApp.controller('PostController', function ($http, UserService) {
    console.log('PostController created');
    let vm = this;
    
    vm.posts = [{ name: 'Shoua', url: 'https://scontent.ffar1-1.fna.fbcdn.net/v/t31.0-8/22555659_1727158440629943_40649371309642927_o.jpg?oh=1fad174b1e41ed40d5ec9f5d6eb8d3b6&oe=5A617EB0', desc: 'The most', ref: 'http://lmgtfy.com/?q=Prime+Digital+Academy', votes: 1000000 }, { name: 'Shoua', url: 'https://scontent.ffar1-1.fna.fbcdn.net/v/t31.0-8/22555659_1727158440629943_40649371309642927_o.jpg?oh=1fad174b1e41ed40d5ec9f5d6eb8d3b6&oe=5A617EB0', desc: 'The most', ref: 'http://lmgtfy.com/?q=Prime+Digital+Academy', votes: 1000000 }, { name: 'Shoua', url: 'https://scontent.ffar1-1.fna.fbcdn.net/v/t31.0-8/22555659_1727158440629943_40649371309642927_o.jpg?oh=1fad174b1e41ed40d5ec9f5d6eb8d3b6&oe=5A617EB0', desc: 'The most', ref: 'http://lmgtfy.com/?q=Prime+Digital+Academy', votes: 1000000 }, { name: 'Shoua', url: 'https://scontent.ffar1-1.fna.fbcdn.net/v/t31.0-8/22555659_1727158440629943_40649371309642927_o.jpg?oh=1fad174b1e41ed40d5ec9f5d6eb8d3b6&oe=5A617EB0', desc: 'The most', ref: 'http://lmgtfy.com/?q=Prime+Digital+Academy', votes: 1000000 }, ];
    let postToAdd = {
        postName: '',
        postDesc: '',
        postPic: ''
    }


    UserService.getuser();

    vm.search = (postName) => {
        post = {
            name: postName
        }
        $http.post('/post', post).then(function(response) {
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
});
