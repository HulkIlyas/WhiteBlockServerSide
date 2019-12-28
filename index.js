const express = require("express")


const app = express();
const server = require("http").createServer(app)

const io = require("socket.io").listen(server)


app.get("/", (req, res) => {
    res.sendFile(__dirname + '/page.html');
})

io.sockets.on("connection", (socket) => {
    console.log("connected");
    socket.on("sendmsg", (data) => {
        console.log(data);
    })
    socket.on("move", data => {
        io.emit("moveMobile", data)
        console.log(data)
    })
    socket.on("disconnect", () => {
        console.log("disconected")
    })
})



server.listen(3000, () => {
    console.log("server running on port 3000");
});