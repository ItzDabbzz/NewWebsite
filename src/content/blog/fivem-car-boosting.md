---
title: FiveM Vehicle Bump Speed Boost Fix
publishDate: 2024-03-02 00:00:00
img: /assets/fivem.png
img_alt: FiveM by CFX
description: |
  A guide to fix FiveM Vehicle Bump Speed Boost
tags:
  - Guide
  - Blog
  - Lua
  - FiveM
  - Coding
---

### Call this code when someone enters a vehicle:

```lua
local OR, XOR, AND = 1, 3, 4
local function bitOper(flag, checkFor, oper)
    local result, mask, sum = 0, 2 ^ 31
    repeat
        sum, flag, checkFor = flag + checkFor + mask, flag % mask, checkFor % mask
        result, mask = result + mask * oper % (sum - flag - checkFor), mask / 2
    until mask < 1
    return result
end

local function addDownforceFlag(vehicle)
    local adv_flags = GetVehicleHandlingInt(vehicle, 'CCarHandlingData', 'strAdvancedFlags')
    local hasDownforceFlag = bitOper(adv_flags, 134217728, AND) == 134217728

    -- Remove flags 512 and 2048 if present
    if not hasDownforceFlag then
        adv_flags = bitOper(adv_flags, 134217728, OR)
    end

    local newFlags = math.floor(adv_flags)
    SetVehicleHandlingField(vehicle, 'CCarHandlingData', 'strAdvancedFlags', newFlags)

end
```

This is code that will add the `strAdvancedFlags` flag `CF_USE_DOWNFORCE_BIAS`. This is defined as:

> Changes the way Downforce and spoiler tuning works, uses the setup found on Open-Wheel class vehicles in the vanilla game. Each spoiler/bumper tuning has to be given AdvancedData values to affect downforce. Adjusts initial downforce from fDownforceModifier. 'Curb - boosting' seems to be nullified. Previously known as `_AF_DOWNFORCE_KERBFIX`

**IMPORTANT** All vehicles must have the `CCarHandlingData` field already defined or else FiveM will NOT be able to set the advanced flags. You do not have to define the `strAdvancedFlags` field just `CCarHandlingData`:

```xml
<Item type="CCarHandlingData"> </Item>
```

Or if it doesn't have sub-handling:

```xml
<SubHandlingData>
	<Item type="CCarHandlingData"></Item>
</SubHandlingData>```