# Mods Overview (idk Server)

The **idk** server runs quality-of-life mods. They're all **server-side** - you don't need to install anything, but we recommend a performance modpack for the best experience.

## Recommended: Fabulously Optimized

For the best performance, install **Fabulously Optimized** via Prism Launcher:

1. Download [Prism Launcher](https://prismlauncher.org/download/)
2. Click **Add Instance** → **Modrinth** tab
3. Search for **Fabulously Optimized**
4. Select the **1.21.1** version
5. Click **OK** to install

This gives you:

- Better FPS (Sodium, Lithium, etc.)
- Zoom feature (like OptiFine)
- Shader support
- All vanilla-compatible

## Server Mods (Full List)

### Gameplay Mods

| Mod | Version | What It Does |
|-----|---------|--------------|
| [**FLAN**](flan.md) | 1.12.5 | Claim and protect your land |
| [**Universal Graves**](graves.md) | 3.10.2 | Your items stay safe when you die |
| [**FallingTree**](fallingtree.md) | 1.21.11.2 | Chop one log, fell the whole tree |
| [**JEI**](jei.md) | 27.4.0.15 | View crafting recipes in-game |
| [**SleepPoll**](sleeppoll.md) | 2.0.2 | Vote to skip the night |

### World & Rendering

| Mod | Version | What It Does |
|-----|---------|--------------|
| **BlueMap** | 5.15 | 3D world map at [map.fnord.lol](https://map.fnord.lol) |
| **Distant Horizons** | 2.4.5-b | See terrain beyond render distance (LOD) |

### Cross-Platform

| Mod | Version | What It Does |
|-----|---------|--------------|
| **Geyser** | 2.9.2 | Lets Bedrock players join |
| **Floodgate** | 2.2.6 | Bedrock auth (no Java account needed) |

### Infrastructure

| Mod | Version | What It Does |
|-----|---------|--------------|
| **Fabric API** | 0.140.2 | Core mod framework |
| **Polymer** | 0.15.1 | Server-side rendering for vanilla clients |
| **Fabric Language Kotlin** | 1.13.8 | Kotlin support for mods |
| **Chunky** | 1.4.55 | World pregenerator (admin use) |
| **Backup Always Right** | 1.0.2 | Automated backups |

## How Server-Side Mods Work

These mods run on the server, not your computer. They use clever tricks to work with vanilla Minecraft:

- **FLAN** uses a golden hoe and chat messages for claiming
- **Graves** renders as an armor stand that looks like a gravestone
- **JEI** sends recipe data through the vanilla recipe book
- **Polymer** translates mod content into vanilla-compatible packets

This means:

- No mandatory downloads
- Works with vanilla Java Edition
- Works with Bedrock Edition (via Geyser)
- Always up to date (server controls the version)

!!! tip "Better Performance"
    While vanilla works, **Fabulously Optimized** significantly improves FPS and adds quality-of-life features like zoom. Highly recommended!
