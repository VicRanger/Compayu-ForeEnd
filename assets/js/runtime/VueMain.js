var vm = new Vue({
    el: '#root',
    data: {
        isLoaded:false,
        isEnter:false,
        operationDelay: 500,
        lastOperation: new Date().getTime(),
        loginMode:'user',
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
            face: '',
            typeText: '',
        },
        express: {
            show: false,
            typeText: '',
            classifyResult: '',
        },
        user: {
            account: '',
            password: '',
            autoLogin: true,
            useCookie: false,
            isLogin: false,
            nickname: ''
        },
        volume:1,
        svgData: {}
    },
    mounted: function () {
        this.svgData = svgData;
    },
    computed: {
        isLoginInputsValid: function () {
            return (/^1[34578]\d{9}$/.test(this.user.account) || /\w+[@]{1}\w+[.]\w+/.test(this.user.account)) && this.user.account.length > 0 && this.user.password.length > 0
        },
    },
    methods: {
        msg: function (msg, type, duration = 1500) {
            return this.$message({
                showClose: false,
                message: msg,
                type: type,
                duration: duration,
            })
        },
        isOperationBlock: function (time = 0) {
            let t = time > 0 ? time : this.operationDelay;
            return this.lastOperation + t > new Date().getTime();
        },
        operationDone: function () {
            this.lastOperation = new Date().getTime()
        },
        classifyExpress: function (e) {
            if (this.isOperationBlock(3000)) {
                vm.msg('不要点太快哦，服务器吃不消哇','warning')
                return
            };
            VueFunctions.classifyExpress(this);
            this.operationDone();
        },
        classifyExpressOnEditor:function(){
            if (this.isOperationBlock()) {
                return
            };
            VueFunctions.classifyExpress(this);
            this.operationDone();
        },
        postExpress: function () {
            if (this.isOperationBlock()) return;
            UI.postExpress();
            this.operationDone();
        },
        hideThought: function () {
            UI.hideThought();
        },
        hideExpress: function () {
            UI.hideExpress();
        },
        userLogin: function () {
            if (this.isOperationBlock()) return;
            VueFunctions.userLogin(this);
            this.operationDone();
        },
        autoLogin: function () {
            if (this.isOperationBlock()) return;
            VueFunctions.autoLogin(this);
            this.operationDone();
        },
        changeUser: function () {
            VueFunctions.changeUser(this);
        },
        loginOut: function () {
            if (this.isOperationBlock(3000)) return;
            VueFunctions.loginOut(this);
            this.operationDone();
        },
        randomEnter: function () {
            if (this.isOperationBlock()) return;
            vm.user.nickname = "匿名"
            vm.user.isLogin = true;
            UI.setEnter();
            this.operationDone();
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
        },
        toggleVolume:function(){
            VueFunctions.toggleVolume(this);
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
        console.log(1);
        User.loginWithPassword(vue.user.account, vue.user.password, isPasswordMd5 = false, autoLogin = vue.user.autoLogin)
            .then((res) => {
                console.log(res.msg);
                UI.setEnter();
            })
            .catch((err) => {
                console.log(err);
            })
    }
    this.autoLogin = function (vue) {
        User.autoLogin()
            .then((res) => {
                console.log(res.msg);
                UI.setEnter();
            })
            .catch((err) => {
                console.log(err);
            })
    }
    this.loginOut = function (vue) {
        User.loginOut();
    }
    this.changeUser = (vue) => {
        vue.user.useCookie = false;
    }
    this.toggleVolume = (vue) => {
        vue.volume = 1 - vue.volume;
        audioLoadDic.bg.player.mute = vue.volume<=0;
    }
    this.classifyExpress = (vue) => {
        let text = UI.getExpressText();
        if (text.length <= 0) {
            vm.msg('朋友，要多写点哦~', 'info')
            return;
        }
        vue.express.classifyResult = '请求服务中...';
        var loadingMsg = false;
        var clock = setTimeout(() => {
            loadingMsg = vm.msg('远程服务启动中，请耐心等待', 'loading', duration = 0)
        }, 2000)
        network.post('/compayu/classify-text/', {
            'text': text
        }).then((res) => {
            res = res.data;
            if (res.code == 1) {
                console.log(res);
                predicts = {}
                for (var i = 0; i < res.data.length; i++) {
                    predicts[i] = parseInt(parseFloat(res.data[i]) * 10000) / 100;
                }
                // console.log(predicts)
                let result = Object.keys(predicts).sort(function (a, b) {
                    return predicts[b] - predicts[a];
                });
                resultText = ""
                // console.log(result)
                var tot = 0;
                for (var i = 0; i < result.length; i++) {
                    if (predicts[result[i]] > 25) {
                        if(++tot>2){
                            break;
                        }
                        resultText += `${UI.subtitle[UI.ind2eng[result[i]]]}:(${predicts[result[i]]}%) `
                    }
                }
                vue.express.classifyResult = resultText;
                clearTimeout(clock);
                // console.log(loadingMsg);
                if (loadingMsg) {
                    loadingMsg.close();
                    loadingMsg = false;
                }
            }
        }).catch((err) => {
            vue.express.classifyResult = '';
            clearTimeout(clock);
            if (loadingMsg) {
                loadingMsg.close();
                loadingMsg = false;
            }
            vm.msg('分类失败，网络错误', 'error')
        })
    }
});
var expressEditor = new(function () {
    this.editor = new wangEditor('#express-editor');
    this.editor.customConfig.uploadImgServer = network.baseUrl + '/upload/' //上传图片到服务器
    this.editor.customConfig.uploadImgMaxLength = 1 //限制上传图片数量
    this.editor.customConfig.debug = true //debug模式
    this.editor.customConfig.uploadFileName = 'file'
    this.editor.customConfig.menus = [
        // 'head',  // 标题
        'bold', // 粗体
        'fontSize', // 字号
        // 'fontName',  // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        // 'backColor',  // 背景颜色
        // 'link',  // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        // 'emoticon',  // 表情
        'image', // 插入图片
        // 'table',  // 表格
        // 'video',  // 插入视频
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
    ]
    this.editor.customConfig.onchange = ()=>{
        vm.classifyExpressOnEditor(); 
    }
    this.editor.create();
    this.editor.$toolbarElem.css('background-color', 'none').css('border', '1px solid #ccc')
    this.editor.$textContainerElem.css('border', '1px solid #ccc').css('border-top', 'none')
        .css('height', '30vh');
});
var thoughtEditor = new(function () {
    this.editor = new wangEditor('#thought-editor');
    this.editor.customConfig.debug = true //debug模式
    this.editor.create();
    this.editor.$textElem.attr('contenteditable', false)
    this.editor.$toolbarElem.css('display', 'none')
    this.editor.$textContainerElem.css('border', 'none')
        .css('height', 'fit-content');
});