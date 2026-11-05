#!/usr/bin/env python3
"""Remplace les liens Cloudinary / Vercel Blob du code par les fichiers locaux de public/media."""
import re, json, glob, unicodedata, urllib.parse
BLOB = "https://jry6nc0w67kepqum.public.blob.vercel-storage.com"
CLD = r"https://res\.cloudinary\.com/dg6xo2xwb/[^\"'` )]+"
M = json.load(open("media-originaux/correspondances.json"))
nfc = lambda s: unicodedata.normalize("NFC", s)
L = "/media/partenaires/logos/"
LOGO_FT = "/media/logo/ft-monogramme-noir.png"
A_FOURNIR = "// À FOURNIR (image manquante) : "

def blob_local(m):
    p = nfc(urllib.parse.unquote(m.group(1)))
    if p == "favicon.ico": return LOGO_FT
    if p.endswith(".mp4"): return "/media/video/accueil.mp4"
    return M[p]

def sub_lines(text, rules):
    out = []
    for line in text.split("\n"):
        for pat, action in rules:
            if re.search(pat, line):
                line = action(line) if callable(action) else action
                break
        out.append(line)
    return "\n".join(out)

def set_url(new):  # remplace l'URL distante de la ligne par `new`
    return lambda l: re.sub(re.escape(BLOB) + r"/[^\"'` )]+|" + CLD, new, l)
def hide(label):   # commente la ligne (élément masqué jusqu'à ce que l'image soit fournie)
    return lambda l: re.match(r"\s*", l).group(0) + A_FOURNIR + label + " — " + l.strip()

edits = {
 "app/page.tsx": [
  (r'name: "NBA",\s+src:', set_url(L+"nba.png")), (r'name: "FIBA",\s+src:', set_url(L+"fiba.png")),
  (r'name: "Winamax", src:', set_url(L+"winamax.png")), (r'name: "Acast"', set_url(L+"acast.png")),
  (r'name: "Influx"', set_url(L+"influx.svg")),
  (r'name: "NBA",\s+color', set_url(L+"nba.png")), (r'name: "FIBA",\s+color', set_url(L+"fiba.png")),
  (r'name: "Winamax", color', set_url(L+"winamax.png")),
  (r'sdm_uvvffd', lambda l: set_url("/media/contenus/invites/domenech.jpg")(l).replace("SDM, invité Offense", "Raymond Domenech, invité Offense")),
  (r'domenec_gveuih', lambda l: set_url("/media/contenus/invites/riolo.jpg")(l).replace("Domenech, invité Offense", "Daniel Riolo, invité Offense")),
  (r'edgar_docp8b', lambda l: set_url("/media/contenus/invites/nadeau.jpg")(l).replace("Edgar Yves, invité Offense", "Nadeau, invité Offense")),
  (r'3 invités — SDM, Domenech, Edgar Yves', lambda l: l.replace("SDM, Domenech, Edgar Yves", "Domenech, Riolo, Nadeau")),
  (r'<source src=.*accueil|<source src=.*vercel-storage.*mp4', lambda l: l),
 ],
 "app/contenus/page.tsx": [
  (r'riolo_vou7zx', set_url("/media/contenus/invites/riolo.jpg")), (r'nadeau_imbqe2', set_url("/media/contenus/invites/nadeau.jpg")),
  (r'cazarre_wzqrqr', set_url("/media/contenus/invites/cazarre.jpg")), (r'domenec_gveuih', set_url("/media/contenus/invites/domenech.jpg")),
  (r'couvr_uggpfy', set_url("/media/contenus/invites/couvreur.jpg")),
  (r'sdm_uvvffd', hide("photo SDM")), (r'edgar_docp8b', hide("photo Edgar Yves")), (r'christ_myrvu2', hide("photo Lemaître")),
  (r'jjs_xl7u1c', hide("photo Jean Jass")), (r'margo_sgmruu', hide("photo Margotton")), (r'mehdi_r9lyx3', hide("photo Maizi")),
  (r'gillian_zptifi', hide("photo Gillian")),
  (r'LIBRE_ANTENNE_-_PROGRAMME', set_url("/media/contenus/programmes/libreantenne.jpg")),
  (r'FDS_-_PROGRAMME', set_url("/media/contenus/programmes/firstdayshow.jpg")),
  (r'ENTRETIEN_-_PROGRAMME', set_url("/media/contenus/programmes/entretien.jpg")),
  (r'REPLAY_mumiie', hide("visuel REPLAY")), (r'CLUTCH_-_PROGRAMME', hide("visuel CLUTCH")),
 ],
 "app/partenaires/page.tsx": [
  (r'logo: .*PARTENAIRES/NBA', set_url(L+"nba.png")), (r'logo: .*PARTENAIRES/FIBA', set_url(L+"fiba.png")),
  (r'logo: .*PARTENAIRES/WINAMAX', set_url(L+"winamax.png")),
  (r'Trade_Republic_logo', set_url(L+"trade-republic.png")),
  (r'name: "(Nike|Adidas|PUMA|2K|FitnessPark|Airbnb|Allianz|DAZN)"', lambda l: hide("logo " + re.search(r'name: "([^"]+)"', l).group(1))(l)),
 ],
}
files = [f for f in glob.glob("app/**/*.tsx", recursive=True) + glob.glob("components/**/*.tsx", recursive=True) if "_archived" not in f]
for f in files:
    t0 = t = open(f).read()
    t = sub_lines(t, edits.get(f, []))
    t = re.sub(re.escape(BLOB) + r"/([^\"'` )]+)", blob_local, t)
    if f == "app/qui-nous-sommes/page.tsx":
        t = re.sub(r"`\$\{EQ\}/([^`]+)`", lambda m: '"' + M["L'ÉQUIPE/" + m.group(1)] + '"', t)
        t = re.sub(r'const BLOB = .*\n', "", t); t = re.sub(r"const EQ\s+= .*\n", "", t)
    if t != t0:
        open(f, "w").write(t); print("modifié :", f)
