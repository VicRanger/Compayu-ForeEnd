ReceiveMsgType = {
    Init: 1,
    ReceiveThoughtSuccess: 2,
    SendThoughtGroup: 3,
}
SendMsgType = {
    SendThought: 1,
}

var network = new(function Network(database) {
    this.url = '127.0.0.1:8000';
    // this.url = 's.wzz.ink';
    this.isUseSafe = false;
    this.baseUrl = 'http' + (this.isUseSafe ? 's' : '') + '://' + this.url;
    this.wsUrl = 'ws' + (this.isUseSafe ? 's' : '') + '://' + this.url + '/thought/';
    this.websocket = null;
    this.downloaded = 0;
    this.database = database;
    this.initThoughtNum = 25;
    this.channelName = '';
    this.roomGroupName = '';
    this.post = function (url, data) {
        return new Promise((resolve, reject) => {
            axios.post(this.baseUrl + url, data, {
                    withCredentials: true
                })
                .then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                })
        })
    }
    this.get = function (url, data) {
        return new Promise((resolve, reject) => {
            axios.get(this.baseUrl + url, {
                    params: data
                })
                .then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                })
        })
    }
    this.downloadStatus = function () {
        return this.downloaded / Object.keys(this.database.thoughts).length;
    }
    this.downloadThought = () => {
        let URL = '/compayu/thought/';
        for (i in database.thoughts) {
            let type = i;
            let query = {
                type_raw: type,
                number: this.initThoughtNum,
            }
            this.get(URL, query)
                .then((res) => {
                    res = res['data'];
                    console.log(type, res['data'].length);
                    this.database.thoughts[type] = res['data'] || [];
                    this.downloaded++;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    this.postThought = function (data) {
        return new Promise((resolve, reject) => {
            let URL = '/compayu/thought/';
            console.log(data)
            this.post(URL, data)
                .then((res) => {
                    res = res['data'];
                    console.log(res)
                    this.wsPostThought(res['data']);
                    resolve(res);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        })
    }
    this.postThoughtCallback = (data) => {
        let o = addThoughtByData(data);
        mainCameraManager.stopFocus();
        mainCameraManager.lookAt(o);
        console.log('add express successfully');
        UI.hideExpress();
        return o;
    }
    this.initWebsocket = function () {
        if (typeof (WebSocket) === "undefined") {
            alert("您的浏览器不支持WebSocket");
            return false;
        }
        this.websocket = new WebSocket(this.wsUrl);
        this.websocket.onopen = this.websocketOnOpen;
        this.websocket.onmessage = this.websocketOnMessage;
        this.websocket.onerror = this.websocketOnError;
        this.websocket.onclose = this.websocketOnClose;

    }
    this.wsPostThought = function (data) {
        if (!this.websocket) {
            console.log('websocket不存在');
            this.initWebsocket();
            return;
        }
        if (this.websocket.readyState != 1) {
            console.log('websocket未准备好', this.websocket.readyState);
            if (this.websocket.readyState == 3) {
                this.initWebsocket();
            }
            return;
        }
        this.websocket.send(JSON.stringify({
            data: data,
            msg_type: SendMsgType.SendThought
        }));
    }
    this.websocketOnOpen = function () {
        console.log('Websocket连接成功');
    }
    this.websocketOnMessage = (e) =>{
        let msg = JSON.parse(e.data);
        switch (msg['msg_type']) {
            case ReceiveMsgType.Init:
                this.channelName = msg.channel_name;
                this.roomGroupName = msg.room_group_name;
                console.log('channel_name:', this.channelName);
                console.log('room_group_name', this.roomGroupName);
                UI.sendTopMsg('WebSocket连接成功', `组ID：${this.roomGroupName}<br />连接ID：${this.channelName}`);
                break;
            case ReceiveMsgType.ReceiveThoughtSuccess:
                console.log(this);
                var o = this.postThoughtCallback(msg.data);
                UI.sendTopMsg('成功入住', '您的情绪成功入住「空游」<br /><p>点击跟随</p>', func = () => {
                    focusOnUnit(o)
                });
                console.log('成功发送');
                break;
            case ReceiveMsgType.SendThoughtGroup:
                if (msg.channel_name == this.channelName) {
                    console.log('收到自己的Thought广播，忽略');
                    return;
                }
                console.log('收到来自' + msg.channel_name + '的Thought');
                var o = addThoughtByData(msg.data);
                UI.sendTopMsg('新的情绪', '有新的情绪入住「空游」<br /><p>点击跟随</p>', func = () => {
                    focusOnUnit(o)
                });
                break;
        }
    }
    this.websocketOnError = function (e) {
        console.log('websocket连接失败', e);
        this.createWebsocket();
    }
    this.websocketOnClose = function (e) {
        console.log('websocket断开连接', e);
    }
})(database);
var focusOnUnit = (o) => {
    mainCameraManager.stopFocus();
    mainCameraManager.lookAt(o);
}