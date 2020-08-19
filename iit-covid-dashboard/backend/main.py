from fastapi import FastAPI
from fastapi.responses import FileResponse

import os

print(os.getcwd())


import image_gen

some_file_path = "large-video-file.mp4"
app = FastAPI()


@app.get("/number_image/{value}")
async def main(value: int):
    return FileResponse(image_gen.gen_number_image(value))