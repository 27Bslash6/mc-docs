# fnord.lol Minecraft Docs

Documentation site for the fnord.lol Minecraft servers.

## Local Development

```bash
# Install zensical
pip install zensical

# Serve locally
zensical serve

# Build
zensical build
```

## Deployment

Deployed via Cloudflare Pages:
- **URL**: https://docs.fnord.lol/mc
- **Build command**: `pip install zensical && zensical build`
- **Output directory**: `site`

## Structure

```
docs/
├── index.md              # Homepage
├── connect.md            # Connection guide
├── rules.md              # Server rules
├── faq.md                # FAQ
├── servers/              # Server-specific pages
│   ├── idk.md
│   ├── pixelmon.md
│   ├── quiet-place.md
│   └── zombie-invade.md
├── mods/                 # Mod documentation (idk server)
│   ├── flan.md
│   ├── graves.md
│   └── ...
└── tools/
    └── bluemap.md
```
