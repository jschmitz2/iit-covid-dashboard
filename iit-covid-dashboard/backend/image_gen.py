import PIL
from PIL import Image, ImageDraw, ImageFont
import os
def gen_number_image(value, text):
    antialias_mult = 2
    clarity_mult = 2

    x_res = 800 * clarity_mult * antialias_mult
    y_res = 460 * clarity_mult * antialias_mult

    other_files = os.listdir()
    filename = f'.\\images\\{value}_{text}.png'
    if filename in other_files:
        return os.getcwd() + "\\" + filename

    img = Image.new('RGB', (x_res, y_res), color = (40, 40, 40))

    fnt_title = ImageFont.truetype("HelveticaNeue.ttf", 150 * clarity_mult * antialias_mult)
    fnt_subtitle = ImageFont.truetype("HelveticaNeue.ttf", 60 * clarity_mult * antialias_mult)
    fnt_text = ImageFont.truetype("HelveticaNeue.ttf", 30 * clarity_mult * antialias_mult)

    d = ImageDraw.Draw(img)

    written_text = str(value)

    heading_text_size = d.textsize(
        written_text,
        fnt_title
    )

    heading_x_start = x_res / 2 - heading_text_size[0] / 2
    heading_y_start = y_res / 3 - heading_text_size[1] / 2

    d.text(
        (heading_x_start, heading_y_start),
        str(value),
        align="center",
        font=fnt_title,
        fill=(255, 255, 255)
    )

    subheading, text = text.split("|")

    subheading_text_size = d.textsize(
        subheading,
        fnt_subtitle
    )

    subheading_x_start = x_res / 2 - subheading_text_size[0] / 2
    subheading_y_start = y_res * .6

    d.text(
        (subheading_x_start, subheading_y_start - 100),
        subheading,
        align="center",
        font=fnt_subtitle,
        fill=(255,255,255)
    )

    text_text_size = d.textsize(
        text,
        fnt_text
    )

    text_x_start = x_res / 2 - text_text_size[0]/2
    text_y_start = y_res * .75

    d.text(
        (text_x_start, text_y_start),
        text,
        align="center",
        font=fnt_text,
        fill=(255,255,255)
    )

    img_resized = img.resize((int(x_res / antialias_mult), int(y_res / antialias_mult)), 2)

    output = open(("./images/" + filename), "wb")
    img.save(output, format="png")
    output.close()

    # HACK
    return os.getcwd() + "/images/" + filename
