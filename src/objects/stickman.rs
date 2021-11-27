use sdl2::render::Canvas;
use sdl2::rect::Rect;
use sdl2::video::Window;
use sdl2::surface::Surface;

pub struct Stickman {
    pub x: i32,
    pub y: i32,
    pub width: u32,
    pub height: u32,
}

impl Stickman {
    pub fn render(&mut self, canvas: &mut Canvas<Window>) {
        let stickman_surface: Surface = sdl2::image::LoadSurface::from_file("./sprites/dino.png").unwrap();
        let texture = canvas.create_texture_from_surface(stickman_surface).unwrap();
        canvas.copy(&texture, Rect::new(0, 0, self.width, self.height), Rect::new(self.x, self.y, 42, 42)).unwrap();
    }
}
