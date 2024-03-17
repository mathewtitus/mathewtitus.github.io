(() => {
  // ns-params:@params
  var params_default = { pageName: "About" };

  // <stdin>
  console.log("in coalesce.js");
  console.log(params_default.pageName);
  var particleCount = 2e3;
  var particlePropCount = 9;
  var particlePropsLength = particleCount * particlePropCount;
  var baseTTL = 100;
  var rangeTTL = 500;
  var baseSpeed = 0.1;
  var rangeSpeed = 1;
  var baseSize = 2;
  var rangeSize = 10;
  var baseHue = 10;
  var rangeHue = 100;
  var backgroundColor = "rgb(50,50,50)";
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
    let i;
    for (i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }
  }
  function initParticle(i) {
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
    particleProps.set([x, y, vx, vy, life, ttl, speed, size, hue], i);
  }
  function drawParticles() {
    let i;
    for (i = 0; i < particlePropsLength; i += particlePropCount) {
      updateParticle(i);
    }
  }
  function updateParticle(i) {
    let i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i, i9 = 8 + i;
    let x, y, theta, vx, vy, life, ttl, speed, x2, y2, size, hue;
    x = particleProps[i];
    y = particleProps[i2];
    theta = angle(x, y, center[0], center[1]) + 0.75 * HALF_PI;
    vx = lerp(particleProps[i3], 2 * cos(theta), 0.05);
    vy = lerp(particleProps[i4], 2 * sin(theta), 0.05);
    life = particleProps[i5];
    ttl = particleProps[i6];
    speed = particleProps[i7];
    x2 = x + vx * speed;
    y2 = y + vy * speed;
    size = particleProps[i8];
    hue = particleProps[i9];
    drawParticle(x, y, theta, life, ttl, size, hue);
    life++;
    particleProps[i] = x2;
    particleProps[i2] = y2;
    particleProps[i3] = vx;
    particleProps[i4] = vy;
    particleProps[i5] = life;
    life > ttl && initParticle(i);
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
		position: absolute;
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
    ctx.b.fillStyle = backgroundColor;
    ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height);
    drawParticles();
    renderGlow();
    render();
    window.requestAnimationFrame(draw);
  }
  window.addEventListener("load", setup);
  window.addEventListener("resize", resize);
})();
