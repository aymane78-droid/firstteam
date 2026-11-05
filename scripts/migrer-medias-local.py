#!/usr/bin/env python3
"""Migration ponctuelle : remplace les liens Vercel Blob / Cloudinary par des fichiers locaux dans public/media.
Les originaux sont dans media-originaux/ (non publié)."""
import re, os, glob, subprocess, unicodedata, urllib.parse, json

BLOB = "https://jry6nc0w67kepqum.public.blob.vercel-storage.com"
OPT = "scripts/optimiser-image.py"
FOLDER = {"HOME": "accueil", "CONTENUS": "contenus", "SHOP": "shop", "PARTENAIRES": "partenaires", "L'ÉQUIPE": "equipe"}
nfc = lambda s: unicodedata.normalize("NFC", s)

def slug(name):
    name = nfc(name)
    name = unicodedata.normalize("NFD", name).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9/]+", "-", name.lower()).strip("-")

def optimise(src, dest_noext, size=2400):
    os.makedirs(os.path.dirname(dest_noext), exist_ok=True)
    out = subprocess.check_output(["python3", OPT, src, dest_noext, str(size)], text=True).strip()
    return "/" + out[len("public/"):]

files = [f for f in glob.glob("app/**/*.tsx", recursive=True) + glob.glob("components/**/*.tsx", recursive=True)
         if "_archived" not in f and "first-team-site.jsx" not in f]
mapping = {}

# 1) fichiers Vercel Blob référencés (URL complète ou via ${EQ}/...)
refs = set()
for f in files:
    t = open(f).read()
    for u in re.findall(re.escape(BLOB) + r"/([^\"'` )]+)", t):
        refs.add(nfc(urllib.parse.unquote(u)))
    for u in re.findall(r"\$\{EQ\}/([^\"'` )]+)", t):
        refs.add("L'ÉQUIPE/" + u)
for p in sorted(refs):
    if p in ("favicon.ico",) or p.endswith(".mp4"):
        continue
    top, rest = p.split("/", 1)
    dest = "public/media/" + FOLDER[top] + "/" + slug(os.path.splitext(rest)[0])
    mapping[p] = optimise("media-originaux/blob/" + p, dest)
    print(p, "->", mapping[p])
json.dump(mapping, open("media-originaux/correspondances.json", "w"), ensure_ascii=False, indent=1)
