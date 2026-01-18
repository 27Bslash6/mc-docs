# FLAN - Land Claiming

Protect your builds from griefers by claiming land.

## Quick Start

1. Get a **golden hoe** (craft or find one)
2. Right-click one corner of your claim
3. Right-click the opposite corner
4. Done! Your land is protected

## Commands

| Command | What It Does |
|---------|--------------|
| `/flan menu` | Open the claim management menu |
| `/flan list` | List all your claims |
| `/flan trapped` | Teleport out if stuck in someone's claim |

## Managing Permissions

Stand in your claim and run `/flan menu` to:

- **Edit Global Permissions** - What everyone can do
- **Edit Group Permissions** - Create groups with different access
- **Add Players to Groups** - Give friends more access

### Common Permission Settings

| Permission | Controls |
|------------|----------|
| `DOOR` | Opening doors, trapdoors, gates |
| `OPENCONTAINER` | Opening chests, barrels, shulkers |
| `BREAKBLOCK` | Breaking blocks |
| `PLACEBLOCK` | Placing blocks |
| `INTERACTBLOCK` | Buttons, levers, pressure plates |

### Example: Let Friends Open Doors but Not Chests

1. `/flan menu` while standing in your claim
2. Go to **Global Permissions**
3. Set `DOOR` to **true**
4. Set `OPENCONTAINER` to **false**

## Claim Blocks

You earn claim blocks by playing. Check your balance with `/flan menu`.

- Claims extend **10 blocks down** by default
- Bigger claims = more claim blocks needed

## Tips

- **Claim your base first** - Before building anything valuable
- **Check the map** - Claims show on [map.fnord.lol](https://map.fnord.lol)
- **Subclaims** - Create areas within your claim with different permissions
- **Trust wisely** - Only add players you actually trust to groups

!!! warning "Claims Don't Protect Against"
    - Explosions (TNT, creepers) if mobs can enter
    - Fire spread from outside the claim
    - You accidentally breaking your own stuff
