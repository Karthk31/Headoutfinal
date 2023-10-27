let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
let particles = [];
let particleSize = 4;
let maxParticles = 100;
let threshold = 100;
let animationId;
let isLoading = false;

// Function to draw lines between particles
function line(particle, particle2) {
  context.beginPath();
  context.moveTo(particle.x, particle.y);
  context.lineTo(particle2.x, particle2.y);
  context.stroke();
}

// Function to animate the canvas
function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < maxParticles; i++) {
    let particle = particles[i];
    context.fillRect(
      particle.x - particleSize / 2,
      particle.y - particleSize / 2,
      particleSize,
      particleSize
    );

    for (let j = i + 1; j < maxParticles; j++) {
      let particle2 = particles[j];
      let distanceX = Math.abs(particle.x - particle2.x);
      let distanceY = Math.abs(particle.y - particle2.y);

      if (distanceX < threshold && distanceY < threshold) {
        context.lineWidth = (threshold * 2 - (distanceX + distanceY)) / 50;
        let color = 200 - Math.floor(distanceX + distanceY);
        context.strokeStyle = "#F90716";
        line(particle, particle2);
      }
    }

    particle.x = (particle.x + particle.vx + canvas.width) % canvas.width;
    particle.y = (particle.y + particle.vy + canvas.height) % canvas.height;
  }

  animationId = requestAnimationFrame(animate); // Store the animation frame request ID
}

// Function to show a loading screen
function showLoadingScreen() {
  isLoading = true;

  // Customize your loading screen here (e.g., display a spinner)
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = "24px Arial";
  context.fillStyle = "white";
  context.fillText("Loading...", canvas.width / 2 - 40, canvas.height / 2);

  // Delay for 2-3 seconds before redirecting to the registration page
  setTimeout(function () {
    isLoading = false;
    window.location.href = "register.html";
  }, 2000); // 2000 milliseconds = 2 seconds
}

// Initialize particles and start the animation
for (let i = 0; i < maxParticles; i++) {
  let particle = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
  };
  particles.push(particle);
}

context.fillStyle = "blue"; // Set the fill color for particles
animate();

// main.js
