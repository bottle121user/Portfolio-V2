import os
from PIL import Image

f = 'retro_ground_bg.png'
try:
    img = Image.open(f).convert('RGBA')
    new_img = Image.new('RGBA', (img.width * 2, img.height))
    new_img.paste(img, (0, 0))
    new_img.paste(img.transpose(Image.FLIP_LEFT_RIGHT), (img.width, 0))
    new_img.save(f)
    print("Successfully processed seamless mirror for", f)
except Exception as e:
    print("Error on", f, e)
