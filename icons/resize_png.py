from PIL import Image

def resize_png(input_path, output_path="resized.png", size=(128, 128)):
    img = Image.open(input_path)
    img = img.convert("RGBA")  
    img = img.resize(size, Image.Resampling.LANCZOS)  
    img.save(output_path)
    print(f"Saved resized image to {output_path}")


resize_png("icon.png", "icon128.png")
