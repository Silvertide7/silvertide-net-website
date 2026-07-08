import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DownloadLinks } from '../components/DownloadLinks'
import { ToolLinkCard } from '../components/ToolLinkCard'
import { VerticalTabNav } from '../components/VerticalTabNav'

const IMG = {
  banner: '/artifactory/banner.png',
  logo: '/artifactory/logo.png',
  levelComparison: '/artifactory/level-comparison.png',
  featuresBanner: '/artifactory/features-banner.png',
  unattunedSword: '/artifactory/unattuned-sword.png',
  nexusRecipe: '/artifactory/nexus-recipe.png',
  nexusUI: '/artifactory/nexus-ui.png',
  maxLevelCard: '/artifactory/max-level-card.png',
  levelDetails: '/artifactory/level-details.png',
  level2Tooltip: '/artifactory/level2-tooltip.png',
}

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <section
    className={`overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700 ${className}`}
  >
    {children}
  </section>
)

const Mod = ({ name, color }: { name: string; color: 'sky' | 'violet' | 'amber' }) => {
  const cls = {
    sky: 'text-sky-500 dark:text-sky-400',
    violet: 'text-violet-500 dark:text-violet-400',
    amber: 'text-amber-500 dark:text-amber-400',
  }[color]
  return <span className={`font-semibold ${cls}`}>{name}</span>
}

const Divider = () => <hr className="border-zinc-100 dark:border-zinc-600" />

type Tab = 'overview' | 'getting-started' | 'datapack' | 'faq'

const TABS = [
  { id: 'overview' as const, label: 'Overview' },
  { id: 'getting-started' as const, label: 'Getting Started' },
  { id: 'datapack' as const, label: 'Configuration' },
  { id: 'faq' as const, label: 'FAQ' },
] satisfies readonly { id: Tab; label: string }[]

export const Artifactory = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <img
          src={IMG.banner}
          alt="Artifactory"
          className="max-w-sm rounded-xl object-contain shadow-sm"
        />
      </div>

      {/* ── Main layout: centered card with floating JSON / Datapack Builder ── */}
      <div className="relative">
        {/* Section nav: floats to the left on xl+ */}
        <div className="pointer-events-none absolute top-0 bottom-0 right-[calc(50%+26rem+1.5rem)] hidden w-[12rem] xl:block [&>*]:pointer-events-auto">
          <VerticalTabNav tabs={TABS} activeTab={activeTab} onSelect={setActiveTab} />
        </div>

        <Card className="mx-auto xl:w-[52rem]">
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

          {/* Overview content */}
          {activeTab === 'overview' && (
            <div className="space-y-5 p-6">
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                Artifactory introduces a highly configurable D&amp;D-style attunement system where
                players can bond with weapons, armor, and gear. As your attunement level grows, so
                does the power of your gear, unlocking new bonuses and effects.
              </p>
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                Modpack makers can restrict powerful items until they're attuned, and with a limited
                number of attunement slots, players must make meaningful choices about which items
                to commit to. Fully configurable and built to fit seamlessly into any modpack,
                Artifactory adds depth, progression, and balance to your game.
              </p>

              {/* JSON / Datapack Builder callout */}
              <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-600 dark:bg-zinc-600/30">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                    JSON / Datapack Builder
                  </p>
                  <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                    Build attunement configs visually: single JSON files, full datapacks, or data component strings for use in-game.
                  </p>
                </div>
                <Link
                  to="/artifactory/config-generator"
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
                  alt="Artifactory"
                  className="w-32 object-contain opacity-90"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  {
                    label: 'Attune',
                    desc: 'Bond weapons, armor, and any item to a player. Its allegiance is entirely to them; only the bonded player can use it.',
                  },
                  {
                    label: 'Progress',
                    desc: 'Grow the bond through attunement levels, each granting stronger modifications and attribute bonuses. The items you create will be legendary.',
                  },
                  {
                    label: 'Restrict',
                    desc: 'Require attunement before an item can be used at all. Limited slots force meaningful choices about what to commit to.',
                  },
                ].map(({ label, desc }) => (
                  <div
                    key={label}
                    className="rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-600 dark:bg-zinc-600/30"
                  >
                    <p className="mb-1.5 text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                      {label}
                    </p>
                    <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>

              <hr className="border-zinc-100 dark:border-zinc-600" />

              <div className="grid gap-2.5 sm:grid-cols-2">
                {[
                  "Entirely data-driven attunement system where almost everything is configurable. Make it fit your server or modpack's needs.",
                  'Create and grow bonds with weapons, armor, and other items to gain unique benefits like Unbreakable, attribute increases, and Soulbound items that persist through death.',
                  'Default vanilla datapack included (you must enable it when creating the world); install and play without any configuration.',
                  'Protect your attuned items from despawning and being destroyed by the environment.',
                  "Only the player bonded to an item can use it. Its allegiance is entirely to them. Holding someone else's attuned item causes bad things to happen.",
                  'Impose restrictions like requiring an item to be attuned before it can be used in any way.',
                  "Apply effects to players holding an attuned item that doesn't belong to them: slowness, poison, wither. It's up to you.",
                  'Curios compatibility, should be compatible with all other mods.',
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-300"
                  >
                    <span className="mt-0.5 shrink-0 text-zinc-300 dark:text-zinc-500">✦</span>
                    {feature}
                  </div>
                ))}
              </div>

              <Divider />



              {/* Attunement Level Progression */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Attunement Level Progression
                </p>
                <p className="text-base text-zinc-600 dark:text-zinc-300">
                  Below are the default datapack attunement levels for the Diamond Sword, included
                  as an example of what the system is capable of.
                </p>
                <div className="space-y-2.5">
                  {[
                    {
                      level: 1,
                      color: 'sky' as const,
                      content: (
                        <>
                          Adds <Mod name="Invulnerable" color="sky" /> (won't despawn and can't be
                          hurt by environmental effects) along with the base benefits of the
                          attunement bond.
                        </>
                      ),
                    },
                    {
                      level: 2,
                      color: 'violet' as const,
                      content: (
                        <>
                          Adds 25% attack speed and <Mod name="Unbreakable" color="violet" />.
                        </>
                      ),
                    },
                    {
                      level: 3,
                      color: 'amber' as const,
                      content: (
                        <>
                          Adds 40% more attack speed and makes the item{' '}
                          <Mod name="Soulbound" color="amber" />, traveling with you through death
                          and respawning on your body.
                        </>
                      ),
                    },
                  ].map(({ level, color, content }) => {
                    const borderBg = {
                      sky: 'border-sky-200 bg-sky-50 dark:border-sky-900/60 dark:bg-sky-950/20',
                      violet:
                        'border-violet-200 bg-violet-50 dark:border-violet-900/60 dark:bg-violet-950/20',
                      amber:
                        'border-amber-200 bg-amber-50 dark:border-amber-900/60 dark:bg-amber-950/20',
                    }[color]
                    const labelColor = {
                      sky: 'text-sky-500 dark:text-sky-400',
                      violet: 'text-violet-500 dark:text-violet-400',
                      amber: 'text-amber-500 dark:text-amber-400',
                    }[color]
                    return (
                      <div
                        key={level}
                        className={`flex gap-4 rounded-lg border px-4 py-3 ${borderBg}`}
                      >
                        <span className={`mt-0.5 shrink-0 text-xs font-bold ${labelColor}`}>
                          LVL {level}
                        </span>
                        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                          {content}
                        </p>
                      </div>
                    )
                  })}
                </div>
                <figure className="space-y-2">
                  <div className="grid grid-cols-3 text-center">
                    {['Level 1', 'Level 2', 'Level 3'].map((label) => (
                      <span key={label} className="text-sm text-zinc-400">
                        {label}
                      </span>
                    ))}
                  </div>
                  <img
                    src={IMG.levelComparison}
                    alt="Diamond sword at attunement levels 1, 2, and 3 side by side"
                    className="w-full rounded-lg border border-zinc-200 object-contain dark:border-zinc-600"
                  />
                </figure>
              </div>

              <Divider />

              {/* Enhancement System */}
              <div className="space-y-4">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Enhancement System
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Attuning an item offers fun and powerful benefits. As you grow your bond, these
                  benefits grow as well. Benefits are cumulative: a level 3 item retains everything
                  granted at levels 1 and 2. Placing an attuned item back into the Nexus re-syncs
                  all modifications, so datapack changes take effect right away.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      name: 'Invulnerable',
                      border: 'border-sky-200 bg-sky-50 dark:border-sky-900/60 dark:bg-sky-950/20',
                      label: 'text-sky-500 dark:text-sky-400',
                      desc: 'The item cannot be destroyed by environmental effects (lava, cacti, etc.) and will never despawn when dropped.',
                    },
                    {
                      name: 'Unbreakable',
                      border:
                        'border-violet-200 bg-violet-50 dark:border-violet-900/60 dark:bg-violet-950/20',
                      label: 'text-violet-500 dark:text-violet-400',
                      desc: 'If the item has durability, it becomes unbreakable.',
                    },
                    {
                      name: 'Soulbound',
                      border:
                        'border-amber-200 bg-amber-50 dark:border-amber-900/60 dark:bg-amber-950/20',
                      label: 'text-amber-500 dark:text-amber-400',
                      desc: 'When you die, the item travels with you through death and respawns on your body.',
                    },
                  ].map(({ name, border, label, desc }) => (
                    <div key={name} className={`space-y-1.5 rounded-lg border p-4 ${border}`}>
                      <p className={`text-sm font-bold ${label}`}>{name}</p>
                      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Any attribute, including those added by other mods, can be applied at each
                  attunement level using the format:{' '}
                  <code className="font-mono text-xs">
                    attribute/modid:name/operation/value/slot
                  </code>
                  . See the Configuration tab for the full reference.
                </p>
              </div>

              <Divider />

              {/* Restriction System */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Restriction System
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  An attuneable item can be configured so it must be attuned before it can be used
                  in any way, or it can be usable as normal and attuning it just offers further
                  benefits. If attunement is required, the item cannot deal damage, break blocks, or
                  be used in any capacity (including drawing a bow or casting a fishing rod) until
                  it's attuned to you.
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Items that are attuned show complete allegiance to their owner. Other players
                  cannot use them in any capacity. You can also configure effects applied to players
                  who hold an attuned item that doesn't belong to them: slowness, poison, wither,
                  it's up to you.
                </p>
              </div>

              <Divider />

              {/* Curios Integration */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Curios Integration
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  With Curios installed, a new{' '}
                  <strong className="font-medium text-zinc-800 dark:text-zinc-100">
                    Attuned Item
                  </strong>{' '}
                  slot is added. Only items you are attuned to can be placed here; use it to store
                  attuned items you aren't actively using for quick swapping.{' '}
                  <Mod name="Soulbound" color="amber" /> items will stay in this slot on death.
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  To change the number of Curio slots (default: 1), override{' '}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-600">
                    data/artifactory/curios/slots/attuned_item.json
                  </code>{' '}
                  in your datapack and set the <code className="font-mono text-xs">size</code> field
                  to your desired value.
                </p>
              </div>

              <Divider />

              {/* Use Cases */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Use Cases
                </p>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Create a fun bonding system',
                      desc: 'Build a system where players grow a bond with a weapon and gain cool, entirely customizable benefits as that bond deepens. The items you create will be legendary.',
                    },
                    {
                      title: 'Limit items that are too powerful',
                      desc: 'Many mods add items that are fun but break the game. This becomes especially noticeable when a player amasses too many of them and combat or exploration becomes trivial. Use attunement slots to force a choice: more individual lower-power items, or a few powerful ones. Pairs great with the mythic weapons from Simply Swords.',
                    },
                    {
                      title: 'Make older items more desirable',
                      desc: 'Instead of tossing your iron sword for a diamond one, attune it and gain special benefits as the bond grows: unbreakable, attack bonuses, soulbound. Throw on some enchantments and you could create a very powerful item. Diamond swords may gain different benefits, or may not be attuneable at all, creating a richer item economy.',
                    },
                  ].map(({ title, desc }) => (
                    <div key={title} className="flex gap-3">
                      <span className="mt-1 shrink-0 text-zinc-300 dark:text-zinc-500">◆</span>
                      <div>
                        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                          {title}
                        </p>
                        <p className="mt-1 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                          {desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Getting Started content */}
          {activeTab === 'getting-started' && (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-600">
              {/* Attunable items */}
              <div className="space-y-4 p-6">
                <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  Attunable Items
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Once an item is configured to be attuneable, it shows how many attunement slots it
                  will reserve when you attune to it. If the item has a chance of being attunable
                  (e.g. "Attunable (40%)"), that is determined the first time you place it in the
                  Nexus. This is a one-time check: if it fails, that item will behave as a
                  completely normal item and can never be attuned.
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  If the item was configured to require attunement before use, it will say
                  "Attunable (Required)". This makes the item unusable in any way until attuned: no
                  damage, no block breaking, no drawing a bow, no casting a fishing rod.
                </p>
                <div className="flex justify-center">
                  <figure className="space-y-2">
                    <img
                      src={IMG.unattunedSword}
                      alt="Unattuned diamond sword tooltip showing 'Attunable (2 slots)'"
                      className="mx-auto w-1/2 rounded-lg border border-zinc-200 dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      An attunable item before bonding
                    </figcaption>
                  </figure>
                </div>
              </div>

              {/* Build the nexus */}
              <div className="space-y-4 p-6">
                <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  Building the Attunement Nexus
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  The Attunement Nexus is where all attunements are performed. Craft it using the
                  default recipe:
                </p>
                <div className="flex justify-center">
                  <figure className="space-y-2">
                    <img
                      src={IMG.nexusRecipe}
                      alt="Attunement Nexus crafting recipe"
                      className="rounded-lg border border-zinc-200 dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      Default Attunement Nexus recipe
                    </figcaption>
                  </figure>
                </div>
              </div>

              {/* Using the nexus */}
              <div className="space-y-4 p-6">
                <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  Using the Attunement Nexus
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Place an attunable item in the center slot to see its details and requirements. If
                  you meet all requirements, you can start the attunement process. After it
                  completes it will consume any required levels and items, then bond the item to
                  you. The first time you bond an item it reserves the number of attunement slots it
                  requires. If you don't have enough slots available you won't be able to bond it.
                </p>
                <div className="flex justify-center">
                  <img
                    src={IMG.nexusUI}
                    alt="Attunement Nexus UI showing item requirements and details"
                    className="rounded-lg border border-zinc-200 dark:border-zinc-600"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <ul className="space-y-1.5">
                      {[
                        'Attunement level (or "Not yet attuned")',
                        'Slots reserved by this item',
                        'Your available attunement slots',
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-300"
                        >
                          <span className="mt-0.5 shrink-0 text-sky-400">●</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <ul className="space-y-1.5">
                      {[
                        'XP levels consumed on attunement',
                        'XP threshold required to start',
                        'Items required to attune',
                        'Red (i) icon, hover for details on blockers',
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-300"
                        >
                          <span className="mt-0.5 shrink-0 text-rose-400">●</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Managing attunements */}
              <div className="space-y-4 p-6">
                <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  Managing Attunements
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  View and manage all your current attunements from the Manage Attunements screen.
                  Open it via the cog wheel in the Attunement Nexus, or press the hotkey (default{' '}
                  <kbd className="rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] dark:border-zinc-500 dark:bg-zinc-600">
                    O
                  </kbd>
                  ).
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <figure className="space-y-2">
                    <img
                      src={IMG.maxLevelCard}
                      alt="Manage attunements screen showing a max-level item"
                      className="w-full rounded-lg border border-zinc-200 object-contain dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      Max level attunement card
                    </figcaption>
                  </figure>
                  <figure className="space-y-2">
                    <img
                      src={IMG.levelDetails}
                      alt="Hover tooltip showing what each attunement level added"
                      className="w-full rounded-lg border border-zinc-200 object-contain dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      Hover the (i) icon to see what each level added
                    </figcaption>
                  </figure>
                </div>
                <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 dark:border-rose-900/60 dark:bg-rose-950/20">
                  <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                    <strong className="text-zinc-800 dark:text-zinc-100">
                      Breaking attunements:
                    </strong>{' '}
                    Hover an item card and press the red X on the right side, then confirm the
                    prompt. This removes all benefits gained from attuning but keeps all other stats
                    like enchantments and modifications from other mods. You get your attunement
                    slots back and the item can be attuned to by anyone again.{' '}
                    <span className="font-medium text-rose-500">This cannot be reversed.</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Datapack Configuration content */}
          {activeTab === 'datapack' && (
            <div className="space-y-6 p-6">
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                Configurations live at{' '}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-600">
                  data/&lt;modid&gt;/artifactory/&lt;item_name&gt;.json
                </code>
                . Use the JSON / Datapack Builder tool (link on the right) to generate files with live
                validation and preview.
              </p>

              {/* Example JSON */}
              <div className="space-y-2">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Example: diamond_sword.json (1.21.1)
                </p>
                <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-xs leading-relaxed text-zinc-300">{`{
  "slots_used": 4,
  "use_without_attunement": false,
  "chance": 0.4,
  "replace": true,
  "attunement_levels": [
    {
      "modifications": [
        "invulnerable",
        "unbreakable",
        "attribute/minecraft:generic.attack_damage/add_value/5/mainhand"
      ],
      "requirements": {
        "items": ["minecraft:diamond_sword", "minecraft:diamond#10", "minecraft:nether_star"]
      }
    },
    {
      "modifications": [
        "soulbound",
        "attribute/minecraft:generic.attack_speed/add_multiplied_base/.5/mainhand",
        "attribute/minecraft:generic.attack_damage/add_value/7/mainhand"
      ],
      "requirements": {
        "xpLevelsConsumed": 45,
        "xpLevelThreshold": 55,
        "items": ["minecraft:dragon_egg"]
      }
    }
  ]
}`}</pre>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Here is what that looks like once attuned in game:
                </p>
              </div>
              <div className="flex justify-center">
                <figure className="space-y-2">
                  <img
                    src={IMG.level2Tooltip}
                    alt="Level 2 attuned diamond sword tooltip"
                    className="rounded-lg border border-zinc-200 dark:border-zinc-600"
                  />
                  <figcaption className="text-center text-sm text-zinc-400">
                    A level 2 attuned diamond sword
                  </figcaption>
                </figure>
              </div>
              {/* Field reference */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Field Reference
                </p>
                <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
                  {[
                    {
                      field: 'slots_used',
                      default: '-1',
                      desc: 'How many attunement slots this item takes up when attuned. If you leave this off (or set -1) it will void the attunement configuration for this item entirely. This is how you overwrite and remove attunement info from another datapack.',
                    },
                    {
                      field: 'use_without_attunement',
                      default: 'true',
                      desc: "Whether the item is usable before attuning. false means the item will do no damage, can't break blocks, and can't be used in any way (like drawing a bow) until attuned. true means attuning is optional and just offers further benefits.",
                    },
                    {
                      field: 'chance',
                      default: '1.0',
                      desc: 'Probability (0.0 to 1.0) that the item can be attuned. Determined once the first time it is placed in the Nexus. This is a one-time check: if it fails, that item will never be attunable.',
                    },
                    {
                      field: 'replace',
                      default: 'false',
                      desc: "Whether this config should replace any existing config for this item. If there's a conflict with another datapack, set this to true. As a modpack maker you may as well add this to all your configs to make sure yours are the ones used.",
                    },
                    {
                      field: 'apply_to_items',
                      default: '[]',
                      desc: "List of item IDs to apply this config to. When set, the filename is ignored and the config applies to all items in this list instead. Useful for a full armor set. Make sure attribute equipment slots match the item type or attributes won't apply correctly.",
                    },
                    {
                      field: 'attunement_levels',
                      default: 'single level',
                      desc: 'Ordered array of level configs. The first object applies to level 1, the second to level 2, and so on. Each has modifications (what the item gains) and optional requirements to override server config values. Defaults to a single level granting invulnerable, unbreakable, and soulbound.',
                    },
                  ].map(({ field, default: def, desc }, i, arr) => (
                    <div
                      key={field}
                      className={`px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-600' : ''}`}
                    >
                      <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <code className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">
                          {field}
                        </code>
                        <span className="text-sm text-zinc-400">default: {def}</span>
                      </div>
                      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements sub-fields */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Level Requirements Sub-fields
                </p>
                <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
                  {[
                    {
                      field: 'xp_levels_consumed',
                      desc: 'XP levels consumed when the attunement completes. Defaults to -1 (uses server config value).',
                    },
                    {
                      field: 'xp_level_threshold',
                      desc: 'Minimum XP level required to start attunement. Not consumed. Defaults to -1 (uses server config value).',
                    },
                    {
                      field: 'items',
                      desc: 'Up to 3 items consumed on attunement. Format: "modid:item_name" or "modid:item_name#quantity". Quantity defaults to 1.',
                    },
                  ].map(({ field, desc }, i, arr) => (
                    <div
                      key={field}
                      className={`px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-600' : ''}`}
                    >
                      <div className="mb-1.5">
                        <code className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">
                          {field}
                        </code>
                      </div>
                      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modifications Sub-fields */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Modifications Sub-fields
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Each entry in <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono dark:bg-zinc-600">modifications</code> is a string. There are three named modifications and one structured attribute modification type:
                </p>
                <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
                  {[
                    {
                      field: 'invulnerable',
                      desc: "The item cannot be destroyed by environmental effects (lava, cacti, etc.) and will never despawn when dropped.",
                    },
                    {
                      field: 'unbreakable',
                      desc: 'If the item has durability, it becomes unbreakable.',
                    },
                    {
                      field: 'soulbound',
                      desc: 'When you die, the item travels with you through death and respawns on your body.',
                    },
                    {
                      field: 'attribute/modid:name/operation/value/slot',
                      desc: 'Grants an attribute bonus when this attunement level is reached. All five segments are required. See the Attribute Format reference below.',
                    },
                  ].map(({ field, desc }, i, arr) => (
                    <div
                      key={field}
                      className={`px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-600' : ''}`}
                    >
                      <div className="mb-1.5">
                        <code className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">
                          {field}
                        </code>
                      </div>
                      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Attribute format detail */}
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Attribute Format
                </p>
                <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-xs leading-relaxed text-zinc-300">{`attribute / modid:attributename / operation / value / equipmentslot

Example (1.21.1):  attribute/minecraft:generic.attack_damage/add_value/5/mainhand
Example (1.20.1):  attribute/minecraft:generic.attack_damage/addition/5/mainhand`}</pre>
                <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
                  <div className="border-b border-zinc-100 px-4 py-3.5 dark:border-zinc-600">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <code className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">operation</code>
                    </div>
                    <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                      <span className="font-semibold text-zinc-500 dark:text-zinc-400">1.20.1:</span>{' '}
                      <code className="font-mono text-xs">addition</code>,{' '}
                      <code className="font-mono text-xs">multiply_base</code>,{' '}
                      <code className="font-mono text-xs">multiply_total</code>
                    </p>
                    <p className="mt-1 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                      <span className="font-semibold text-zinc-500 dark:text-zinc-400">1.21.1:</span>{' '}
                      <code className="font-mono text-xs">add_value</code>,{' '}
                      <code className="font-mono text-xs">add_multiplied_base</code>,{' '}
                      <code className="font-mono text-xs">add_multiplied_total</code>
                    </p>
                  </div>
                  <div className="px-4 py-3.5">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <code className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">equipmentslot</code>
                    </div>
                    <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                      <code className="font-mono text-xs">mainhand</code>,{' '}
                      <code className="font-mono text-xs">offhand</code>,{' '}
                      <code className="font-mono text-xs">feet</code>,{' '}
                      <code className="font-mono text-xs">legs</code>,{' '}
                      <code className="font-mono text-xs">chest</code>,{' '}
                      <code className="font-mono text-xs">head</code>
                      {' '}(all versions){' '}
                      <span className="mx-1 text-zinc-300 dark:text-zinc-500">|</span>{' '}
                      <code className="font-mono text-xs">hand</code>,{' '}
                      <code className="font-mono text-xs">body</code>,{' '}
                      <code className="font-mono text-xs">armor</code>,{' '}
                      <code className="font-mono text-xs">any</code>
                      {' '}(1.21.1+ only)
                    </p>
                    <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                      Make sure the slot matches the item type. A helmet configured with{' '}
                      <code className="font-mono text-xs">mainhand</code> will not grant its attributes when equipped.
                    </p>
                  </div>
                </div>
              </div>

              {/* Attunement Overrides */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                    Attunement Overrides
                  </p>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-500 dark:bg-zinc-600 dark:text-zinc-300">
                    1.21.1+
                  </span>
                </div>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Define unique attunement configurations on individual item stacks using the{' '}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-600">
                    artifactory:attunement_override
                  </code>{' '}
                  data component. Works with <code className="font-mono text-xs">/give</code>,
                  advancements, loot tables, KubeJS, and more. This overrides any datapack config
                  for that item type, allowing unique one-off items with their own attunement rules.
                </p>
                <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap text-zinc-300">{`/give @p minecraft:mace[artifactory:attunement_override={
  use_without_attunement: false,
  chance: 0.5,
  slots_used: 5,
  attunement_levels: [{
    requirements: { items: ["minecraft:diamond#64"] },
    modifications: [invulnerable, unbreakable, soulbound]
  }]
}]`}</pre>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  This creates a mace with a 50% chance of being attunable, using 5 slots, requiring
                  64 diamonds, and granting all three core modifications on attunement.
                </p>
              </div>
            </div>
          )}
          {/* FAQ content */}
          {activeTab === 'faq' && (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-600">
              {[
                {
                  q: 'Will you make this for Fabric?',
                  a: "I will not be porting to Fabric, but anyone is welcome to do so! For Forge I will only be supporting 1.20.1, and I will be porting to NeoForge going forward on 1.21. I don't have the time to manage too many different versions of this.",
                },
                {
                  q: 'Will you backport to older Minecraft versions?',
                  a: 'Unless it sees a lot of interest I will only be developing on 1.20.1 and forward.',
                },
                {
                  q: 'Can I use this on my server or modpack?',
                  a: 'Of course!',
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

        {/* JSON / Datapack Builder sidebar: absolutely placed so it never affects the centered card */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-[calc(50%+26rem+1.5rem)] hidden w-[18rem] xl:block [&>*]:pointer-events-auto">
          <div className="sticky top-20 flex flex-col gap-4">
            <ToolLinkCard
              to="/artifactory/config-generator"
              title="JSON / Datapack Builder"
              description="Generate attunement config files with live validation and preview."
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
              curseforgeUrl="https://www.curseforge.com/minecraft/mc-mods/artifactory"
              modrinthUrl="https://modrinth.com/mod/artifactory-mod"
              discordUrl="https://discord.gg/cpRzXtSaSr"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
