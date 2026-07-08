import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DownloadLinks } from '../components/DownloadLinks'
import { ToolLinkCard } from '../components/ToolLinkCard'
import { VerticalTabNav } from '../components/VerticalTabNav'

const IMG = {
  title: '/alchemical/minecraft_title_hd.png',
  logo: '/alchemical/elixir_logo_450.png',
  athanorRecipe: '/alchemical/Crafting_Table_Athanor_Recipe.png',
  elixirRecipe: '/alchemical/Crafting_Table_Elixir_Recipe.png',
  athanorEmpty: '/alchemical/Athanor_Menu_With_Empty_Elixir.png',
  bastionStoneSlot: '/alchemical/Athanor_Menu_With_Bastion_Stone_In_Add_Slot.png',
  elixir1Stone: '/alchemical/Athanore_Menu_Elixir_With_1_Stone.png',
  aqueousSolution: '/alchemical/Athanor_Menu_Aqueous_Solution_In_Add_Slot.png',
  infoIcon: '/alchemical/Athanor_Menu_Information_Icon_Popup.png',
  twoStones: '/alchemical/Athanor_Menu_With_2_Stones.png',
  fullElixir: '/alchemical/Athanor_Menu_With_2_Stones_In_It_Jump_Boost_2_Active.png',
  creativeMenu: '/alchemical/Creative_Menu_Default_Datapack_Items.png',
  tooltipNoShift: '/alchemical/Elixir_Inventory_Popup_With_No_Shift_Down.png',
  tooltipBastionSelected: '/alchemical/Elixir_Inventory_Popup_With_Shift_Down_Bastion_Stone_Selected.png',
  tooltipEmberSelected: '/alchemical/Elixir_Inventory_Popup_With_Shift_Down_Ember_Stone_Selected.png',
}

const Divider = () => <hr className="border-zinc-100 dark:border-zinc-600" />

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-600">
    {children}
  </code>
)

type Tab = 'overview' | 'getting-started' | 'configuration' | 'faq'

const TABS = [
  { id: 'overview' as const, label: 'Overview' },
  { id: 'getting-started' as const, label: 'Getting Started' },
  { id: 'configuration' as const, label: 'Configuration' },
  { id: 'faq' as const, label: 'FAQ' },
] satisfies readonly { id: Tab; label: string }[]

export const Alchemical = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <img
          src={IMG.title}
          alt="Alchemical"
          className="max-w-sm rounded-xl object-contain shadow-sm"
        />
      </div>

      <div className="relative">
        {/* Section nav: floats to the left on xl+ */}
        <div className="pointer-events-none absolute top-0 bottom-0 right-[calc(50%+26rem+1.5rem)] hidden w-[12rem] xl:block [&>*]:pointer-events-auto">
          <VerticalTabNav tabs={TABS} activeTab={activeTab} onSelect={setActiveTab} />
        </div>

      <div className="mx-auto xl:w-[52rem]">
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
          {/* Tab bar (mobile / < xl) */}
          <div className="flex gap-1.5 border-b border-zinc-100 bg-zinc-50 px-4 py-3 xl:hidden dark:border-zinc-600 dark:bg-zinc-800/40">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  activeTab === id
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                    : 'text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-600 dark:hover:text-zinc-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ── Overview ── */}
          {activeTab === 'overview' && (
            <div className="space-y-5 p-6">
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                Alchemical introduces a reusable elixir system inspired by real-world alchemy. Unlike
                vanilla potions, elixirs are never consumed: they are permanent flasks that you
                craft, fill with powerful alchemical ingredients, and drink over and over again. Each
                drink grants a prolonged potion effect based on the ingredients added, then places
                you on a cooldown before you can drink from any elixir again.
              </p>

              <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800/50 dark:bg-amber-950/20">
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                  The cooldown is shared across all elixirs.
                </p>
                <p className="mt-1 text-sm leading-relaxed text-amber-700 dark:text-amber-400">
                  Drinking from any elixir starts a single server-wide cooldown that locks every elixir you own. You cannot drink a second elixir to stack effects or chain them back-to-back. This is intentional: the cooldown is the primary balance lever, and it applies no matter how many flasks you carry.
                </p>
              </div>
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                The entire ingredient system is datapack-driven, meaning modpack makers and server
                operators can add, remove, or modify every ingredient and their effects without
                touching any code. A default datapack with 10 Essence Stones, 4 Tinctures, and 4
                Catalysts is included and enabled by default, but can be disabled or overridden on
                world creation.
              </p>

              {/* Ingredient Builder callout */}
              <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-600 dark:bg-zinc-600/30">
                <div className="space-y-0.5">
                  <p className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                    Ingredient Builder
                  </p>
                  <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                    Build Essence Stone, Tincture, and Catalyst JSON files visually, with live preview and datapack download.
                  </p>
                </div>
                <Link
                  to="/alchemical/ingredient-builder"
                  className="group inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                >
                  Open builder
                  <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
              </div>

              <div className="flex justify-center py-2">
                <img
                  src={IMG.logo}
                  alt="Alchemical elixir"
                  className="w-32 object-contain opacity-90"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  {
                    label: 'Craft',
                    desc: 'Build a permanent Elixir Flask and load it with Essence Stones, Tinctures, and Catalysts at the Athanor crafting station.',
                  },
                  {
                    label: 'Customize',
                    desc: 'Mix and match ingredients to tune effect level, duration, and cooldown. Switch between multiple loaded stones on the fly.',
                  },
                  {
                    label: 'Configure',
                    desc: 'Every ingredient is defined by a datapack JSON file. Add new effects, override defaults, or start from a blank slate.',
                  },
                ].map(({ label, desc }) => (
                  <div
                    key={label}
                    className="rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-600 dark:bg-zinc-600/30"
                  >
                    <p className="mb-1.5 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                      {label}
                    </p>
                    <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>

              <Divider />

              <div className="grid gap-2.5 sm:grid-cols-2">
                {[
                  'Elixirs are permanent reusable flasks; they are never consumed when drunk.',
                  'Load multiple Essence Stones into one elixir and switch the active effect with Shift + Use.',
                  'Tinctures and Catalysts stack multiplicatively for multipliers and additively for flat values and level boosts.',
                  'Configurable cooldown, elixir capacity, max stones, and Essence Stone break chance via server config.',
                  'Fully datapack-driven: every Essence Stone, Tincture, and Catalyst is a JSON file you can override or extend.',
                  'Default ingredient set included and enabled by default; can be disabled on world creation.',
                  'Any registered mob effect (including from other mods) can be granted by an Essence Stone.',
                  'Admin command to clear player cooldowns; compatible with all other mods.',
                ].map((feature) => (
                  <div key={feature} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                    <span className="mt-0.5 shrink-0 text-zinc-300 dark:text-zinc-500">✦</span>
                    {feature}
                  </div>
                ))}
              </div>

              <Divider />

              {/* Three ingredient types */}
              <div className="space-y-4">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  The Three Ingredient Types
                </p>
                <div className="space-y-3">
                  {[
                    {
                      name: 'Essence Stones',
                      color: 'amber',
                      border:
                        'border-amber-200 bg-amber-50 dark:border-amber-900/60 dark:bg-amber-950/20',
                      label: 'text-amber-600 dark:text-amber-400',
                      desc: 'The heart of every elixir. Each stone is tied to a specific potion effect. When you drink, the currently active stone determines which effect you receive. You can load up to 3 stones (configurable) and switch between them freely.',
                      examples:
                        'Swift Stone (Speed), Ember Stone (Fire Resistance), Bastion Stone (Resistance), and 7 more in the default datapack.',
                    },
                    {
                      name: 'Tinctures',
                      color: 'sky',
                      border:
                        'border-sky-200 bg-sky-50 dark:border-sky-900/60 dark:bg-sky-950/20',
                      label: 'text-sky-600 dark:text-sky-400',
                      desc: 'Liquid bases that modify your elixir\'s properties, primarily affecting effect duration and level. Made from existing Minecraft items like water bottles, honey bottles, experience bottles, and dragon\'s breath.',
                      examples:
                        'Aqueous Solution (x1.25 duration), Honey Distillate (+1 level), Arcane Extract (x0.90 cooldown), Dragon\'s Essence (+1 level, x1.20 duration).',
                    },
                    {
                      name: 'Catalysts',
                      color: 'violet',
                      border:
                        'border-violet-200 bg-violet-50 dark:border-violet-900/60 dark:bg-violet-950/20',
                      label: 'text-violet-600 dark:text-violet-400',
                      desc: 'Reactive powders that provide powerful but costly modifications. They tend to increase effect level or duration significantly, at the expense of longer cooldowns.',
                      examples:
                        'Glowstone Powder (+1 level, x1.40 cooldown), Redstone Catalyst (x1.50 duration), Blaze Catalyst (+1 level, x1.15 cooldown), Volatile Catalyst (x1.65 duration).',
                    },
                  ].map(({ name, border, label, desc, examples }) => (
                    <div key={name} className={`space-y-1.5 rounded-lg border p-4 ${border}`}>
                      <p className={`text-sm font-bold ${label}`}>{name}</p>
                      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {desc}
                      </p>
                      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {examples}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  All multiplier modifiers from tinctures and catalysts stack multiplicatively; flat
                  values and effect level modifiers stack additively. For example, two duration
                  multipliers of x1.25 and x1.15 combine to x1.4375.
                </p>
              </div>

              <Divider />

              {/* Emptying */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Emptying an Elixir
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Use the <strong className="font-medium text-zinc-800 dark:text-zinc-100">Empty Elixir</strong> button
                  in the Athanor to clear all ingredients. This is a two-click confirmation. When
                  emptied:
                </p>
                <ul className="space-y-1.5">
                  {[
                    'Essence Stones have a configurable chance to survive and return to your inventory (default: 50% destruction chance). Each stone rolls independently.',
                    'Tinctures are always destroyed; the liquids cannot be recovered.',
                    'Catalysts are always destroyed; the reactive powders are consumed.',
                  ].map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                      <span className="mt-0.5 shrink-0 text-zinc-300 dark:text-zinc-500">✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Divider />

              {/* Admin command */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Admin Command
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  <Code>/alchemical clearcooldown &lt;player&gt;</Code> immediately clears the
                  specified player's elixir cooldown. Requires permission level 2 (operator).
                </p>
              </div>

              <Divider />

              {/* Default Datapack: Essence Stones */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Default Essence Stones
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  The 10 stones included in the default datapack. Potency is 2 unless noted. Duration is the base before any tincture or catalyst modifiers.
                </p>
                <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
                  {[
                    { name: 'Swift Stone',     color: '#7BBFFF', effect: 'Speed I',           duration: '8m 0s',  potency: 2 },
                    { name: 'Leaping Stone',   color: '#44FF44', effect: 'Jump Boost I',      duration: '8m 0s',  potency: 2 },
                    { name: 'Ember Stone',     color: '#FF8833', effect: 'Fire Resistance I',  duration: '10m 0s', potency: 2 },
                    { name: 'Tidal Stone',     color: '#3399CC', effect: 'Water Breathing I',  duration: '10m 0s', potency: 2 },
                    { name: 'Nightseer Stone', color: '#1F1FA0', effect: 'Night Vision I',     duration: '10m 0s', potency: 2 },
                    { name: 'Zephyr Stone',    color: '#AAAACC', effect: 'Slow Falling I',     duration: '8m 0s',  potency: 2 },
                    { name: 'Might Stone',     color: '#CC3333', effect: 'Strength I',         duration: '6m 0s',  potency: 2 },
                    { name: 'Crimson Stone',   color: '#FF6699', effect: 'Regeneration I',     duration: '6m 0s',  potency: 2 },
                    { name: 'Phantom Stone',   color: '#AAAACC', effect: 'Invisibility I',     duration: '5m 0s',  potency: 2 },
                    { name: 'Bastion Stone',   color: '#888899', effect: 'Resistance I',       duration: '5m 0s',  potency: 3 },
                  ].map(({ name, color, effect, duration, potency }, i, arr) => (
                    <div
                      key={name}
                      className={`flex items-center justify-between px-4 py-2.5 ${i < arr.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-600' : ''}`}
                    >
                      <span className="text-sm font-medium" style={{ color }}>{name}</span>
                      <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-300">
                        <span>{effect}</span>
                        <span>{duration}</span>
                        <span className="w-14 text-right">Potency {potency}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Divider />

              {/* Default Datapack: Tinctures */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Default Tinctures
                </p>
                <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
                  {[
                    {
                      name: 'Aqueous Solution',
                      item: 'Water Bottle',
                      potency: 1,
                      modifiers: ['Duration x1.25'],
                    },
                    {
                      name: 'Honey Distillate',
                      item: 'Honey Bottle',
                      potency: 2,
                      modifiers: ['Duration x1.15', '+1 Effect Level'],
                    },
                    {
                      name: 'Arcane Extract',
                      item: 'Bottle o\' Enchanting',
                      potency: 1,
                      modifiers: ['Duration x1.10', 'Cooldown x0.90'],
                    },
                    {
                      name: "Dragon's Essence",
                      item: 'Dragon\'s Breath',
                      potency: 3,
                      modifiers: ['Duration x1.20', '+1 Effect Level'],
                    },
                  ].map(({ name, item, potency, modifiers }, i, arr) => (
                    <div
                      key={name}
                      className={`px-4 py-3 ${i < arr.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-600' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-sky-600 dark:text-sky-400">{name}</span>
                        <span className="text-sm text-zinc-400">Potency {potency}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-sm text-zinc-500 dark:text-zinc-300">{item}</span>
                        <span className="text-zinc-300 dark:text-zinc-600">·</span>
                        {modifiers.map((mod) => (
                          <span key={mod} className="text-sm font-medium text-zinc-600 dark:text-zinc-300">{mod}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Divider />

              {/* Default Datapack: Catalysts */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Default Catalysts
                </p>
                <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
                  {[
                    {
                      name: 'Glowstone Powder',
                      item: 'Glowstone Dust',
                      potency: 2,
                      modifiers: ['+1 Effect Level', 'Cooldown x1.40'],
                    },
                    {
                      name: 'Redstone Catalyst',
                      item: 'Redstone',
                      potency: 1,
                      modifiers: ['Duration x1.50', 'Cooldown x1.20'],
                    },
                    {
                      name: 'Blaze Catalyst',
                      item: 'Blaze Powder',
                      potency: 2,
                      modifiers: ['+1 Effect Level', 'Duration x0.80', 'Cooldown x1.15'],
                    },
                    {
                      name: 'Volatile Catalyst',
                      item: 'Gunpowder',
                      potency: 1,
                      modifiers: ['Duration x1.65', 'Cooldown x1.45'],
                    },
                  ].map(({ name, item, potency, modifiers }, i, arr) => (
                    <div
                      key={name}
                      className={`px-4 py-3 ${i < arr.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-600' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-violet-600 dark:text-violet-400">{name}</span>
                        <span className="text-sm text-zinc-400">Potency {potency}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-sm text-zinc-500 dark:text-zinc-300">{item}</span>
                        <span className="text-zinc-300 dark:text-zinc-600">·</span>
                        {modifiers.map((mod) => (
                          <span key={mod} className="text-sm font-medium text-zinc-600 dark:text-zinc-300">{mod}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Getting Started ── */}
          {activeTab === 'getting-started' && (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-600">

              {/* Step 1 */}
              <div className="space-y-4 p-6">
                <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  Step 1: Craft the Athanor
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  The Athanor is your alchemical crafting station, where you load ingredients into
                  your elixir. Crafting it requires copper ingots, a cauldron, a furnace, blackstone,
                  and a blaze rod, so you will need a trip to the Nether first.
                </p>
                <div className="flex justify-center">
                  <figure className="space-y-2">
                    <img
                      src={IMG.athanorRecipe}
                      alt="Athanor crafting recipe"
                      className="rounded-lg border border-zinc-200 dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      Athanor crafting recipe
                    </figcaption>
                  </figure>
                </div>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Place the Athanor down in your base. It glows with a warm light similar to a lit
                  furnace, making it easy to spot in darker builds.
                </p>
              </div>

              {/* Step 2 */}
              <div className="space-y-4 p-6">
                <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  Step 2: Craft an Elixir Flask
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  The Elixir Flask is the core item of the mod: a reusable container that holds
                  your alchemical ingredients and delivers their effects when you drink from it.
                  Crafting one requires glass bottles, an amethyst shard, and a Heart of the Sea
                  (found in buried treasure chests via explorer maps from shipwrecks and ocean ruins).
                </p>
                <div className="flex justify-center">
                  <figure className="space-y-2">
                    <img
                      src={IMG.elixirRecipe}
                      alt="Elixir Flask crafting recipe"
                      className="rounded-lg border border-zinc-200 dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      Elixir Flask crafting recipe
                    </figcaption>
                  </figure>
                </div>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  The flask starts completely empty and has no effect until you load ingredients
                  into it using the Athanor.
                </p>
              </div>

              {/* Step 3 */}
              <div className="space-y-4 p-6">
                <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  Step 3: Place the Elixir in the Athanor
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Right-click the Athanor to open its interface, then place your empty elixir into
                  the center slot. The left panel shows the elixir's name, a row of capacity dots
                  (diamond shapes representing how much room is available), and a message saying "No
                  ingredients added."
                </p>
                <div className="flex justify-center">
                  <figure className="space-y-2">
                    <img
                      src={IMG.athanorEmpty}
                      alt="Athanor menu with empty elixir placed"
                      className="rounded-lg border border-zinc-200 dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      Athanor with an empty elixir in the center slot
                    </figcaption>
                  </figure>
                </div>
              </div>

              {/* Step 4 */}
              <div className="space-y-4 p-6">
                <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  Step 4: Add Your First Essence Stone
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Place an Essence Stone into the ingredient slot on the right side of the Athanor.
                  A preview immediately shows the stone's name, type, potency cost, and the effect
                  it grants. The capacity dots preview which slots will be filled in blue; if the
                  ingredient would exceed remaining capacity the preview turns red.
                </p>
                <div className="flex justify-center">
                  <figure className="space-y-2">
                    <img
                      src={IMG.bastionStoneSlot}
                      alt="Bastion Stone staged in the Athanor ingredient slot"
                      className="rounded-lg border border-zinc-200 dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      A Bastion Stone (Resistance I, 5m cooldown) staged for adding
                    </figcaption>
                  </figure>
                </div>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Click <strong className="font-medium text-zinc-800 dark:text-zinc-100">Add</strong> to
                  confirm and load the stone into the elixir.
                </p>
              </div>

              {/* Step 5 */}
              <div className="space-y-4 p-6">
                <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  Step 5: Your First Loaded Elixir
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  After adding the Bastion Stone the left panel updates to show the elixir's current
                  state. The capacity dots are partially filled and the overview displays the active
                  effect with its computed duration and cooldown. The elixir now has one stone, but
                  requires at least one Tincture before it can be drunk.
                </p>
                <div className="flex justify-center">
                  <figure className="space-y-2">
                    <img
                      src={IMG.elixir1Stone}
                      alt="Athanor menu showing elixir with one Essence Stone loaded"
                      className="rounded-lg border border-zinc-200 dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      Elixir with one Essence Stone loaded; Tincture still needed
                    </figcaption>
                  </figure>
                </div>
              </div>

              {/* Step 6 */}
              <div className="space-y-4 p-6">
                <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  Step 6: Add a Tincture
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Place a valid tincture item into the ingredient slot. In the example below, a
                  water bottle is recognized as an "Aqueous Solution" tincture (Duration x1.25,
                  Potency 1). After adding it, the Bastion Stone's effect duration increases from
                  5m 0s to 6m 15s.
                </p>
                <div className="flex justify-center">
                  <figure className="space-y-2">
                    <img
                      src={IMG.aqueousSolution}
                      alt="Aqueous Solution tincture staged in the Athanor ingredient slot"
                      className="rounded-lg border border-zinc-200 dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      Aqueous Solution: Duration x1.25, Potency 1
                    </figcaption>
                  </figure>
                </div>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  You can add multiple tinctures to stack their effects. Different tinctures offer
                  different modifiers: some boost effect level, some extend duration, and some reduce
                  cooldown.
                </p>
              </div>

              {/* Step 7 */}
              <div className="space-y-4 p-6">
                <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  Step 7: The Information Icon
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Once your elixir has ingredients loaded, a small info icon appears in the left
                  panel. Hover over it to see a complete breakdown of every ingredient organized by
                  type, with each ingredient's individual stats listed.
                </p>
                <div className="flex justify-center">
                  <figure className="space-y-2">
                    <img
                      src={IMG.infoIcon}
                      alt="Athanor information icon popup showing ingredient breakdown"
                      className="rounded-lg border border-zinc-200 dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      The info icon reveals a full breakdown of all loaded ingredients
                    </figcaption>
                  </figure>
                </div>
              </div>

              {/* Step 8 */}
              <div className="space-y-4 p-6">
                <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  Step 8: Loading Multiple Essence Stones
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  One of the most powerful features is loading multiple Essence Stones. Each grants
                  a different potion effect, and you can switch between them at will. The currently
                  active stone is marked with <strong className="font-medium text-zinc-800 dark:text-zinc-100">[Active]</strong> and
                  is the effect you will receive when you drink.
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  How many stones you load is a meaningful choice. Each stone consumes capacity, leaving less room for tinctures and catalysts. A single stone lets you stack modifiers heavily, pushing that one effect to a high level with a long duration and a reduced cooldown. Loading two or three stones trades that depth for flexibility: you cover more situations without needing multiple elixirs and save inventory space, but each effect will be less augmented than a dedicated single-stone build.
                </p>
                <div className="flex justify-center">
                  <figure className="space-y-2">
                    <img
                      src={IMG.twoStones}
                      alt="Athanor menu with two Essence Stones loaded"
                      className="rounded-lg border border-zinc-200 dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      Two stones loaded; Bastion Stone (Resistance) is active
                    </figcaption>
                  </figure>
                </div>
              </div>

              {/* Step 9 */}
              <div className="space-y-4 p-6">
                <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  Step 9: A Fully Loaded Elixir
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  After adding tinctures and catalysts to further modify your elixir, the effects
                  become significantly more powerful. Catalysts like Blaze Powder or Glowstone Dust
                  can increase the effect level at the cost of higher cooldowns or reduced duration.
                </p>
                <div className="flex justify-center">
                  <figure className="space-y-2">
                    <img
                      src={IMG.fullElixir}
                      alt="Fully loaded elixir with boosted effects"
                      className="rounded-lg border border-zinc-200 dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      A fully loaded elixir with two stones boosted to level II
                    </figcaption>
                  </figure>
                </div>
              </div>

              {/* Using your elixir */}
              <div className="space-y-4 p-6">
                <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  Using Your Elixir
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Once your elixir has at least one Essence Stone and one Tincture, right-click
                  (Use) while holding it to drink. This grants the active stone's effect for the
                  computed duration, then starts the cooldown timer.
                </p>
                <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800/50 dark:bg-amber-950/20">
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                    The cooldown is global.
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-amber-700 dark:text-amber-400">
                    Drinking from any elixir locks all of your elixirs for the duration of the cooldown. Carrying multiple flasks does not let you chain drinks or stack effects simultaneously. Plan your loadout around a single drink per cooldown window.
                  </p>
                </div>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Hover the elixir in your inventory for a quick summary. Hold{' '}
                  <kbd className="rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] dark:border-zinc-500 dark:bg-zinc-600">
                    Shift
                  </kbd>{' '}
                  for full details including all loaded stones with the active one highlighted.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <figure className="space-y-2">
                    <img
                      src={IMG.tooltipNoShift}
                      alt="Elixir inventory tooltip without Shift"
                      className="rounded-lg border border-zinc-200 object-contain dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      Default tooltip (no Shift)
                    </figcaption>
                  </figure>
                  <figure className="space-y-2">
                    <img
                      src={IMG.tooltipBastionSelected}
                      alt="Elixir inventory tooltip with Shift held, Bastion Stone active"
                      className="rounded-lg border border-zinc-200 object-contain dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      Full tooltip (Shift held)
                    </figcaption>
                  </figure>
                </div>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  If your elixir has more than one Essence Stone, use{' '}
                  <kbd className="rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] dark:border-zinc-500 dark:bg-zinc-600">
                    Shift
                  </kbd>{' '}
                  +{' '}
                  <kbd className="rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] dark:border-zinc-500 dark:bg-zinc-600">
                    Use
                  </kbd>{' '}
                  to cycle through loaded stones without drinking. This lets a single elixir serve
                  as your Speed potion, Fire Resistance potion, and Resistance potion all in one.
                </p>
                <div className="flex justify-center">
                  <figure className="space-y-2">
                    <img
                      src={IMG.tooltipEmberSelected}
                      alt="Elixir tooltip after switching to Ember Stone"
                      className="rounded-lg border border-zinc-200 dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      After Shift + Use: Ember Stone (Fire Resistance) is now active
                    </figcaption>
                  </figure>
                </div>
              </div>

              {/* Default items */}
              <div className="space-y-4 p-6">
                <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  Default Items Overview
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  The default datapack includes the Elixir Flask, 10 Essence Stones covering a wide
                  range of effects, and the Athanor crafting station. All items are available in the
                  Alchemical creative tab.
                </p>
                <div className="flex justify-center">
                  <figure className="space-y-2">
                    <img
                      src={IMG.creativeMenu}
                      alt="Alchemical creative tab showing all default datapack items"
                      className="rounded-lg border border-zinc-200 dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      All items from the default datapack in the Alchemical creative tab
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          )}

          {/* ── Configuration ── */}
          {activeTab === 'configuration' && (
            <div className="space-y-6 p-6">

              {/* Datapack overview */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Datapack Configuration
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Every Essence Stone, Tincture, and Catalyst is defined by a JSON file in a
                  datapack. The mod ships with a built-in datapack called{' '}
                  <strong className="font-medium text-zinc-800 dark:text-zinc-100">Alchemical Defaults</strong>{' '}
                  that is enabled by default when creating a new world. You can disable it on the
                  world creation screen under Data Packs, or override individual definitions by
                  creating a file at the same path in your own datapack.
                </p>
                <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800/50 dark:bg-amber-950/20">
                  <p className="text-sm leading-relaxed text-amber-800 dark:text-amber-300">
                    <strong className="font-semibold">Tip:</strong> Rather than writing these JSON
                    files by hand, use the{' '}
                    <Link
                      to="/alchemical/ingredient-builder"
                      className="font-semibold underline decoration-amber-400/50 underline-offset-2 hover:decoration-amber-400"
                    >
                      Ingredient Builder
                    </Link>{' '}
                    (linked in the sidebar on the right) to generate them visually with live
                    preview, validation, and one-click datapack download.
                  </p>
                </div>
              </div>

              {/* Essence Stone */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Essence Stone Definitions
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  Path: <Code>data/&lt;namespace&gt;/alchemical/essence_stone/&lt;name&gt;.json</Code>
                </p>
                <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-xs leading-relaxed text-zinc-300">{`{
  "name": "Bastion Stone",
  "color": "#888899",
  "effect": "minecraft:resistance",
  "base_duration": 6000,
  "potency": 3
}`}</pre>
                <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
                  {[
                    {
                      field: 'effect',
                      required: true,
                      default: '',
                      desc: 'ResourceLocation of the mob effect to grant (e.g. "minecraft:speed", "mymod:flight"). Must be a valid registered effect.',
                    },
                    {
                      field: 'name',
                      required: false,
                      default: 'registry ID',
                      desc: 'Display name shown in the Athanor UI and item tooltips. If omitted, the stone uses its registry ID as a fallback.',
                    },
                    {
                      field: 'color',
                      required: false,
                      default: '"#AA88FF"',
                      desc: 'Hex color string used for UI elements like the stone\'s name color in tooltips. Accepts 6-digit hex with # prefix.',
                    },
                    {
                      field: 'base_duration',
                      required: false,
                      default: '200',
                      desc: 'Base effect duration in ticks (20 ticks = 1 second), before any tincture or catalyst modifiers. The default of 200 ticks is only 10 seconds; most stones use 6,000 to 12,000 (5 to 10 minutes).',
                    },
                    {
                      field: 'base_level',
                      required: false,
                      default: '1',
                      desc: 'Base effect amplifier level. A value of 1 means the effect starts at level I. Tincture and catalyst effect_level_modifier values are added to this base.',
                    },
                    {
                      field: 'elixir_cooldown_multiplier',
                      required: false,
                      default: '1.0',
                      desc: 'Multiplier applied to the elixir\'s base cooldown when this stone is active. Stacks multiplicatively with tincture and catalyst cooldown multipliers.',
                    },
                    {
                      field: 'elixir_cooldown_flat',
                      required: false,
                      default: '0',
                      desc: 'Flat seconds added to (or subtracted from) the cooldown after all multipliers are applied.',
                    },
                    {
                      field: 'potency',
                      required: false,
                      default: '2',
                      desc: 'How many capacity slots this stone consumes when loaded. The Bastion Stone (Resistance) costs 3, making it the most expensive default stone.',
                    },
                  ].map(({ field, required, default: def, desc }, i, arr) => (
                    <div
                      key={field}
                      className={`px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-600' : ''}`}
                    >
                      <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <code className="font-mono text-xs font-semibold text-amber-600 dark:text-amber-400">
                          {field}
                        </code>
                        {required ? (
                          <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-medium text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                            Required
                          </span>
                        ) : (
                          <span className="text-sm text-zinc-400">default: {def}</span>
                        )}
                      </div>
                      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tincture */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Tincture Definitions
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  Path: <Code>data/&lt;namespace&gt;/alchemical/tincture/&lt;name&gt;.json</Code>
                </p>
                <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-xs leading-relaxed text-zinc-300">{`{
  "item": "minecraft:honey_bottle",
  "name": "Honey Distillate",
  "effect_duration_multiplier": 1.15,
  "effect_level_modifier": 1,
  "potency": 2
}`}</pre>
                <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
                  {[
                    {
                      field: 'item',
                      required: true,
                      default: '',
                      desc: 'ResourceLocation of the Minecraft item that serves as this tincture. When placed in the Athanor\'s ingredient slot it will be recognized with these properties. Each item can only be one ingredient type; tinctures take priority over catalysts.',
                    },
                    {
                      field: 'name',
                      required: false,
                      default: "item's default name",
                      desc: "Display name shown in the UI. If omitted, the item's default name is used.",
                    },
                    {
                      field: 'effect_duration_multiplier',
                      required: false,
                      default: '1.0',
                      desc: 'Multiplier applied to the active stone\'s effect duration. Values above 1.0 extend duration, values below 1.0 shorten it. Stacks multiplicatively with other duration multipliers.',
                    },
                    {
                      field: 'effect_duration_flat',
                      required: false,
                      default: '0',
                      desc: 'Flat ticks added to the effect duration after all multipliers are applied. Can be negative to reduce duration.',
                    },
                    {
                      field: 'effect_level_modifier',
                      required: false,
                      default: '0',
                      desc: 'Additive modifier to the effect level. A value of 1 adds +1 to the final effect level. All level modifiers from tinctures and catalysts are summed together.',
                    },
                    {
                      field: 'elixir_cooldown_multiplier',
                      required: false,
                      default: '1.0',
                      desc: 'Multiplier applied to the elixir cooldown. Stacks multiplicatively with other cooldown multipliers from all sources.',
                    },
                    {
                      field: 'elixir_cooldown_flat',
                      required: false,
                      default: '0',
                      desc: 'Flat seconds added to the cooldown after all multipliers.',
                    },
                    {
                      field: 'potency',
                      required: false,
                      default: '1',
                      desc: 'How many capacity slots this tincture consumes. The simplest tincture (Aqueous Solution) costs 1 slot; more powerful ones like Dragon\'s Essence cost 3.',
                    },
                  ].map(({ field, required, default: def, desc }, i, arr) => (
                    <div
                      key={field}
                      className={`px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-600' : ''}`}
                    >
                      <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <code className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">
                          {field}
                        </code>
                        {required ? (
                          <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-medium text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                            Required
                          </span>
                        ) : (
                          <span className="text-sm text-zinc-400">default: {def}</span>
                        )}
                      </div>
                      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Catalyst */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Catalyst Definitions
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  Path: <Code>data/&lt;namespace&gt;/alchemical/catalyst/&lt;name&gt;.json</Code>
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Catalysts use the exact same JSON structure as tinctures. They are identified by
                  their item and provide the same modifier fields. The distinction is purely
                  organizational: catalysts are loaded from the <Code>catalyst/</Code> directory
                  while tinctures are loaded from <Code>tincture/</Code>.
                </p>
                <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-xs leading-relaxed text-zinc-300">{`{
  "item": "minecraft:blaze_powder",
  "name": "Blaze Catalyst",
  "elixir_cooldown_multiplier": 1.15,
  "effect_duration_multiplier": 0.80,
  "effect_level_modifier": 1,
  "potency": 2
}`}</pre>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  See the Tincture Definitions section above for the full key reference; all fields
                  are identical.
                </p>
              </div>

              <Divider />

              {/* Overriding / adding */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Overriding and Adding Ingredients
                </p>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Disable the default datapack',
                      desc: 'When creating a new world, move "Alchemical Defaults" to the Available column on the Data Packs screen. This starts with a completely blank slate: no ingredients defined. You can then provide your own datapack with custom definitions.',
                    },
                    {
                      title: 'Override an individual definition',
                      desc: 'Create a datapack with a file at the same path as the default. For example, to change the Bastion Stone: data/alchemical/alchemical/essence_stone/bastion_stone.json. Your file takes precedence over the built-in default.',
                    },
                    {
                      title: 'Add a new ingredient',
                      desc: 'Create a JSON file with a unique name in the appropriate directory (essence_stone/, tincture/, or catalyst/). Any Minecraft item or registered mob effect (including from other mods) can be used.',
                    },
                  ].map(({ title, desc }) => (
                    <div key={title} className="flex gap-3">
                      <span className="mt-1 shrink-0 text-zinc-300 dark:text-zinc-500">◆</span>
                      <div>
                        <p className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                          {title}
                        </p>
                        <p className="mt-1 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                          {desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-xs leading-relaxed text-zinc-300">{`// data/yourpack/alchemical/essence_stone/quarry_stone.json
{
  "name": "Quarry Stone",
  "color": "#FFD700",
  "effect": "minecraft:haste",
  "base_duration": 9600,
  "base_level": 1,
  "potency": 2
}`}</pre>
              </div>

              <Divider />

              {/* Server config */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Server Configuration
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Server-side settings live at{' '}
                  <Code>serverconfig/alchemical-server.toml</Code>.
                </p>
                <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
                  {[
                    {
                      field: 'essenceStoneBreakChance',
                      default: '0.5',
                      range: '0.0 to 1.0',
                      desc: 'Probability that an Essence Stone is destroyed when emptying an elixir. Each stone rolls independently. Set to 0.0 to always return stones safely, or 1.0 to always destroy them.',
                    },
                    {
                      field: 'elixirCooldownSeconds',
                      default: '1800',
                      range: '0 to 86400',
                      desc: 'Base cooldown in seconds after drinking an elixir, before any ingredient modifiers are applied. 1800 = 30 minutes. Set to 0 to disable cooldowns entirely. Maximum is 86400 (24 hours).',
                    },
                    {
                      field: 'elixirCapacity',
                      default: '9',
                      range: '1 to 45',
                      desc: 'Maximum total potency that can be loaded into a single elixir. Each ingredient has a potency value (typically 1-3) that consumes capacity when loaded.',
                    },
                    {
                      field: 'maxEssenceStones',
                      default: '3',
                      range: '1 to 10',
                      desc: 'Maximum number of Essence Stones that can be loaded into a single elixir, limiting how many switchable effects one elixir can hold.',
                    },
                  ].map(({ field, default: def, range, desc }, i, arr) => (
                    <div
                      key={field}
                      className={`px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-600' : ''}`}
                    >
                      <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <code className="font-mono text-xs font-semibold text-amber-600 dark:text-amber-400">
                          {field}
                        </code>
                        <span className="text-sm text-zinc-400">default: {def}</span>
                        <span className="text-sm text-zinc-400">range: {range}</span>
                      </div>
                      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── FAQ ── */}
          {activeTab === 'faq' && (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-600">
              {[
                {
                  q: 'Will you make this for Fabric?',
                  a: 'Alchemical is built for NeoForge and there are no current plans for a Fabric port. Anyone is welcome to create one though!',
                },
                {
                  q: 'Can I use this in my modpack or on my server?',
                  a: 'Absolutely. Alchemical is designed with modpack makers in mind. The entire ingredient system is datapack-configurable, and server settings let you tune the balance to fit your pack.',
                },
                {
                  q: 'Is this compatible with other mods?',
                  a: 'Alchemical should be compatible with all other mods. Essence Stones can be configured to grant any registered mob effect, including effects added by other mods.',
                },
                {
                  q: 'Can I add modded effects as Essence Stones?',
                  a: 'Yes. The effect field in Essence Stone definitions accepts any valid ResourceLocation. If another mod registers "mymod:flight" as a mob effect, set "effect": "mymod:flight" in your stone definition and it will work.',
                },
                {
                  q: 'What happens if I die with an elixir cooldown active?',
                  a: 'The cooldown persists through death. You cannot bypass the cooldown by dying and respawning.',
                },
                {
                  q: 'How do I remove an ingredient from my elixir without clearing everything?',
                  a: 'You cannot remove individual ingredients; you must empty the entire elixir using the Empty Elixir button in the Athanor. Be aware that Tinctures and Catalysts are always lost, and Essence Stones have a configurable chance of being destroyed (default 50%).',
                },
                {
                  q: 'Can I have more than one elixir at once?',
                  a: 'Yes, but the cooldown is shared across all of them. Drinking from any elixir locks every flask you own for the full duration, so carrying multiple flasks and drinking them back-to-back is not possible. The real decision is how you load your stones. Fewer stones per elixir leaves more capacity for tinctures and catalysts, letting you push a single effect further in terms of level, duration, or cooldown reduction. Loading two or three stones trades that depth for flexibility: you can switch effects on the fly and cover more situations without needing to juggle multiple flasks, which also saves inventory space.',
                },
              ].map(({ q, a }) => (
                <div key={q} className="space-y-2 p-6">
                  <p className="text-base font-semibold text-zinc-800 dark:text-zinc-100">{q}</p>
                  <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">{a}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

        {/* Ingredient Builder sidebar: absolutely placed so it never affects the centered card */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-[calc(50%+26rem+1.5rem)] hidden w-[18rem] xl:block [&>*]:pointer-events-auto">
          <div className="sticky top-20 flex flex-col gap-4">
            <ToolLinkCard
              to="/alchemical/ingredient-builder"
              title="Ingredient Builder"
              description="Generate ingredient JSON files for Essence Stones, Tinctures, and Catalysts with live preview."
              icon={
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 4H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2" />
                  <path d="M8 4a2 2 0 0 1 4 0v1H8V4Z" />
                  <path d="M7 10h6M7 13h4" />
                </svg>
              }
            />
            <DownloadLinks
              curseforgeUrl="https://www.curseforge.com/minecraft/mc-mods/alchemical"
              modrinthUrl="https://modrinth.com/mod/alchemical-mod"
              discordUrl="https://discord.gg/cpRzXtSaSr"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
