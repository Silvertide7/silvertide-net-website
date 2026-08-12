import { useState } from 'react'
import { DownloadLinks } from '../components/DownloadLinks'
import { ToolLinkCard } from '../components/ToolLinkCard'
import { VerticalTabNav } from '../components/VerticalTabNav'

const IMG = {
  title: '/mortal-boons/mortal_boons_title.png',
  logo: '/mortal-boons/mortal_boons_logo.png',
  recipe: '/mortal-boons/fatestone_crafting_recipe.png',
  power1: '/mortal-boons/fatestone_power_1.png',
  power2: '/mortal-boons/fatestone_power_2.png',
  power3: '/mortal-boons/fatestone_power_3.png',
  temptFate: '/mortal-boons/no_boons_tempt_fate_button.png',
  offerings: '/mortal-boons/highlight_tempt_fate_button_show_offerings.png',
  cardSingle: '/mortal-boons/single_boon_iron_titans_arm_0.5_knockback_card.png',
  cardHover: '/mortal-boons/single_boon_iron_titans_arm_0.5_knockback_card_hover_text.png',
  cardsThree: '/mortal-boons/three_boons_showing_full_cards_gold_diamond_netherite.png',
  cardButtons:
    '/mortal-boons/two_boons_gold_stonebreaker_4_mining_efficiency_hover_card_reroll_forsake_buttons.png',
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

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">{children}</p>
)

const Body = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">{children}</p>
)

const BulletList = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="space-y-1.5">
    {items.map((item, i) => (
      <li key={i} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-300">
        <span className="mt-0.5 shrink-0 text-zinc-300 dark:text-zinc-500">✦</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

const Screenshot = ({
  src,
  alt,
  caption,
  className = '',
}: {
  src: string
  alt: string
  caption: string
  className?: string
}) => (
  <div className="flex justify-center">
    <figure className="space-y-2">
      <img src={src} alt={alt} className={`rounded-lg border border-zinc-200 dark:border-zinc-600 ${className}`} />
      <figcaption className="text-center text-sm text-zinc-400">{caption}</figcaption>
    </figure>
  </div>
)

type Tab = 'overview' | 'configuration' | 'datapacks' | 'faq'

const TABS = [
  { id: 'overview' as const, label: 'Overview' },
  { id: 'configuration' as const, label: 'Configuration' },
  { id: 'datapacks' as const, label: 'Datapacks' },
  { id: 'faq' as const, label: 'FAQ' },
] satisfies readonly { id: Tab; label: string }[]

const configCategories = [
  {
    name: 'Roll costs',
    knobs: 'Base XP level cost, added cost per roll, and a max cost cap. Costs reset on death.',
  },
  {
    name: 'Temper / Reroll / Forsake costs',
    knobs:
      'Base, per-use, and max XP costs for each action, plus an option to share the reroll and temper counters.',
  },
  {
    name: 'Death',
    knobs:
      'How many boons death claims, chosen at random. Defaults to all 3. Set it to 1 or 2 to lose only part of what you hold, or 0 to make boons permanent.',
  },
  {
    name: 'Cooldowns',
    knobs:
      'Minutes of cooldown with 1, 2, and 3 boons held (defaults 10 / 20 / 30). Shared across all actions and kept through death.',
  },
  {
    name: 'Action gating',
    knobs:
      'Allow reroll, temper, and forsake individually, and set the Fatestone power and held boon count each one requires.',
  },
  {
    name: 'Offerings',
    knobs: 'Required (default), optional, or disabled entirely.',
  },
  {
    name: 'Tier odds',
    knobs: 'Weights for Iron, Gold, Diamond, and Netherite rolls (defaults 40 / 30 / 20 / 10).',
  },
]

const signs = [
  { name: 'The Bear', color: '#6B4A2A', darkColor: '#C89A6B', focus: 'Endurance. Health, armor, toughness, knockback resistance.' },
  { name: 'The Wolf', color: '#8C2F2F', darkColor: '#D97B7B', focus: 'Violence. Attack damage, attack speed, knockback, sweeping.' },
  { name: 'The Hare', color: '#3E7C44', darkColor: '#7BC98A', focus: 'Speed. Movement, jumping, safe falling, rough terrain.' },
  { name: 'The Wyrm', color: '#A85A1E', darkColor: '#E89B57', focus: 'Fire, stone and deep water. Burns, blasts, oxygen, mining.' },
  { name: 'The Raven', color: '#4A3A6B', darkColor: '#A48FD9', focus: 'Sight and fortune. Reach, sneak speed, luck.' },
]

const commands = [
  ['/mortalboons list', 'list your held boons and tiers'],
  ['/mortalboons clear', 'wipe your boons and reset the cooldown'],
] as const

export const MortalBoons = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <img
          src={IMG.title}
          alt="Mortal Boons"
          className="max-w-md rounded-xl object-contain shadow-sm"
        />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute top-0 right-[calc(50%+26rem+1.5rem)] bottom-0 hidden w-[12rem] xl:block [&>*]:pointer-events-auto">
          <VerticalTabNav tabs={TABS} activeTab={activeTab} onSelect={setActiveTab} />
        </div>

        <Card className="mx-auto xl:w-[52rem]">
          <div className="flex gap-1.5 border-b border-zinc-100 bg-zinc-50 px-4 py-3 xl:hidden dark:border-zinc-600 dark:bg-zinc-800/40">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                aria-current={activeTab === id ? 'page' : undefined}
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
              <Body>
                Most progression is permanent. Once you have the gear, the enchants, the effects,
                dying is an inconvenience. Mortal Boons adds a layer of power that is genuinely at
                stake. You get strong, you get attached, and then you get careless. It fits any
                pack where death should mean something, and the configs let you tune how harsh
                that is.
              </Body>

              <Body>
                Mortal Boons adds a rogue-like boon mechanic to Minecraft. Pay experience levels
                and item offerings at the Fatestone to roll a random boon: attribute bonuses like
                health, speed, or attack damage, each at a random tier. You can hold up to three at
                once. When you die, you lose all of them. Add more reasons to stay alive.
              </Body>

              <Divider />

              <div className="space-y-3">
                <SectionLabel>See it in action</SectionLabel>
                <div
                  className="relative w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600"
                  style={{ padding: '56.25% 0 0 0' }}
                >
                  <iframe
                    src="https://www.youtube.com/embed/1544R4yWa2s"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    title="Mortal Boons Demo"
                    className="absolute top-0 left-0 h-full w-full border-0"
                  />
                </div>
                <p className="text-center text-sm text-zinc-400">
                  A two minute tour: placing the Fatestone, empowering it with candles and a
                  beacon, rolling boons, hitting the cooldown, and trying reroll and temper.
                </p>
              </div>

              <Divider />

              <div className="space-y-3">
                <SectionLabel>Craft the Fatestone</SectionLabel>
                <Body>
                  Everything happens at the Fatestone. Craft it with deepslate bricks, gold ingots,
                  and an eye of ender, place it down, and right click to open the menu. A fresh
                  Fatestone has one boon slot.
                </Body>
                <Screenshot
                  src={IMG.recipe}
                  alt="Fatestone crafting recipe"
                  caption="Deepslate bricks, gold, and an eye of ender"
                />
              </div>

              <Divider />

              <div className="space-y-3">
                <SectionLabel>Empower it</SectionLabel>
                <Body>
                  The Fatestone has three power levels, and each level grants another boon slot.
                  Ring its back and both sides with lit candles for +1 power, and place it directly
                  on top of a beacon for another +1. The two are independent: either alone gets you
                  power 2, both together get you power 3. At power 3 its eyes open and it gives off
                  light.
                </Body>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Screenshot src={IMG.power1} alt="Fatestone at power 1" caption="Power 1: dormant" />
                  <Screenshot src={IMG.power2} alt="Fatestone at power 2" caption="Power 2: waking" />
                  <Screenshot src={IMG.power3} alt="Fatestone at power 3" caption="Power 3: awakened" />
                </div>
                <BulletList
                  items={[
                    'Power gates the deeper actions: tempering unlocks at power 2, rerolling at power 3 (configurable).',
                    'Weakening the setup never removes boons you already hold. It just locks slots and actions until you restore it.',
                  ]}
                />
              </div>

              <Divider />

              <div className="space-y-3">
                <SectionLabel>Tempt Fate</SectionLabel>
                <Body>
                  Put an offering in the slot and hit Tempt Fate. Each roll costs experience levels
                  and the offering item, and each successive roll costs more. The button tells you
                  exactly why you can't roll if something is missing.
                </Body>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Screenshot
                    src={IMG.temptFate}
                    alt="The Tempt Fate button on an empty slot"
                    caption="An empty slot waiting for a roll"
                  />
                  <Screenshot
                    src={IMG.offerings}
                    alt="The offering slot tooltip listing accepted items"
                    caption="Hover the slot to see accepted offerings"
                  />
                </div>
                <Body>
                  The roll picks a tier first (Iron, Gold, Diamond, or Netherite), then a boon from
                  that tier. Your offering shapes the odds:
                </Body>
                <BulletList
                  items={[
                    <>
                      <strong className="font-medium text-zinc-800 dark:text-zinc-100">
                        Iron ingot
                      </strong>
                      : a plain gift, fate decides alone.
                    </>,
                    <>
                      <strong className="font-medium text-zinc-800 dark:text-zinc-100">
                        Gold ingot / diamond
                      </strong>
                      : the stone leans toward that tier.
                    </>,
                    <>
                      <strong className="font-medium text-zinc-800 dark:text-zinc-100">
                        Honeycomb, phantom membrane, rabbit's foot, blaze powder, ender pearl
                      </strong>
                      : each triples the odds of one sign's boons.
                    </>,
                    'Nothing sways Netherite. The best rolls are always pure luck.',
                  ]}
                />
              </div>

              <Divider />

              <div className="space-y-3">
                <SectionLabel>Boons and the five signs</SectionLabel>
                <Body>
                  Every boon is an attribute bonus that scales with its tier, shown as a card in
                  the menu. Hover a card for full details and a bit of flavor.
                </Body>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Screenshot
                    src={IMG.cardSingle}
                    alt="A single Iron tier boon card"
                    caption="An Iron tier card"
                  />
                  <Screenshot
                    src={IMG.cardHover}
                    alt="A boon card hover tooltip"
                    caption="The hover tooltip"
                  />
                </div>
                <Body>The mod ships with 19 boons across five signs:</Body>
                <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
                  {signs.map(({ name, color, darkColor, focus }, i, arr) => (
                    <div
                      key={name}
                      className={`flex items-baseline gap-3 px-4 py-2.5 ${i < arr.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-600' : ''}`}
                    >
                      <span
                        className="shrink-0 text-sm font-semibold text-[color:var(--sign)] dark:text-[color:var(--sign-dark)]"
                        style={{ '--sign': color, '--sign-dark': darkColor } as React.CSSProperties}
                      >
                        {name}
                      </span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-300">{focus}</span>
                    </div>
                  ))}
                </div>
                <Body>
                  Some boons only appear at higher tiers. Fortune's Eye only answers to Diamond and
                  Netherite.
                </Body>
                <Screenshot
                  src={IMG.cardsThree}
                  alt="Gold, Diamond and Netherite tier cards side by side"
                  caption="Gold, Diamond, and Netherite tier cards"
                />
              </div>

              <Divider />

              <div className="space-y-3">
                <SectionLabel>Temper, Reroll, Forsake</SectionLabel>
                <Body>
                  Hover a held boon's card to see its actions. The card stays readable behind the
                  buttons, so you can weigh what you have before you change it. Each action costs
                  experience, and the cost goes up the more you use it.
                </Body>
                <Screenshot
                  src={IMG.cardButtons}
                  alt="A hovered card showing the reroll and forsake buttons"
                  caption="Action buttons appear when you hover a card"
                />
                <BulletList
                  items={[
                    <>
                      <strong className="font-medium text-zinc-800 dark:text-zinc-100">
                        Temper
                      </strong>
                      : keep the boon, reroll only its tier. It can fall as easily as it rises.
                      Unlocks at power 2 while holding 2 boons.
                    </>,
                    <>
                      <strong className="font-medium text-zinc-800 dark:text-zinc-100">
                        Reroll
                      </strong>
                      : trade the boon for a different one at a newly rolled tier. Unlocks at power
                      3 while holding 3 boons.
                    </>,
                    <>
                      <strong className="font-medium text-zinc-800 dark:text-zinc-100">
                        Forsake
                      </strong>
                      : cast the boon away and leave the slot empty. Off by default.
                    </>,
                    'All actions share one cooldown that scales with how many boons you hold. Buttons gray out when you cannot afford an action, and the tooltip tells you why.',
                  ]}
                />
              </div>

              <Divider />

              <div className="space-y-3">
                <div className="flex justify-center py-2">
                  <img
                    src={IMG.logo}
                    alt="Mortal Boons logo"
                    className="w-32 object-contain opacity-90"
                  />
                </div>
                <SectionLabel>Death</SectionLabel>
                <Body>
                  By default, death wipes every boon you hold. That is the core of the mod: boons
                  make you powerful, but the power is never really yours. Your escalating roll costs
                  reset on death too, so climbing back up is cheaper than it was on the way down.
                  The cooldown survives death, you cannot die your way out of waiting.
                </Body>
                <Body>
                  How much death takes is a config. Set it to claim 1 or 2 boons instead of all 3
                  and you keep part of what you built, or set it to 0 and boons become permanent
                  progression instead of a gamble.
                </Body>
              </div>

            </div>
          )}

          {activeTab === 'configuration' && (
            <div className="space-y-6 p-6">
              <div className="space-y-3">
                <SectionLabel>Configuration</SectionLabel>
                <Body>
                  Everything lives in <Code>mortal_boons-common.toml</Code>, editable in game
                  through the mod config screen:
                </Body>
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
                <Body>
                  There is also a client option to hide the sign names on cards.
                </Body>
              </div>

              <Divider />

              <div className="space-y-3">
                <SectionLabel>Commands</SectionLabel>
                <Body>For server admins and debugging:</Body>
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

          {activeTab === 'datapacks' && (
            <div className="space-y-6 p-6">
              <div className="space-y-3">
                <SectionLabel>Everything is data</SectionLabel>
                <Body>
                  Boons, signs, and offerings are all datapack JSON. Names, descriptions, colors,
                  weights, tier gating, and offering effects live in data files, so you can retune
                  or replace everything without touching code or shipping a resource pack. The
                  built-in content ships as a removable datapack called{' '}
                  <Code>Mortal Boons Default Boons</Code>; disable it and you have a blank slate.
                </Body>
                <Body>
                  The Datapack Builder on this site generates all three file types with live
                  validation and bundles them into a ready-to-use zip.
                </Body>
                <BulletList
                  items={[
                    <>
                      <Code>data/&lt;namespace&gt;/mortal_boons/boons/</Code> defines boons:
                      per-tier weights, attribute grants, icon, name, description, signs.
                    </>,
                    <>
                      <Code>data/&lt;namespace&gt;/mortal_boons/boon_types/</Code> defines signs
                      (called boon_types in data): title and color.
                    </>,
                    <>
                      <Code>data/&lt;namespace&gt;/mortal_boons/offerings/</Code> defines
                      offerings: item or tag, count, tier multipliers, sign multipliers, minimum
                      tier, description.
                    </>,
                  ]}
                />
                <Body>
                  Anywhere a number is accepted, you can give either a single value (used for every
                  tier) or a list of 4 values indexed from Iron to Netherite.
                </Body>
              </div>

              <Divider />

              <div className="space-y-3">
                <SectionLabel>Example boon</SectionLabel>
                <pre className="overflow-x-auto rounded-lg bg-zinc-900 px-4 py-3 font-mono text-xs leading-relaxed text-zinc-300">
                  {`{
  "weight": 10,
  "types": ["mortal_boons:hare"],
  "icon": "minecraft:textures/item/rabbit_foot.png",
  "name": "Springstep",
  "description": "Up comes easy. Down comes kind.",
  "attribute_grants": [
    {
      "attribute": "minecraft:generic.jump_strength",
      "amount": [0.2, 0.35, 0.5, 0.7],
      "operation": "add_value"
    }
  ]
}`}
                </pre>
                <BulletList
                  items={[
                    <>
                      <Code>weight</Code> controls how likely the boon is once its tier is rolled.
                      Use a list to gate tiers: <Code>[0, 0, 10, 10]</Code> means Diamond and
                      Netherite only.
                    </>,
                    <>
                      <Code>name</Code> and <Code>description</Code> are optional; without a name
                      the mod falls back to the lang key{' '}
                      <Code>boon.&lt;namespace&gt;.&lt;file_name&gt;</Code>.
                    </>,
                    <>
                      With Player Abilities installed, boons can also grant abilities via{' '}
                      <Code>ability_grants</Code> with a per-tier level. Ability-only boons are
                      removed from the pool when Player Abilities is not installed.
                    </>,
                  ]}
                />
              </div>

              <Divider />

              <div className="space-y-3">
                <SectionLabel>Example sign and offering</SectionLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  <pre className="overflow-x-auto rounded-lg bg-zinc-900 px-4 py-3 font-mono text-xs leading-relaxed text-zinc-300">
                    {`{
  "title": "The Hare",
  "color": "#3E7C44"
}`}
                  </pre>
                  <pre className="overflow-x-auto rounded-lg bg-zinc-900 px-4 py-3 font-mono text-xs leading-relaxed text-zinc-300">
                    {`{
  "item": { "item": "minecraft:gold_ingot" },
  "count": 1,
  "tier_weight_multiplier": [1.0, 2.0, 1.0, 1.0]
}`}
                  </pre>
                </div>
                <BulletList
                  items={[
                    <>
                      Offerings accept an item or a tag (<Code>{'{ "tag": "c:gems/diamond" }'}</Code>).
                    </>,
                    <>
                      A tier multiplier of <Code>0</Code> removes that tier from the roll;{' '}
                      <Code>min_tier</Code> sets a floor instead.
                    </>,
                    'If an offering\'s demands cannot be met, the roll refuses and nothing is consumed.',
                  ]}
                />
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-600">
              {[
                {
                  q: 'Will you make this for Fabric?',
                  a: 'There are no current plans for a Fabric port. Anyone is welcome to create one though!',
                },
                {
                  q: 'Can I use this on my server or modpack?',
                  a: "Of course, that's why I made it! Just please give credit if possible. You may not use this to make money off of in any way.",
                },
                {
                  q: 'Do boons really disappear on death?',
                  a: 'By default, yes, all of them, every time. That is the entire point of the mod. The cooldown survives death though, so you cannot die on purpose to skip the wait. If that is too harsh for your pack, a config sets how many boons death claims, down to none at all.',
                },
                {
                  q: 'Can I change the boons, costs, and odds?',
                  a: 'All of it. Costs, cooldowns, tier odds, and action gating are config options. The boons themselves are datapack JSON, and the built-in set is a removable datapack, so you can replace everything wholesale. Use the Datapack Builder on this site to generate your own.',
                },
                {
                  q: 'Does it work on servers?',
                  a: 'Yes, it is built for both single player and dedicated servers. All rolling and validation happens server side.',
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
          <div className="sticky top-20 flex flex-col gap-4">
            <ToolLinkCard
              to="/mortal-boons/datapack-builder"
              title="Datapack Builder"
              description="Build boons, signs, and offerings with live validation, then download them as a ready-to-use datapack."
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
              curseforgeUrl="https://www.curseforge.com/minecraft/mc-mods/mortal-boons"
              modrinthUrl="https://modrinth.com/mod/mortal-boons"
              discordUrl="https://discord.gg/cpRzXtSaSr"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
