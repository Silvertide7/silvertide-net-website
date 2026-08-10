## 2026-08-10 — Mortal Boons landing page + datapack builder

Scope: src/pages/MortalBoons.tsx, src/pages/MortalBoonsBuilder.tsx, src/features/mortalBoonsBuilder/
(5 files), wiring diffs (App.tsx, Breadcrumb.tsx, ModNav.tsx, Home.tsx), public/mortal-boons/ (13 images).
Reviewers: self-audit + 2 independent agents (builder correctness, landing page/wiring).

Acceptance: builder output matches the mod's codecs — PASS (all 19 field names cross-checked against
the mod's Java source; operation enum, item/tag nesting, tier list shapes verified)
Acceptance: datapack zip correct — PASS (executed in Node: pack_format 48, folder layout, JSON content
round-tripped and verified; partial per-tier lists fill correctly: weights->0, multipliers->1.0)
Acceptance: pages match site conventions — PASS (layout constants identical to Kindred; helpers produce
identical markup; no em dashes; all image paths verified both directions)
Build/runtime: tsc -b, eslint, vite build all pass; forms exercised live in the browser (boon, sign,
offering all saved and previewed correctly).

### Fixed during audit
- [x] BLOCKER output.ts [both] — per-tier ability levels filled blanks with 0 (invalid level; tooltip and
      mod default say 1) -> fallback now 1, and level_tiers validation floor raised 0 -> 1
- [x] BLOCKER MortalBoonsBuilderForm/useSavedItems [reviewer] — saved-entry key omitted namespace, so
      same-named entries in two namespaces overwrote each other, and a namespace-only edit + Save silently
      no-opped -> key is now namespace/type/slug, which fixes both
- [x] BLOCKER TierInputs [reviewer] — tier-field validation errors were never rendered, so bad input
      (negative weight, decimal int) showed nothing and flowed into output -> TierInputs now renders the
      first error and flags invalid inputs, wired at all four call sites
- [x] SHOULD fieldConfig [reviewer] — count validated only >= 1 but the mod codec is intRange(1, 64) ->
      max 64 enforced
- [x] SHOULD fieldConfig/form [reviewer] — icon was unvalidated and its error never displayed though the
      mod parses it as a ResourceLocation -> validated + error wired
- [x] SHOULD form [reviewer] — Save/download accepted an invalid namespace (e.g. "My Pack"), producing a
      zip Minecraft rejects -> canSave now requires a valid namespace
- [x] SHOULD doLoad [reviewer] — localStorage entries from an older schema could crash toCleanOutput on
      load -> loaded values merge over defaultValues
- [x] SHOULD MortalBoons.tsx [reviewer] — sign colors were parchment-tuned hexes, near-invisible on the
      dark theme -> per-sign dark variants via CSS variables
- [x] NIT — aria-current on mobile tab bar; "boon_types" parenthetical in Datapacks tab; min_tier dead
      enum value '1' removed; unexported unused type exports; step="1" on the single weight input;
      RESOURCE_LOCATION path regex now allows hyphens
### Accepted, not fixed (reasons)
- onCopyValues (duplicate-from) dropped vs the alchemical sibling: intentional, marginal feature.
- "rogue-like" spelling: matches the author's own CurseForge blurb.
- BulletList index keys: static lists that never reorder.
- 'datapack-builder' breadcrumb label is a global segment label: same pattern as 'ingredient-builder'.
- as-never register casts: same pattern StringListInput itself uses.
- CurseForge slug /mortal-boons unconfirmed until the project page is public: flagged to the author.

Delete list: none remaining.
Test gaps: no test runner in this repo (per repo convention); zip generation covered by a one-off Node
round-trip run, not a committed test.
Verdict: ready.
