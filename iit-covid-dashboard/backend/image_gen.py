import PIL
from PIL import Image, ImageDraw, ImageFont
import os

def gen_number_image(value, x_res=800, y_res=460, font_size=100):
    other_files = os.listdir()

    filename = f'{value}_{x_res}_{y_res}.png'

    if filename in other_files:
        return os.getcwd() + "\\" + output.name


    img = Image.new('RGB', (x_res, y_res), color = (40, 40, 40))

    fnt = ImageFont.truetype("HelveticaNeue.ttf", font_size)
    d = ImageDraw.Draw(img)

    written_text = str(value)

    text_size = d.textsize(
        written_text,
        fnt
    )

    x_start = x_res / 2 - text_size[0] / 2
    y_start = y_res / 3 - text_size[1] / 2

    d.text(
        (x_start, y_start),
        str(value),
        align="center",
        font=fnt,
        fill=(255, 255, 255)
    )


    output = open(("./images/" + filename), "wb")
    img.save(output, format="png")
    output.close()

    # HACK
    return os.getcwd() + "/images/" + filename

if __name__ == "__main__":
    print(os.getcwd())
    print(gen_number_image(10))
    gen_number_image(150)
