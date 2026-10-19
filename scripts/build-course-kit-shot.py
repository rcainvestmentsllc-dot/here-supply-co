"""
The Carry It Well kit shot: the course book cover with a writing page and
three printed sheets fanned around it, on the brand's dark teal.

    python3 scripts/build-course-kit-shot.py

Needs pdftoppm (poppler) and Pillow. Writes public/assets/men/mens-edition-kit.jpg
(the file name predates the course name; pages reference it as is).
"""
import pathlib, subprocess, tempfile
from PIL import Image, ImageFilter

ROOT = pathlib.Path(__file__).resolve().parents[1]
BOOK = ROOT / "public/downloads/men/carry-it-well-course-book.pdf"
SHEETS = ROOT / "public/downloads/men/sheets"
OUT = ROOT / "public/assets/men/mens-edition-kit.jpg"
W, H = 1672, 941
BG = (47, 79, 90)


def render(pdf, page, width):
    with tempfile.TemporaryDirectory() as tmp:
        base = pathlib.Path(tmp) / "p"
        subprocess.run(["pdftoppm", "-f", str(page), "-l", str(page), "-r", "110", "-png", "-singlefile", str(pdf), str(base)], check=True)
        im = Image.open(str(base) + ".png").convert("RGB")
    h = round(im.height * width / im.width)
    return im.resize((width, h), Image.LANCZOS)


def place(canvas, im, cx, cy, angle):
    rgba = im.convert("RGBA")
    rot = rgba.rotate(angle, resample=Image.BICUBIC, expand=True)
    pad = 60
    mask = Image.new("L", (rot.width + 2 * pad, rot.height + 2 * pad), 0)
    mask.paste(rot.split()[3].point(lambda a: 70 if a else 0), (pad, pad))
    mask = mask.filter(ImageFilter.GaussianBlur(24))
    shadow = Image.new("RGBA", mask.size, (0, 0, 0, 0))
    shadow.putalpha(mask)
    x, y = int(cx - rot.width / 2), int(cy - rot.height / 2)
    canvas.alpha_composite(shadow, (x - pad + 6, y - pad + 12)) if x - pad + 6 >= 0 and y - pad + 12 >= 0 else _paste(canvas, shadow, x - pad + 6, y - pad + 12)
    canvas.alpha_composite(rot, (x, y))


def _paste(canvas, layer, x, y):
    """alpha_composite refuses negative offsets; crop the layer instead."""
    cx, cy = max(0, -x), max(0, -y)
    canvas.alpha_composite(layer.crop((cx, cy, layer.width, layer.height)), (max(0, x), max(0, y)))


def main():
    canvas = Image.new("RGBA", (W, H), BG + (255,))
    place(canvas, render(BOOK, 13, 420), 360, 520, 4)          # a writing page, left
    place(canvas, render(SHEETS / "honest-map.pdf", 1, 400), 1480, 470, -4)
    place(canvas, render(SHEETS / "the-solo.pdf", 1, 420), 1260, 440, 3)
    place(canvas, render(BOOK, 1, 560), 820, 470, 0)            # the cover, center
    place(canvas, render(SHEETS / "short-fuse.pdf", 1, 380), 1300, 760, -12)
    canvas.convert("RGB").save(OUT, quality=86, optimize=True, progressive=True)
    print(OUT)


if __name__ == "__main__":
    main()
