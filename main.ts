import { Canvas } from "https://deno.land/x/sdl2@0.2-alpha.1/src/canvas.ts";
import Player from "./Player.ts";
const canvasWidth = 600;
const canvasHeight = 150;

/** Game window */
export const canvas = new Canvas({
  title: "player",
  height: canvasHeight,
  width: canvasWidth,
  centered: true,
  fullscreen: false,
  hidden: false,
  resizable: false,
  minimized: false,
  maximized: false,
  flags: null,
});

// Key press handlers
let isSpace = false;
// Other handlers
const gameOver = false;
let intro = true;
let playing = false;
const gravity = 1;
let score = 0;
function gameLoop() {
  canvas.setDrawColor(255, 255, 255, 255);

  canvas.present();
  canvas.clear();
  if (intro) {
    return;
  }
  const player = new Player();
  canvas.clear();

  // Check if space bar is pressed and player is on the ground.
  if (isSpace && player.y == 100 - 28) {
    player.y -= 70;
    isSpace = false;
    canvas.playMusic("./audio/jump.wav");
  } else {
    // Give player downwards acceleration
    player.y += gravity;
  }
  // Reset space state
  isSpace = false;
  if (player.y >= 100 - 28) {
    player.y = 100 - 28;
  }

  if (score >= 100) {
    return;
  }

  score += 0.2;

  canvas.present();
  Deno.sleepSync(60);
}

// Basic Intro Screen

// Update the screen
canvas.present();

for await (const event of canvas) {
  switch (event.type) {
    case "draw":
      gameLoop();
      break;
    case "quit":
      canvas.quit();
      break;
    case "key_down":
      // Space
      if (event.keycode == 32 && !gameOver) {
        intro = false;
        if (!playing) {
          playing = true;
          canvas.playMusic("./audio/click.wav");
        }
        if (!isSpace) isSpace = true;
      }
      break;
    case "mouse_button_down":
      // Left click
      if (event.button == 1 && !gameOver) {
        intro = false;
        if (!isSpace) isSpace = true;
      }
      break;
    default:
      break;
  }
}
