import os
from PIL import Image

f = 'vehicles_sheet.png'
try:
    img = Image.open(f).convert('RGBA')
    datas = img.getdata()
    
    new_data = []
    for item in datas:
        # Remove anything resembling the neon green background
        if item[0] < 50 and item[1] > 200 and item[2] < 50:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(f)
    print("Successfully stripped green background from", f)
except Exception as e:
    print("Error on", f, e)
