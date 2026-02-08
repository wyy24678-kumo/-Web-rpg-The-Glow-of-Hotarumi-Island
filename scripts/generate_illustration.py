from PIL import Image, ImageDraw, ImageFilter
import random

def create_pixel_art_scene():
    # Canvas setup (Base resolution 320x180 for pixel look, scaled up later)
    width, height = 320, 180
    img = Image.new('RGB', (width, height), "#87CEEB")
    draw = ImageDraw.Draw(img)

    # --- Palette ---
    SKY_TOP = (100, 149, 237)
    SKY_BOTTOM = (176, 224, 230)
    GRASS_DARK = (34, 139, 34)
    GRASS_LIGHT = (50, 205, 50)
    PATH_COLOR = (210, 180, 140)
    WOOD_DARK = (101, 67, 33)
    WOOD_LIGHT = (139, 69, 19)
    CLOAK_BROWN = (139, 69, 19)
    HAIR_SILVER = (220, 220, 220)
    METAL_GREY = (169, 169, 169)
    
    # 1. Sky Gradient
    for y in range(height):
        r = int(SKY_TOP[0] + (SKY_BOTTOM[0] - SKY_TOP[0]) * y / (height * 0.7))
        g = int(SKY_TOP[1] + (SKY_BOTTOM[1] - SKY_TOP[1]) * y / (height * 0.7))
        b = int(SKY_TOP[2] + (SKY_BOTTOM[2] - SKY_TOP[2]) * y / (height * 0.7))
        if y < height * 0.7:
            draw.line([(0, y), (width, y)], fill=(r, g, b))
        else:
            # Prepare for ground
            pass

    # 2. Distant Mountains (Silhouette)
    draw.polygon([(0, 120), (50, 80), (100, 120)], fill=(70, 130, 180))
    draw.polygon([(60, 120), (140, 60), (220, 120)], fill=(65, 105, 225))
    draw.polygon([(180, 120), (280, 70), (320, 110), (320, 120)], fill=(100, 149, 237))

    # 3. Ground (Grass)
    for y in range(int(height * 0.6), height):
        draw.line([(0, y), (width, y)], fill=GRASS_DARK)
        # Add texture
        for _ in range(10):
            x = random.randint(0, width)
            draw.point((x, y), fill=GRASS_LIGHT)

    # 4. Path (Winding)
    # Simple perspective path
    path_points = [
        (width // 2 + 20, height),       # Bottom Right
        (width // 2 - 20, height),       # Bottom Left
        (width // 2 - 50, height // 2 + 40), # Mid Left
        (width // 2 - 30, height // 2 + 40), # Mid Right
    ]
    draw.polygon(path_points, fill=PATH_COLOR)

    # 5. The Cabin (Home) - Back left distance
    cabin_x, cabin_y = 60, 90
    # Walls
    draw.rectangle([cabin_x, cabin_y, cabin_x + 40, cabin_y + 30], fill=WOOD_DARK)
    # Roof
    draw.polygon([(cabin_x - 5, cabin_y), (cabin_x + 20, cabin_y - 20), (cabin_x + 45, cabin_y)], fill=WOOD_LIGHT)
    # Door
    draw.rectangle([cabin_x + 15, cabin_y + 15, cabin_x + 25, cabin_y + 30], fill=(50, 30, 10))

    # 6. The Character (Swordsman) - Foreground, back facing
    char_x, char_y = width // 2, height - 40
    
    # Legs
    draw.rectangle([char_x - 6, char_y + 20, char_x - 2, char_y + 40], fill=(50, 50, 50))
    draw.rectangle([char_x + 2, char_y + 20, char_x + 6, char_y + 40], fill=(50, 50, 50))
    
    # Body/Cloak
    draw.polygon([
        (char_x - 12, char_y + 30), # Bottom Left Cloak
        (char_x + 12, char_y + 30), # Bottom Right Cloak
        (char_x + 8, char_y),       # Shoulder Right
        (char_x - 8, char_y)        # Shoulder Left
    ], fill=CLOAK_BROWN)
    
    # Head (Silver Hair)
    draw.ellipse([char_x - 6, char_y - 12, char_x + 6, char_y], fill=HAIR_SILVER)
    
    # Sword (Left Hand) - Sheathed on back or in hand? "Left hand holding sword"
    # Blade
    draw.line([(char_x - 12, char_y + 10), (char_x - 20, char_y + 25)], fill=METAL_GREY, width=2)
    # Hilt
    draw.line([(char_x - 12, char_y + 10), (char_x - 10, char_y + 8)], fill="gold", width=2)

    # Shield (Right Hand) - On back or held? "Right hand holding shield"
    draw.ellipse([char_x + 8, char_y + 10, char_x + 24, char_y + 30], fill=METAL_GREY, outline="silver")

    # 7. Sunlight / God Rays
    # Use a separate layer for blending
    overlay = Image.new('RGBA', (width, height), (0,0,0,0))
    o_draw = ImageDraw.Draw(overlay)
    
    # Sun position (Top Right)
    sun_x, sun_y = width - 40, 30
    o_draw.ellipse([sun_x-10, sun_y-10, sun_x+10, sun_y+10], fill=(255, 255, 224, 200))
    
    # Rays
    for i in range(0, 100, 20):
        o_draw.polygon([
            (sun_x, sun_y), 
            (sun_x - 200 + i, height), 
            (sun_x - 150 + i, height)
        ], fill=(255, 255, 255, 30))

    # Composite
    img.paste(overlay, (0,0), overlay)

    # 8. Upscale to 1920x1080 (Sharp pixel look)
    # 320x180 * 6 = 1920x1080
    final_img = img.resize((1920, 1080), resample=Image.NEAREST)
    
    # Save
    final_img.save("assets/images/scene_illustration.png")
    print("Illustration generated: assets/images/scene_illustration.png")

if __name__ == "__main__":
    create_pixel_art_scene()
