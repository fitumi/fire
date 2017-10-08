window.onload = function() {
  'use strict';

  var canvas = document.getElementById('flame');
  var context = canvas.getContext('2d');

  var palette = getPalette();

  var width = 100;
  var height = 100;
  var fire = new Array(width * height);

  for (var i = 0; i < fire.length; ++i) {
    fire[i] = 0;
  }

  render();

  function render() {
    for (var x = 0; x < width; ++x) {
      var pos = getPos(x, height - 1, width);
      fire[pos] = Math.random() > 0.5 ? 0 : 255;
    }

    for (var y = 0; y < height - 1; ++y) {
      for (var x = 0; x < width; ++x) {
        var leftVal = (x == 0)
          ? fire[getPos(width - 1, y, width)]
          : fire[getPos(x - 1, y, width)];

        var rightVal = (x == width - 1)
          ? fire[getPos(0, y, width)]
          : fire[getPos(x + 1, y, width)];

        var belowVal = fire[getPos(x, y + 1, width)];
        var sum = leftVal + rightVal + (belowVal * 2);
        var avg = Math.floor(sum / 4.0);

        if (avg > 0) {
          avg--;
        }

        fire[getPos(x, y, width)] = avg;
      }
    }

    draw();

    setTimeout(render, 33);
  }

  function draw() {
    for (var i = 0; i < fire.length - width * 3; ++i) {
      var x = i % width;
      var y = Math.floor(i / width);
      context.fillStyle = palette[fire[i]];
      context.fillRect(x, y, 1, 1);
    }
  }
}

function getPos(x, y, width) {
  return y * width + x;
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPalette() {
  var palette = new Array(256);

  for (var i = 0; i < 64; ++i) {
    var r1 = i * 4;
    var g1 = 0;
    var b1 = 0;
    palette[i] = createColor(r1, g1, b1);

    var r2 = 255;
    var g2 = i * 4;
    var b2 = 0;
    palette[i + 64] = createColor(r2, g2, b2);

    var r3 = 255;
    var g3 = 255;
    var b3 = i * 4;
    palette[i + 128] = createColor(r3, g3, b3);

    var r4 = 255;
    var g4 = 255;
    var b4 = 255;
    palette[i + 192] = createColor(r4, g4, b4);
  }

  return palette;
}

function createColor(r, g, b) {
  return "rgb(" + r + "," + g + "," + b + ")";
}
