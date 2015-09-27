
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var budimage = '../img/logo.png';
        var targetimage = '../img/pig.jpg';
        var budsize = 1;
        var budpressure = 200;
        var budtemp = 80;
        var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');
        // listeningElement.setAttribute('style', 'display:none;');
        //  alert(id)
        // Avoid async. This is important.
        $.ajaxSetup( { "async": false } );
        $.getJSON('http://server.alcoholanalytics.com/api/hackathon/?m=577&d=c&f=2&l=&s=&t=j', function(data) {
            // Consider onl the latest reading.
            // $.each(data, function(index) {
                // alert(data[index].id);
                // receivedElement.innerHTML = 'Welcome to SmartBar at '+ data[index].city + ', ' + data[index].state;
                if (data[0].liquid_name) {
                    budimage = '../img/' + data[0].liquid_name + '.png';
                 }
                if (data[0].delta) {
                    budsize = 1 * (1.0+parseFloat(data[0].delta));
                 }
                if (data[0].liquid_temp) {
                    budtemp = -4 * parseInt(data[0].liquid_temp)
                 }
            // });
        });

        $.getJSON('http://server.alcoholanalytics.com/api/hackathon/?m=578&d=p&l=&s=&t=j',  function(data) {
            $.each(data, function(index) {
                if (data[index].value) {
                    budpressure = parseInt(parseFloat(data[index].value) / 5.0);
                 }
            });
        });
        // receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
        var canvasElem = document.getElementById("game");
        var world = boxbox.createWorld(canvasElem);
        // alert('bud type='+budimage);
        // alert('bud size='+budsize);
        // alert('bud pressure='+budpressure);
        // alert('bud temp='+budtemp);
        world.createEntity({
            name: "player",
            shape: "circle",
            // radius: 1,
            radius: budsize,
            // radius: 2,
            image: budimage,
            imageStretchToFit: true,
            density: 4,
            x: 2,
            y: 10,
            onKeyDown: function(e) {
                // up, forward
                this.applyImpulse(budpressure, budtemp);
            }
        });

        world.createEntity({
            name: "ground",
            shape: "square",
            type: "static",
            color: "rgb(0,100,0)",
            width: 20,
            height: .5,
            y: 10
        });

        var block = {
            name: "block",
            shape: "square",
            color: "brown",
            width: 1,
            height: 4,
            onImpact: function(entity, force) {
                if (entity.name() === "player") {
                    this.color("black");
                }
            }
        };

        world.createEntity(block, {
            x: 15
        });

        world.createEntity(block, {
            x: 17
        });

        world.createEntity(block, {
            x: 16,
            y: 1,
            width: 4,
            height: .5
        });

        world.createEntity({
            name: "target",
            shape: "circle",
            // radius: 1,
            radius: budsize,
            // radius: 2,
            image: targetimage,
            imageStretchToFit: true,
            density: 4,
            x: 16,
            y: -1,
        });

    }
};
