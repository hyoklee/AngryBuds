var canvasElem = document.getElementById("game");
var world = boxbox.createWorld(canvasElem);
var myimage = "../img/logo.png";
alert('image='+myimage);
world.createEntity({
  name: "player",
  shape: "circle",
  radius: 1,
  image: myimage,
  // image: "../img/logo.png",
  imageStretchToFit: true,
  density: 4,
  x: 2,
  y: 10,
  onKeyDown: function(e) {
    this.applyImpulse(200, 60);
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
  width: .5,
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

