class Socket {
    socket;
    username;
    constructor(username) {
        let url = process.env.REACT_APP_BACKEND;
        url = url.replace('http', 'ws');
        url = url + `/ws?username=${username}`
        this.username = username;
        console.log(url)
        if (this.socket == null) {
            this.socket = new WebSocket(url);
            this.socket.onopen = this.onopen
            this.socket.onclose = this.onclose
            this.socket.onerror = this.onerror
        }
    }

    onopen = () => {
        console.log("Socket is opened")
    }

    reconnect = () => {
        // let url = process.env.REACT_APP_BACKEND;
        // url = url.replace('http', 'ws');
        // if (this.socket == null) {
        //     this.socket = new WebSocket(url);
        // }
        //TODO: automatic reconnect
    }

    onclose = (ev) => {
        console.log("Socket is closed")
        console.log("Code : ", ev.code)
        console.log("Reason : ", ev.reason)
        this.reconnect(this.username)
    }

    onmessage = (cb) => {
        this.socket.onmessage = cb
    }

    onerror = (err) => {
        console.log("Error while opening the socket", err)
    }

    send = (message) => {
        if (this.socket !== null && this.socket.readyState === WebSocket.OPEN) {
            console.log("Socket state :", this.socket.readyState)
            this.socket.send(JSON.stringify(message))
        }
        else if (this.socket !== null && this.socket.readyState === WebSocket.CONNECTING) {
            this.socket.onopen = () => {
                console.log("Socket is opened")
                this.socket.send(JSON.stringify(message))
            }
        }
    }
}
export { Socket };