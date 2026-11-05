#!/usr/bin/env python3
"""Optimise une image pour le web sans perte de qualité visible.

Usage : python3 scripts/optimiser-image.py <original> <destination_sans_extension> [taille_max]
- Réduit le plus grand côté à taille_max pixels (2400 par défaut), jamais d'agrandissement.
- Photo (pas de transparence) -> JPEG qualité 85, progressif.
- Image avec transparence (logos) -> PNG optimisé.
Affiche le chemin du fichier créé.
"""
import os
import sys
from PIL import Image, ImageOps

src, dest = sys.argv[1], sys.argv[2]
os.makedirs(os.path.dirname(dest) or ".", exist_ok=True)
max_side = int(sys.argv[3]) if len(sys.argv) > 3 else 2400

im = Image.open(src)
im = ImageOps.exif_transpose(im)
has_alpha = im.mode in ("RGBA", "LA", "P") and im.convert("RGBA").getchannel("A").getextrema()[0] < 255
if max(im.size) > max_side:
    im.thumbnail((max_side, max_side), Image.LANCZOS)

if has_alpha:
    out = dest + ".png"
    im.convert("RGBA").save(out, "PNG", optimize=True)
else:
    out = dest + ".jpg"
    im.convert("RGB").save(out, "JPEG", quality=85, progressive=True, optimize=True, subsampling=0)
print(out)
