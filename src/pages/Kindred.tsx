import { useState } from 'react'
import { DownloadLinks } from '../components/DownloadLinks'
import { VerticalTabNav } from '../components/VerticalTabNav'

const IMG = {
  banner: '/kindred/kindred_banner.png',
  logo: '/kindred/kindred_logo.png',
  rosterMenu: '/kindred/roster_menu.png',
  summoning: '/kindred/summoning_bar.png',
  dismissing: '/kindred/dismissing.png',
}

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <section
    className={`overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700 ${className}`}
  >
    {children}
  </section>
)

const Divider = () => <hr className="border-zinc-100 dark:border-zinc-600" />

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-600">
    {children}
  </code>
)

type Tab = 'overview' | 'configuration' | 'faq'

const TABS = [
  { id: 'overview' as const, label: 'Overview' },
  { id: 'configuration' as const, label: 'Configuration' },
  { id: 'faq' as const, label: 'FAQ' },
] satisfies readonly { id: Tab; label: string }[]

const configCategories = [
  {
    name: 'Bonding',
    knobs: 'Max bonds per player, mount-only mode, XP level cost per bond.',
  },
  {
    name: 'Summoning',
    knobs:
      'Walk vs. teleport range, walk speed, cross-dimensional toggle, space-required toggle.',
  },
  {
    name: 'Cooldowns',
    knobs: 'Per-bond summon cooldown, global per-player summon cooldown.',
  },
  {
    name: 'Death',
    knobs: 'Permadeath toggle, loot drop toggle, revival cooldown.',
  },
  {
    name: 'Input',
    knobs: 'Hold-to-summon seconds, hold-to-dismiss seconds, cancel-on-damage.',
  },
  {
    name: 'PMMO compat',
    knobs: 'Skill gating, start level, linear or all-or-nothing unlock progression.',
  },
]

const datapackTags = [
  {
    tag: 'kindred:bond_allowlist',
    type: 'entity types',
    desc: 'When non-empty, only species in this tag can be bonded and bond_denylist is ignored. Leave empty to fall back to denylist behavior.',
  },
  {
    tag: 'kindred:bond_denylist',
    type: 'entity types',
    desc: 'Species that can never be bonded. Only consulted when bond_allowlist is empty.',
  },
  {
    tag: 'kindred:no_summon_dimensions',
    type: 'dimension types',
    desc: 'Dimensions where summoning is blocked.',
  },
  {
    tag: 'kindred:no_summon_biomes',
    type: 'biomes',
    desc: 'Biomes where summoning is blocked (great for boss arenas, dungeon biomes, PvP zones).',
  },
]

const commands = [
  ['/kindred claim', 'claim the entity at your crosshair'],
  ['/kindred list', 'list your bonds with indices'],
  ['/kindred summon <index>', 'summon a bond'],
  ['/kindred dismiss <index>', 'recall the active pet'],
  ['/kindred break <index>', 'break a bond'],
  ['/kindred active <index|none>', 'set or clear the active pet'],
] as const

export const Kindred = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <img
          src={IMG.banner}
          alt="Kindred"
          className="max-w-md rounded-xl object-contain shadow-sm"
        />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute top-0 right-[calc(50%+26rem+1.5rem)] bottom-0 hidden w-[12rem] xl:block [&>*]:pointer-events-auto">
          <VerticalTabNav tabs={TABS} activeTab={activeTab} onSelect={setActiveTab} />
        </div>

        <Card className="mx-auto xl:w-[52rem]">
          {/* Mobile tab bar */}
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

          {activeTab === 'overview' && (
            <div className="space-y-5 p-6">
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                Kindred turns your tamed pets into a true companion roster. Bond a pet once, then
                call it to your side anywhere in the world: across dimensions, across deaths,
                across sessions. No more leaving your wolf at home, losing your horse in a cave, or
                starting over every time something dies.
              </p>

              <Divider />

              {/* Bond with any tamed pet */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Bond with any tamed pet
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Look at one of your tamed pets, open the{' '}
                  <strong className="font-medium text-zinc-800 dark:text-zinc-100">
                    Pet Roster
                  </strong>
                  , and bond. Bonded pets are stored on you, not in the world. They survive
                  logouts, chunk unloads, and dimension changes.
                </p>
                <div className="flex justify-center">
                  <figure className="space-y-2">
                    <img
                      src={IMG.rosterMenu}
                      alt="Pet Roster menu"
                      className="rounded-lg border border-zinc-200 dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      The Pet Roster menu
                    </figcaption>
                  </figure>
                </div>
                <ul className="space-y-1.5">
                  {[
                    'Works with any ownable, tameable mob out of the box (wolves, cats, parrots, horses, donkeys, mules, llamas, camels, foxes, axolotls, anything that implements vanilla ownership).',
                    'Optional mount-only mode restricts bonding to saddleable mounts.',
                    'Optional XP level cost per bond makes bonding feel earned, with the cost previewed before you confirm.',
                    "Optional datapack blocklist for species that shouldn't be bondable on your server.",
                  ].map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                      <span className="mt-0.5 shrink-0 text-zinc-300 dark:text-zinc-500">✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Divider />

              {/* Summon & Dismiss */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Summon & Dismiss with a keybind
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  One key summons your active pet. Hold it again to dismiss. Open the roster with
                  another key to switch active pet, rename, reorder, or break bonds.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <figure className="space-y-2">
                    <img
                      src={IMG.summoning}
                      alt="Summoning hold-to-confirm bar"
                      className="rounded-lg border border-zinc-200 dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      Hold-to-confirm summon bar
                    </figcaption>
                  </figure>
                  <figure className="space-y-2">
                    <img
                      src={IMG.dismissing}
                      alt="Dismissing hold-to-confirm bar"
                      className="rounded-lg border border-zinc-200 dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      Hold-to-confirm dismiss bar
                    </figcaption>
                  </figure>
                </div>
                <ul className="space-y-1.5">
                  {[
                    'Hold-to-confirm prevents misclicks; configurable hold duration for both summon and dismiss.',
                    'Smart placement: pets within range walk to you naturally; farther pets teleport to a safe spot beside you.',
                    'Refuses to summon when the space around you is obstructed (configurable).',
                    'Cancels the hold if you take damage (configurable), mirroring vanilla bow-draw / eating behavior.',
                    'Optional cross-dimensional summons so your pet follows you to the Nether and back.',
                  ].map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                      <span className="mt-0.5 shrink-0 text-zinc-300 dark:text-zinc-500">✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Divider />

              {/* Bring them back from the grave */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Bring them back from the grave
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  By default, when a bonded pet dies, the bond doesn't break: it just goes
                  dormant. Summon them again and they respawn at your side, gear and all.
                </p>
                <ul className="space-y-1.5">
                  {[
                    'Soft death (default): pet returns on next summon. Optional revival cooldown adds weight without going full permadeath.',
                    'Permadeath mode: flip a config switch and death breaks the bond for keeps.',
                    "Loot drops are off by default in soft-death mode (you'd just be picking your own saddle back up). Re-enable for vanilla behavior.",
                  ].map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                      <span className="mt-0.5 shrink-0 text-zinc-300 dark:text-zinc-500">✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Divider />

              {/* Pet Roster GUI */}
              <div className="space-y-3">
                <div className="flex justify-center py-2">
                  <img
                    src={IMG.logo}
                    alt="Kindred logo"
                    className="w-32 object-contain opacity-90"
                  />
                </div>
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Pet Roster GUI
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  A clean inventory-style screen for managing your bonds.
                </p>
                <ul className="space-y-1.5">
                  {[
                    'Live 3D preview of the selected pet.',
                    'Set active, rename, reorder (▲ / ▼), and break bonds with a hold-to-confirm.',
                    'Per-pet summon cooldown indicator.',
                    'Respawn timer for pets in revival cooldown.',
                    '"Limbo" / "Resting" state hints so you always know where each pet is.',
                  ].map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                      <span className="mt-0.5 shrink-0 text-zinc-300 dark:text-zinc-500">✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Divider />

              {/* Why Kindred */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Why Kindred?
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Vanilla pets are fragile, stationary, and easy to lose. Existing pet mods either
                  turn them into items (which feels weird) or add a stable system (which feels like
                  extra inventory management). Kindred takes a different angle: your pets live on{' '}
                  <strong className="font-medium text-zinc-800 dark:text-zinc-100">you</strong>,
                  not in the world. They're always one keypress away, they survive deaths, and the
                  whole thing tunes from a config file so it fits any modpack: hardcore, casual,
                  mount-focused, or RPG-progression.
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  This mod was inspired by Callable Horses, which seems to not be moving past
                  1.20.1. I wanted to expand on it a little bit and include some new features and
                  upgrades.
                </p>
              </div>

              <Divider />

              {/* Keybinds */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Keybinds
                </p>
                <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
                  {[
                    { key: 'V', action: 'Summon active pet' },
                    { key: 'G', action: 'Open pet roster' },
                  ].map(({ key, action }, i, arr) => (
                    <div
                      key={key}
                      className={`flex items-center justify-between px-4 py-2.5 ${i < arr.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-600' : ''}`}
                    >
                      <kbd className="rounded border border-zinc-300 bg-zinc-100 px-2 py-0.5 font-mono text-xs dark:border-zinc-500 dark:bg-zinc-600">
                        {key}
                      </kbd>
                      <span className="text-sm text-zinc-500 dark:text-zinc-300">{action}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Set them in <strong className="font-medium">Options → Controls → Kindred</strong>.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'configuration' && (
            <div className="space-y-6 p-6">
              {/* Extremely customizable */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Extremely customizable
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Every behavior is exposed in <Code>kindred-server.toml</Code>:
                </p>
                <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
                  {configCategories.map(({ name, knobs }, i, arr) => (
                    <div
                      key={name}
                      className={`px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-600' : ''}`}
                    >
                      <p className="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                        {name}
                      </p>
                      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {knobs}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Divider />

              {/* Datapack control */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Datapack control
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Four tags let server owners and modpack authors tune the experience without
                  code:
                </p>
                <div className="space-y-2">
                  {datapackTags.map(({ tag, type, desc }) => (
                    <div
                      key={tag}
                      className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3 dark:border-zinc-600 dark:bg-zinc-600/30"
                    >
                      <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <Code>{tag}</Code>
                        <span className="text-xs text-zinc-400">({type})</span>
                      </div>
                      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Divider />

              {/* PMMO integration */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Project MMO integration
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Optional gating via{' '}
                  <a
                    href="https://www.curseforge.com/minecraft/mc-mods/project-mmo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-zinc-800 underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-500 dark:text-zinc-100 dark:decoration-zinc-500"
                  >
                    Project MMO
                  </a>
                  .
                </p>
                <ul className="space-y-1.5">
                  {[
                    <>
                      Choose any PMMO skill (default: <Code>charisma</Code>) to gate bond claims.
                    </>,
                    <>
                      <strong className="font-medium text-zinc-800 dark:text-zinc-100">
                        All-or-nothing mode:
                      </strong>{' '}
                      hit the start level and unlock all bond slots at once.
                    </>,
                    <>
                      <strong className="font-medium text-zinc-800 dark:text-zinc-100">
                        Linear mode:
                      </strong>{' '}
                      one slot at the start level, +1 every N levels, capped at your max.
                    </>,
                    'The roster screen shows the next unlock requirement so players know what to grind.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                      <span className="mt-0.5 shrink-0 text-zinc-300 dark:text-zinc-500">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Divider />

              {/* Commands */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Commands
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  For server admins and debugging:
                </p>
                <div className="space-y-2">
                  {commands.map(([cmd, desc]) => (
                    <div key={cmd} className="space-y-1">
                      <pre className="overflow-x-auto rounded-lg bg-zinc-900 px-4 py-2.5 font-mono text-xs text-zinc-300">
                        {cmd}
                      </pre>
                      <p className="px-1 text-sm text-zinc-500 dark:text-zinc-400">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-600">
              {[
                {
                  q: 'Will you make this for Fabric?',
                  a: "There are no current plans for a Fabric port. Anyone is welcome to create one though!",
                },
                {
                  q: 'Can I use this on my server or modpack?',
                  a: "Of course, that's why I made it! Just please give credit if possible. You may not use this to make money off of in any way.",
                },
                {
                  q: 'Do bonded pets really survive logouts and dimension changes?',
                  a: 'Yes. Bonds are stored on the player, not in the world, so they persist across logouts, chunk unloads, and dimension transitions. Your pet is always one summon away.',
                },
                {
                  q: 'What happens to a bonded pet that dies?',
                  a: "By default, the bond goes dormant rather than breaking. Summon them again and they respawn at your side, gear and all. Flip the permadeath config if you want death to break the bond for keeps.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="space-y-1 px-6 py-4">
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{q}</p>
                  <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">{a}</p>
                </div>
              ))}
            </div>
          )}
        </Card>

        <div className="pointer-events-none absolute top-0 bottom-0 left-[calc(50%+26rem+1.5rem)] hidden w-[18rem] xl:block [&>*]:pointer-events-auto">
          <div className="sticky top-20">
            <DownloadLinks
              curseforgeUrl="https://www.curseforge.com/minecraft/mc-mods/kindred"
              modrinthUrl="https://modrinth.com/project/6M5GinSS"
              discordUrl="https://discord.gg/cpRzXtSaSr"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
