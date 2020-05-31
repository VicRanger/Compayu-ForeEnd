var vm = new Vue({
    el: '#root',
    data: {
        pop: {
            show: false,
            title: '标题',
            content: '内容',
        },
        topMsg: [],
        thought: {
            show: false,
            nickname: '',
            textContent: '',
            imgSrc: '',
            face: '',
            typeText: '',
        },
        express: {
            show: false,
            textContent: '',
            typeText: '',
        },
        user: {
            name: '',
            password: '',
            autoLogin: true,
            hasCookie: false,
            isLogin: false,
            nickname: ''
        },
        svgData: {}
    },
    mounted: function () {
        this.svgData = svgData;
    },
    methods: {
        postExpress: function () {
            UI.postExpress();
        },
        hideThought: function () {
            UI.hideThought();
        },
        hideExpress: function () {
            UI.hideExpress();
        },
        userLogin: function () {
            VueFunctions.userLogin(this);
        },
        randomEnter: function () {
            UI.setEnter();
        },
        showAboutUs: function () {
            VueFunctions.showAboutUs(this);
        },
        showUserLicense: function () {
            this.pop.show = true;
            this.pop.title = database.userLicense.title;
            this.pop.content = database.userLicense.content;
        },
        hidePopWindow: function () {
            this.pop.show = false;
        },
        closeTopMsg: function (id) {
            VueFunctions.closeTopMsg(this, id);
        },
        callTopMsg: function (id) {
            VueFunctions.callTopMsg(this, id);
        }
    }
})
var VueFunctions = new(function () {
    this.showAboutUs = function (vue) {
        vue.pop.show = true;
        vue.pop.title = database.aboutUs.title;
        vue.pop.content = database.aboutUs.content;
    }
    this.closeTopMsg = function (vue, id) {
        vue.topMsg.splice(id, 1);
    }
    this.callTopMsg = function (vue, id) {
        let func = vue.topMsg[id].func;
        if (func != null) {
            func();
        }
    }
    this.userLogin = function (vue) {
        User.loginWithPassword(vue.user.name,vue.user.password,isPasswordMd5=false,autoLogin=vue.user.autoLogin)
        .then((res)=>{
            console.log(res.msg);
            UI.setEnter();
        })
        .catch((err)=>{
            console.log(err);
        })
    }
});