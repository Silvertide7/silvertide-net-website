import { useState } from 'react'
import { DownloadLinks } from '../components/DownloadLinks'
import { VerticalTabNav } from '../components/VerticalTabNav'

const IMG = {
  banner: '/homebound/title.png',
  creativeTab: '/homebound/creative-tab.jpg',
}

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <section
    className={`overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700 ${className}`}
  >
    {children}
  </section>
)

const Divider = () => <hr className="border-zinc-100 dark:border-zinc-600" />

type Tab = 'overview' | 'getting-started' | 'faq'

const TABS = [
  { id: 'overview' as const, label: 'Overview' },
  { id: 'getting-started' as const, label: 'Getting Started' },
  { id: 'faq' as const, label: 'FAQ' },
] satisfies readonly { id: Tab; label: string }[]

const items = [
  {
    name: 'Homeward Stone',
    img: '/homebound/items/homeward_stone.png',
    desc: 'The basic home warping item. It takes some exploration to find the materials, but it will be worth it. Has a 1 hour cooldown.',
  },
  {
    name: 'Haven Stone',
    img: '/homebound/items/haven_stone.png',
    desc: 'An upgrade to the Homeward Stone that removes the dimensional teleport restriction. Requires 2 netherite ingots and 6 nether brick, so you will need to adventure through the Nether first.',
  },
  {
    name: 'Homeward Bone',
    img: '/homebound/items/homeward_bone.png',
    desc: 'Teleports you home from anywhere but is consumed on use and has a hefty 2 hour cooldown. Easy to craft on the fly from mob drops, so it is great for escaping a bad situation when you do not have your stone handy.',
  },
  {
    name: 'Hearthwood',
    img: '/homebound/items/hearthwood.png',
    desc: 'Can only be used within 160 blocks (10 chunks) of your home and is not enchantable, but has a 10 minute cooldown and a 2 second use time. Meant to make moving around your base a little easier.',
  },
  {
    name: 'Dusk Stone',
    img: '/homebound/items/nightstone.png',
    desc: 'One of 2 upgrade paths from the Haven Stone. The cooldown scales based on distance from home, with a minimum of 15 minutes. For every 50 blocks away from home the cooldown increases by 1 minute, up to 1 hour max.',
  },
  {
    name: 'Twilight Stone',
    img: '/homebound/items/dusk_stone.png',
    desc: 'The direct upgrade to the Dusk Stone. Only slightly better stat-wise, but also does not drop on death.',
  },
]

export const Homebound = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <img
          src={IMG.banner}
          alt="Homebound"
          className="max-w-sm rounded-xl object-contain shadow-sm"
        />
      </div>

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

          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-5 p-6">
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                Homebound adds items that let you set a home and teleport there without completely
                trivializing transportation and danger in Minecraft.
              </p>
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                I've found that most home mods make the game too easy. Having access to instant
                teleportation or teleportation to too many places stops you from ever needing to
                solve many fun creative problems in the game. It also makes it too easy to escape
                death with a quick <code className="font-mono text-xs">/home</code>. This mod solved
                that issue for me, hopefully you enjoy it as well!
              </p>
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                Almost everything about the mod and the items it adds is configurable. Homebound was
                designed to have minimal impact on performance and should be compatible with all
                other mods.
              </p>

              <Divider />

              {/* Items */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Items
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Each Homebound item has a combination of cooldown, warp distance restrictions,
                  dimensional travel restrictions, and use times. Upgraded items remove restrictions
                  or reduce cooldowns and use times. I recommend using JEI/REI to make crafting
                  easier!
                </p>
                <div className="space-y-2">
                  {items.map(({ name, img, desc }) => (
                    <div
                      key={name}
                      className="flex items-center gap-3 rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3 dark:border-zinc-600 dark:bg-zinc-600/30"
                    >
                      <img
                        src={img}
                        alt={name}
                        className="h-12 w-12 shrink-0 rounded object-contain"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      <div>
                        <p className="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                          {name}
                        </p>
                        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                          {desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  There are a few more items to discover as well.
                </p>
                <div className="flex justify-center">
                  <figure className="space-y-2">
                    <img
                      src={IMG.creativeTab}
                      alt="Homebound creative tab showing all items"
                      className="rounded-lg border border-zinc-200 dark:border-zinc-600"
                    />
                    <figcaption className="text-center text-sm text-zinc-400">
                      All Homebound items in the creative tab
                    </figcaption>
                  </figure>
                </div>
              </div>

              <Divider />

              {/* Enchantments */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Enchantments
                </p>
                <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
                  {[
                    {
                      name: 'Haste',
                      desc: 'Decreases the use time of the item by 10% per level. 3 levels.',
                    },
                    {
                      name: 'Cooldown',
                      desc: 'Decreases the warp cooldown of the item by 5% per level. 4 levels.',
                    },
                  ].map(({ name, desc }, i, arr) => (
                    <div
                      key={name}
                      className={`px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-600' : ''}`}
                    >
                      <p className="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                        {name}
                      </p>
                      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Divider />

              {/* Planned features */}
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                  Planned Features
                </p>
                <div className="space-y-2">
                  {[
                    'Add player attributes that also reduce cooldown and cast time.',
                    'Possibly add new upgraded stones.',
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
              </div>
            </div>
          )}

          {/* Getting Started */}
          {activeTab === 'getting-started' && (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-600">
              {/* Core mechanics */}
              <div className="space-y-4 p-6">
                <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  Setting a Home
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  When you have a Homebound item in your hand, crouch and use the item to set your
                  home.
                </p>
              </div>

              <div className="space-y-4 p-6">
                <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  Teleporting Home
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Use a Homebound item directly, or press{' '}
                  <kbd className="rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] dark:border-zinc-500 dark:bg-zinc-600">
                    H
                  </kbd>{' '}
                  (by default) with a Homebound Stone in your inventory or Curios slot to begin the
                  teleport. Most items take around 10 seconds to channel by default; this can be
                  changed in the configs or modified with enchantments.
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Hover over the item and press{' '}
                  <kbd className="rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] dark:border-zinc-500 dark:bg-zinc-600">
                    Shift
                  </kbd>{' '}
                  to see more information about it, like any restrictions, use time, and cooldown.
                </p>
                <div className="space-y-2.5">
                  {[
                    {
                      label: 'Shared cooldown',
                      detail:
                        'Teleporting triggers a global cooldown based on the item you used. This cooldown is shared across all Homebound items. You cannot build multiple stones and use them in rotation.',
                      color: 'text-violet-400',
                    },
                    {
                      label: 'Damage cancels the warp',
                      detail:
                        'Taking damage while channeling cancels the warp and adds a 5 second cooldown (configurable). No more cheating death with a quick teleport.',
                      color: 'text-rose-400',
                    },
                    {
                      label: 'Mounted pets travel with you',
                      detail: 'If you are mounted on a pet you own, it will teleport with you.',
                      color: 'text-sky-400',
                    },
                  ].map(({ label, detail, color }) => (
                    <div
                      key={label}
                      className="flex gap-3 rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3 dark:border-zinc-600 dark:bg-zinc-600/30"
                    >
                      <span className={`mt-0.5 shrink-0 text-sm ${color}`}>●</span>
                      <div>
                        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                          {label}
                        </p>
                        <p className="mt-0.5 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                          {detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commands */}
              <div className="space-y-4 p-6">
                <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Commands</h3>
                <div className="space-y-3">
                  <p className="text-sm font-semibold tracking-wide text-zinc-400 uppercase">
                    Admin
                  </p>
                  <div className="space-y-2">
                    {[
                      '/homebound admin <target> clear cooldown',
                      '/homebound admin <target> clear home',
                    ].map((cmd) => (
                      <pre
                        key={cmd}
                        className="overflow-x-auto rounded-lg bg-zinc-900 px-4 py-2.5 font-mono text-xs text-zinc-300"
                      >
                        {cmd}
                      </pre>
                    ))}
                  </div>
                  <p className="text-sm font-semibold tracking-wide text-zinc-400 uppercase">
                    Player
                  </p>
                  <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                    View your home's dimension, coordinates, and any remaining cooldown:
                  </p>
                  <pre className="overflow-x-auto rounded-lg bg-zinc-900 px-4 py-2.5 font-mono text-xs text-zinc-300">
                    /homebound info
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* FAQ */}
          {activeTab === 'faq' && (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-600">
              {[
                {
                  q: 'Will you make this for Fabric?',
                  a: "This is a Forge-only mod for now. I don't have the time to learn Fabric at the moment. I will probably jump ship to NeoForge when it is more mature, as will most developers probably.",
                },
                {
                  q: 'Will you backport to older Minecraft versions?',
                  a: "It would probably be fairly easy to backport to 1.19 and maybe 1.18, but I don't have the time as I'm working on other mods and a custom modpack. The more traction this gets the more likely I add some back ports. I would not go further back than 1.18 however.",
                },
                {
                  q: 'Can I use this on my server or modpack?',
                  a: "Of course, that's why I made it! Just please give credit if possible. You may not use this to make money off of in any way.",
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

        {/* Download links sidebar: absolutely placed so it never affects the centered card */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-[calc(50%+26rem+1.5rem)] hidden w-[18rem] xl:block [&>*]:pointer-events-auto">
          <div className="sticky top-20">
            <DownloadLinks
              curseforgeUrl="https://www.curseforge.com/minecraft/mc-mods/homebound"
              modrinthUrl="https://modrinth.com/mod/homebound-mod"
              discordUrl="https://discord.gg/cpRzXtSaSr"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
