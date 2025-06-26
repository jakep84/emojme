import os
from PIL import Image

# Define input and output folders
INPUT_FOLDER = "input_images"
OUTPUT_FOLDER = "converted_images"
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# Define required sizes and labels
REQUIREMENTS = {
    "screenshot_1280x800": (1280, 800),
    "screenshot_640x400": (640, 400),
    "promo_tile_440x280": (440, 280),
    "marquee_tile_1400x560": (1400, 560),
}

def resize_and_convert_images():
    for filename in os.listdir(INPUT_FOLDER):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            path = os.path.join(INPUT_FOLDER, filename)
            with Image.open(path) as img:
                img = img.convert("RGB")  # Ensures 24-bit no alpha
                base_name, _ = os.path.splitext(filename)

                for label, size in REQUIREMENTS.items():
                    resized = img.resize(size, Image.LANCZOS)
                    output_filename = f"{base_name}_{label}.jpg"
                    output_path = os.path.join(OUTPUT_FOLDER, output_filename)
                    resized.save(output_path, format="JPEG", quality=95)
                    print(f"Saved: {output_path}")

if __name__ == "__main__":
    resize_and_convert_images()
