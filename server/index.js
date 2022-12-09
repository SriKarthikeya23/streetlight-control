const express = require('express');
const cors = require('cors');
const app = express();
const mqtt = require('mqtt');

app.use(cors());
app.use(express.json());

var data1 = 0;
var data2 = 0;
var data3 = 0;
var data4 = 0;
var light_temp1 = 0;
var light_temp2 = 0;
var light_temp3 = 0;
var light_temp4 = 0;
var light1 = mqtt.connect('mqtt://35.234.254.79:1883');
var light2 = mqtt.connect('mqtt://35.234.254.79:1883');
var light3 = mqtt.connect('mqtt://35.234.254.79:1883');
var light4 = mqtt.connect('mqtt://35.234.254.79:1883');

app.post('/post/light/1', (req, res) => {
    data1 = req.body.data;
    console.log("Light 1 "+data1);
    res.send("received data light 1");
});
light1.on("connect", function() {
    setInterval(function() {
        if(data1 != light_temp1) {
            light1.publish("street/l1", JSON.stringify(data1));
            light_temp1 = data1;
        }
    }),1000;
});


app.post('/post/light/2', (req, res) => {
    data2 = req.body.data;
    console.log("light 2 "+data2);
    res.send("received data light 2");
});
light2.on("connect", function() {
    setInterval(function() {
        if(data2 != light_temp2) {
            light2.publish("street/l2", JSON.stringify(data2));
            light_temp2 = data2;
        }
    }),1000;
});

app.post('/post/light/3', (req, res) => {
    data3 = req.body.data;
    console.log("light 3 "+data3);
    res.send("received data light 3");
});
light3.on("connect", function() {
    setInterval(function() {
        if(data3 != light_temp3) {
            light3.publish("street/l3", JSON.stringify(data3));
            light_temp3 = data3;
        }
    }),1000;
});

app.post('/post/light/4', (req, res) => {
    data4 = req.body.data;
    console.log("light 4 "+ data4);
    res.send("received data light 4");
});
light4.on("connect", function() {
    setInterval(function() {
        if(data4 != light_temp4) {
            light4.publish("street/l4", JSON.stringify(data4));
            light_temp4 = data4;
        }
    }),1000;
});

app.get('/get/light/all', (req, res) => {
    var data = {
        "light1" : data1,
        "light2" : data2,
        "light3" : data3,
        "light4" : data4
    }
    res.send(data);
});

var ct1 = mqtt.connect('mqtt://35.234.254.79:1883');
var ct2 = mqtt.connect('mqtt://35.234.254.79:1883');
var ct3 = mqtt.connect('mqtt://35.234.254.79:1883');
var ct4 = mqtt.connect('mqtt://35.234.254.79:1883');
var ctdata1 = 0;
var ctdata2 = 0;
var ctdata3 = 0;
var ctdata4 = 0;

ct1.on('connect', function() {
    ct1.subscribe("street/ct1");
    console.log("subscribed to ct 1")
});
ct1.on('message', function(topic, message) {
    console.log("CT 1 Data received : "+ message.toString());
    ctdata1 = parseInt(message.toString());
});

ct2.on('connect', function() {
    ct2.subscribe("street/ct2");
    console.log("subscribed to ct 2")
});
ct2.on('message', function(topic, message) {
    console.log("CT 2 Data received : "+ message.toString());
    ctdata2 = parseInt(message.toString());
});

ct3.on('connect', function() {
    ct3.subscribe("street/ct3");
    console.log("subscribed to ct 3")
});
ct3.on('message', function(topic, message) {
    console.log("CT 3 Data received : "+ message.toString());
    ctdata3 = parseInt(message.toString());
});

ct4.on('connect', function() {
    ct4.subscribe("street/ct4");
    console.log("subscribed to ct 4")
});
ct4.on('message', function(topic, message) {
    console.log("CT 4 Data received : "+ message.toString());
    ctdata4 = parseInt(message.toString());
});

app.get('/get/ct/all', (req, res) => {
    var data = {
        "ct1" : ctdata1,
        "ct2" : ctdata2,
        "ct3" : ctdata3,
        "ct4" : ctdata4
    }
    res.send(data);
});

app.listen(6001, () => {
    console.log("running on port 6001");
})
