import { canvas } from "./main.ts";
export default class Player {
  x: number;
  y: number;
  width: number;
  height: number;
  textures: number[];
  animationCycle: number;
  playerSurfaceRun1: number;
  playerImgJumpRun1: number;
  canvas: import("https://deno.land/x/sdl2@0.2-alpha.1/src/canvas.ts").Canvas;
  // 300, 50, 300, 300
  constructor() {
    this.x = 300;
    this.y = 50;
    this.width = 300;
    this.height = 300;
    this.canvas = canvas;
    this.animationCycle = 0;
    this.playerSurfaceRun1 = canvas.loadSurface("sprites/dino-run1.png");
    this.playerImgJumpRun1 = canvas.createTextureFromSurface(
      this.playerSurfaceRun1,
    );

    this.textures = [this.playerImgJumpRun1];
  }
  render() {
    this.animationCycle += 1;
    if (this.animationCycle >= 2) {
      this.animationCycle = 0;
    }
    const texture = this.y !== 100 - 28
      ? this.playerImgJumpRun1
      : this.textures[this.animationCycle];
    this.canvas.copy(
      texture,
      {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
      },
      {
        x: this.x,
        y: this.y,
        width: 42,
        height: 42,
      },
    );
  }
}
