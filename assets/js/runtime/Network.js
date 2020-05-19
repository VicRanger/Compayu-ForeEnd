ReceiveMsgType = {
    Init: 1,
    ReceiveThoughtSuccess: 2,
    SendThoughtGroup: 3,
}
SendMsgType = {
    SendThought: 1,
}
var postThoughtCallback = (data) => {
    let o = addThoughtByData(data);
    mainCameraManager.stopFocus();
    mainCameraManager.lookAt(o);
    console.log('add express successfully');
    UI.hideExpress();
    return o;
}
var network = new(function Network(database) {
    // this.url = '127.0.0.1:8000';
    this.url = 's.wzz.ink';
    this.isUseSafe = true;
    this.baseUrl = 'http'+(this.isUseSafe?'s':'')+'://'+this.url+'/compayu/';
    this.wsUrl = 'ws'+(this.isUseSafe?'s':'')+'://'+this.url+'/thought/';
    this.websocket = null;
    this.downloaded = 0;
    this.database = database;
    this.initThoughtNum = 25;
    this.channelName = '';
    this.roomGroupName = '';
    this.downloadStatus = function () {
        return this.downloaded / Object.keys(this.database.thoughts).length;
    }
    this.downloadThought = function () {
        let URL = 'thought/';
        for (i in database.thoughts) {
            let type = i;
            let query_data = {
                type: type,
                number: this.initThoughtNum,
            }
            $.get(
                this.baseUrl + URL,
                query_data,
                (ret, status) => {
                    ret = JSON.parse(ret);
                    console.log(type,ret['data'].length);
                    this.database.thoughts[type] = ret['data'] || [];
                    this.downloaded++;
                }
            )
        }
    }
    this.postThought = function (data, callback) {
        let URL = 'thought/';
        let query_data = data
        console.log(data)
        $.post(
            this.baseUrl + URL,
            JSON.stringify(query_data),
            (ret, status) => {
                console.log(ret);
                ret = JSON.parse(ret)
                callback(data['data']);
            }
        )
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
    this.websocketOnMessage = function (e) {
        let msg = JSON.parse(e.data);
        switch (msg['msg_type']) {
            case ReceiveMsgType.Init:
                this.channelName = msg.channel_name;
                this.roomGroupName = msg.room_group_name;
                console.log('channel_name:', this.channelName);
                console.log('room_group_name', this.roomGroupName);
                UI.sendTopMsg('WebSocket连接成功',`组ID：${this.roomGroupName}<br />连接ID：${this.channelName}`);
                break;
            case ReceiveMsgType.ReceiveThoughtSuccess:
                var o = postThoughtCallback(msg.data);
                UI.sendTopMsg('成功入住','您的情绪成功入住「空游」<br /><p>点击跟随</p>',func=()=>{
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
                UI.sendTopMsg('新的情绪','有新的情绪入住「空游」<br /><p>点击跟随</p>',func=()=>{
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
var focusOnUnit = (o)=>{
    mainCameraManager.stopFocus();
    mainCameraManager.lookAt(o);
}