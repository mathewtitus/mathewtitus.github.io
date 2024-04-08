(() => {
  // <stdin>
  var particleCount = 200;
  var particlePropCount = 9;
  var particlePropsLength = particleCount * particlePropCount;
  var baseTTL = 100;
  var rangeTTL = 500;
  var baseSpeed = 0.1;
  var rangeSpeed = 1;
  var baseSize = 1;
  var rangeSize = 1;
  var baseHue = 10;
  var rangeHue = 100;
  var mode = "light";
  var currentBackground = "rgb(50,50,50)";
  var transitionPerc = 0;
  function intInterp(a, b, t) {
    if (t < 0) {
      t = 0;
    } else if (t > 1) {
      t = 1;
    }
    return Math.round(a * (1 - t) + b * t);
  }
  function backgroundColor(em, perc) {
    let r, g, b;
    const [dr, dg, db] = [50, 50, 50];
    const [lr, lg, lb] = [168, 247, 246];
    if (em === "dark") {
      r = intInterp(lr, dr, perc).toString();
      g = intInterp(lg, dg, perc).toString();
      b = intInterp(lb, db, perc).toString();
      return "rgb(" + r + "," + g + "," + b + ")";
    } else if (em === "light") {
      r = intInterp(dr, lr, perc).toString();
      g = intInterp(dg, lg, perc).toString();
      b = intInterp(db, lb, perc).toString();
      return "rgb(" + r + "," + g + "," + b + ")";
    }
  }
  function changeMode() {
    transitionPerc = 0;
    console.log("theme: " + mode);
    console.log("transitionPerc: " + transitionPerc);
    mode = mode === "dark" ? "light" : "dark";
  }
  var container;
  var canvas;
  var ctx;
  var center;
  var tick;
  var particleProps;
  function setup() {
    createCanvas();
    resize();
    initParticles();
    draw();
  }
  function initParticles() {
    tick = 0;
    particleProps = new Float32Array(particlePropsLength);
    let i2;
    for (i2 = 0; i2 < particlePropsLength; i2 += particlePropCount) {
      initParticle(i2);
    }
  }
  function initParticle(i2) {
    let theta, x, y, vx, vy, life, ttl, speed, size, hue;
    x = rand(canvas.a.width);
    y = rand(canvas.a.height);
    theta = angle(x, y, center[0], center[1]);
    vx = cos(theta) * 6;
    vy = sin(theta) * 6;
    life = 0;
    ttl = baseTTL + rand(rangeTTL);
    speed = baseSpeed + rand(rangeSpeed);
    size = baseSize + rand(rangeSize);
    hue = baseHue + rand(rangeHue);
    particleProps.set([x, y, vx, vy, life, ttl, speed, size, hue], i2);
  }
  function drawParticles(mode2) {
    let i2;
    for (i2 = 0; i2 < particlePropsLength; i2 += particlePropCount) {
      updateParticle(i2, mode2);
    }
  }
  function updateParticle(i2, mode2) {
    let i22 = 1 + i2, i3 = 2 + i2, i4 = 3 + i2, i5 = 4 + i2, i6 = 5 + i2, i7 = 6 + i2, i8 = 7 + i2, i9 = 8 + i2;
    let x, y, theta, vx, vy, life, ttl, speed, x2, y2, size, hue, r;
    x = particleProps[i2];
    y = particleProps[i22];
    r = Math.sqrt(x * x + y * y) / canvas.a.width;
    theta = angle(x, y, center[0], center[1]) + HALF_PI;
    if (mode2 === "dark") {
      vx = lerp(particleProps[i3], 0.8 * cos(theta) / r ** 0.8, 0.05);
      vy = lerp(particleProps[i4], 0.8 * sin(theta) / r ** 0.8, 0.05);
    } else if (mode2 === "light") {
      vx = lerp(particleProps[i3], 0, 0.05);
      vy = lerp(particleProps[i4], -1, 0.05);
    }
    life = particleProps[i5];
    ttl = particleProps[i6];
    speed = particleProps[i7];
    x2 = x - vx * speed;
    y2 = y - vy * speed;
    size = particleProps[i8];
    hue = particleProps[i9];
    drawParticle(x, y, theta, life, ttl, size, hue);
    life++;
    particleProps[i2] = x2;
    particleProps[i22] = y2;
    particleProps[i3] = vx;
    particleProps[i4] = vy;
    particleProps[i5] = life;
    life > ttl && initParticle(i2);
  }
  function drawParticle(x, y, theta, life, ttl, size, hue) {
    let xRel = x - 0.5 * size, yRel = y - 0.5 * size;
    let centerAngle = 6 * Math.PI / 8;
    let phi = Math.abs(theta - centerAngle);
    let maxLight = 1;
    let light = Math.max(maxLight - 30 * Math.PI * phi / 4, 0);
    light = 1;
    ctx.a.save();
    ctx.a.lineCap = "round";
    ctx.a.lineWidth = 1;
    ctx.a.strokeStyle = `hsla(${hue},100%,60%,${light * fadeInOut(life, ttl)})`;
    ctx.a.beginPath();
    ctx.a.translate(xRel, yRel);
    ctx.a.rotate(theta);
    ctx.a.translate(-xRel, -yRel);
    ctx.a.strokeRect(xRel, yRel, size, size);
    ctx.a.closePath();
    ctx.a.restore();
  }
  function createCanvas() {
    container = document.querySelector(".content--canvas");
    canvas = {
      a: document.createElement("canvas"),
      b: document.createElement("canvas")
    };
    canvas.b.style = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
    z-index: 1;
	`;
    container.appendChild(canvas.b);
    ctx = {
      a: canvas.a.getContext("2d"),
      b: canvas.b.getContext("2d")
    };
    center = [];
  }
  function resize() {
    const { innerWidth, innerHeight } = window;
    canvas.a.width = innerWidth;
    canvas.a.height = innerHeight;
    ctx.a.drawImage(canvas.b, 0, 0);
    canvas.b.width = innerWidth;
    canvas.b.height = innerHeight;
    ctx.b.drawImage(canvas.a, 0, 0);
    center[0] = 0.5 * canvas.a.width;
    center[1] = 0.5 * canvas.a.height;
  }
  function renderGlow() {
    ctx.b.save();
    ctx.b.filter = "blur(8px) brightness(200%)";
    ctx.b.globalCompositeOperation = "lighter";
    ctx.b.drawImage(canvas.a, 0, 0);
    ctx.b.restore();
    ctx.b.save();
    ctx.b.filter = "blur(4px) brightness(200%)";
    ctx.b.globalCompositeOperation = "lighter";
    ctx.b.drawImage(canvas.a, 0, 0);
    ctx.b.restore();
  }
  function render() {
    ctx.b.save();
    ctx.b.globalCompositeOperation = "lighter";
    ctx.b.drawImage(canvas.a, 0, 0);
    ctx.b.restore();
  }
  function draw() {
    tick++;
    ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);
    let theme = localStorage.getItem("theme") || "light";
    let transitioning = localStorage.getItem("transition") || 1;
    transitioning = parseFloat(transitioning);
    if (transitioning < 1) {
      transitioning += 0.01;
      localStorage.setItem("transition", transitioning);
    }
    currentBackground = backgroundColor(theme, transitioning);
    ctx.b.fillStyle = currentBackground;
    ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height);
    drawParticles(theme);
    renderGlow();
    render();
    window.requestAnimationFrame(draw);
  }
  window.addEventListener("load", setup);
  window.addEventListener("resize", resize);
  document.getElementById("theme-toggle").addEventListener("click", function() {
    changeMode();
  });
  function gaussian(mean, stdev) {
    var y2;
    var use_last = false;
    return function() {
      var y1;
      if (use_last) {
        y1 = y2;
        use_last = false;
      } else {
        var x1, x2, w;
        do {
          x1 = 2 * Math.random() - 1;
          x2 = 2 * Math.random() - 1;
          w = x1 * x1 + x2 * x2;
        } while (w >= 1);
        w = Math.sqrt(-2 * Math.log(w) / w);
        y1 = x1 * w;
        y2 = x2 * w;
        use_last = true;
      }
      var retval = mean + stdev * y1;
      return retval;
    };
  }
  var standard = gaussian(-10, 1);
  for (i = 0; i < 1e3; i++) {
    console.log(standard());
  }
})();
