import { useState } from 'react'
import { DownloadLinks } from '../components/DownloadLinks'
import { VerticalTabNav } from '../components/VerticalTabNav'

const CURSEFORGE_URL = 'https://www.curseforge.com/minecraft/mc-mods/beasts-and-bounties'
const DISCORD_URL = 'https://discord.gg/cpRzXtSaSr'

const IMG = {
  title: '/beasts-and-bounties/title.png',
  logo: '/beasts-and-bounties/logo.png',
  book: '/beasts-and-bounties/bestiary-menu-husk.png',
  tabs: '/beasts-and-bounties/bestiary-menu-spliced.png',
  tabOverview: '/beasts-and-bounties/bestiary-menu-husk-main-tab.png',
  tabKnowledge: '/beasts-and-bounties/bestiary-menu-husk-knowledge-tab.png',
  tabRewards: '/beasts-and-bounties/bestiary-menu-husk-rewards-tab.png',
  tabTracking: '/beasts-and-bounties/bestiary-menu-husk-tracking-tab.png',
  bookRecipe: '/beasts-and-bounties/bestiary-recipe.png',
  boardBlock: '/beasts-and-bounties/bounty-board-block.png',
  boardMenu: '/beasts-and-bounties/bounty-board-menu.png',
  boardActive: '/beasts-and-bounties/bounty-board-menu-husk-active-bounty.png',
  poster: '/beasts-and-bounties/bounty-board-menu-stray-highlighted.png',
  boardRecipe: '/beasts-and-bounties/bounty-board-recipe.png',
  huntHold: '/beasts-and-bounties/tracking-activating.png',
  huntCompass: '/beasts-and-bounties/tracking-active-2.png',
  huntGlow: '/beasts-and-bounties/tracking-active-3.png',
  passivePing: '/beasts-and-bounties/tracking-passive-3.png',
  iconBook: '/beasts-and-bounties/icons/icon-overview.png',
  iconKnowledge: '/beasts-and-bounties/icons/icon-knowledge.png',
  iconRewards: '/beasts-and-bounties/icons/icon-rewards.png',
  iconTracking: '/beasts-and-bounties/icons/icon-tracking.png',
  iconBoard: '/beasts-and-bounties/icons/bounty-board-item.png',
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

const FeatureHeading = ({ icon, children }: { icon: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-2.5">
    <img
      src={icon}
      alt=""
      aria-hidden="true"
      className="h-7 w-7 shrink-0 object-contain [image-rendering:pixelated]"
    />
    <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">{children}</h2>
  </div>
)

const Body = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">{children}</p>
)

const Strong = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-medium text-zinc-800 dark:text-zinc-100">{children}</strong>
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
  caption?: string
  className?: string
}) => (
  <div className="flex justify-center">
    <figure className="space-y-2">
      <img
        src={src}
        alt={alt}
        className={`rounded-lg border border-zinc-200 dark:border-zinc-600 ${className}`}
      />
      {caption && <figcaption className="text-center text-sm text-zinc-400">{caption}</figcaption>}
    </figure>
  </div>
)

const JsonBlock = ({ children }: { children: string }) => (
  <pre className="overflow-x-auto rounded-lg bg-zinc-900 px-4 py-3 font-mono text-xs leading-relaxed text-zinc-300">
    {children}
  </pre>
)

type Row = { name: React.ReactNode; detail: React.ReactNode; value?: React.ReactNode }

const RowTable = ({ rows, valueLabel }: { rows: Row[]; valueLabel?: string }) => (
  <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
    {rows.map(({ name, detail, value }, i) => (
      <div
        key={i}
        className={`flex flex-col gap-1 px-4 py-2.5 sm:flex-row sm:items-baseline sm:gap-4 ${
          i < rows.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-600' : ''
        }`}
      >
        <span className="shrink-0 text-sm font-semibold text-zinc-800 sm:w-52 dark:text-zinc-100">
          {name}
        </span>
        {value !== undefined && (
          <span className="shrink-0 font-mono text-xs text-zinc-500 sm:w-28 dark:text-zinc-400">
            {valueLabel && <span className="sr-only">{valueLabel}: </span>}
            {value}
          </span>
        )}
        <span className="text-sm text-zinc-600 dark:text-zinc-300">{detail}</span>
      </div>
    ))}
  </div>
)

const LevelTable = ({
  heading,
  levels,
}: {
  heading: string
  levels: { name: string; detail: string }[]
}) => (
  <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
    <div className="border-b border-zinc-100 bg-zinc-50 px-4 py-2 text-xs font-semibold tracking-wider text-zinc-400 uppercase dark:border-zinc-600 dark:bg-zinc-800/40">
      {heading}
    </div>
    {levels.map(({ name, detail }, i, arr) => (
      <div
        key={name}
        className={`flex items-baseline gap-3 px-4 py-2.5 ${
          i < arr.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-600' : ''
        }`}
      >
        <span className="w-24 shrink-0 text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          {i + 1}. {name}
        </span>
        <span className="text-sm text-zinc-600 dark:text-zinc-300">{detail}</span>
      </div>
    ))}
  </div>
)

const Step = ({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: React.ReactNode
}) => (
  <div className="space-y-3">
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
        {number}
      </span>
      <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">{title}</h3>
    </div>
    {children}
  </div>
)

type Tab = 'overview' | 'getting-started' | 'datapacks' | 'configuration' | 'faq'

const TABS = [
  { id: 'overview' as const, label: 'Overview' },
  { id: 'getting-started' as const, label: 'Getting Started' },
  { id: 'datapacks' as const, label: 'Datapacks' },
  { id: 'configuration' as const, label: 'Configuration' },
  { id: 'faq' as const, label: 'FAQ' },
] satisfies readonly { id: Tab; label: string }[]

const passiveLevels = [
  { name: 'Scent', detail: 'Whether it is close and roughly which way.' },
  { name: 'Trail', detail: 'A finer direction and about how far.' },
  {
    name: 'Track',
    detail: 'The same, from further off, plus a wisp of light that spirals toward it.',
  },
]

const activeLevels = [
  { name: 'Hunt', detail: 'The compass.' },
  {
    name: 'Sight',
    detail:
      'The compass, and once the nearest creature is close it glows through walls. A shorter cooldown.',
  },
  {
    name: 'Mark',
    detail:
      'The compass reaches further and every creature of that type nearby glows. The shortest cooldown.',
  },
]

const entryTopLevel: Row[] = [
  {
    name: <Code>classification</Code>,
    detail: (
      <>
        <Code>normal</Code> (default), <Code>elite</Code>, <Code>minor_boss</Code>, or{' '}
        <Code>major_boss</Code>. Changes the name color and icon in the list.
      </>
    ),
  },
  { name: <Code>milestones</Code>, detail: 'The list of milestones. At least one.' },
  {
    name: <Code>replace</Code>,
    detail: (
      <>
        <Code>true</Code> throws away this creature's entry from lower packs so this file is the
        whole entry. Default <Code>false</Code>.
      </>
    ),
  },
]

const milestoneFields: Row[] = [
  { name: <Code>kills</Code>, detail: 'Kills needed to reach this milestone.' },
  {
    name: <Code>bounties</Code>,
    detail: 'Bounties claimed for this creature needed to reach this milestone.',
  },
  {
    name: (
      <>
        <Code>name</Code>, <Code>model</Code>
      </>
    ),
    detail: (
      <>
        <Code>true</Code> reveals the creature's name or 3D model. Until then it shows as ???.
      </>
    ),
  },
  { name: <Code>type</Code>, detail: 'A category shown under the name, like Undead or Arthropod.' },
  { name: <Code>description</Code>, detail: 'The description paragraph.' },
  {
    name: <Code>stats</Code>,
    detail: (
      <>
        A map of stat name to a number or a tier: <Code>low</Code>, <Code>medium</Code>,{' '}
        <Code>high</Code>, <Code>extreme</Code>.
      </>
    ),
  },
  { name: <Code>attack_patterns</Code>, detail: 'A list of lines for How It Fights.' },
  {
    name: (
      <>
        <Code>strengths</Code>, <Code>weaknesses</Code>, <Code>habitat</Code>, <Code>notes</Code>
      </>
    ),
    detail: 'Lists of lines for their sections.',
  },
  { name: <Code>rewards</Code>, detail: 'A list of rewards, below.' },
]

const rewardTypes: Row[] = [
  {
    name: <Code>damage_bonus</Code>,
    value: 'amount',
    detail: (
      <>
        Damage dealt to this creature × (1 + total). <Code>0.05</Code> is +5%.
      </>
    ),
  },
  {
    name: <Code>damage_resistance</Code>,
    value: 'amount',
    detail: (
      <>
        Damage taken from this creature × (1 − total). <Code>0.1</Code> is 10% less.
      </>
    ),
  },
  {
    name: <Code>extra_loot</Code>,
    value: 'chance',
    detail: 'Chance (0 to 1) that a kill rolls the loot table one extra time.',
  },
  {
    name: <Code>bonus_experience</Code>,
    value: 'amount',
    detail: 'Experience dropped × (1 + total).',
  },
  {
    name: <Code>attribute</Code>,
    value: 'attribute, amount, operation',
    detail: (
      <>
        A permanent attribute modifier on the player. Operation is <Code>add_value</Code>,{' '}
        <Code>add_multiplied_base</Code>, or <Code>add_multiplied_total</Code>. Any attribute works,
        including ones from other mods.
      </>
    ),
  },
  {
    name: <Code>passive_tracking</Code>,
    value: 'level',
    detail: 'Unlocks that Passive Sense level (1 to 3).',
  },
  {
    name: <Code>active_tracking</Code>,
    value: 'level',
    detail: 'Unlocks that Active Hunt level (1 to 3).',
  },
]

const bountyFields: Row[] = [
  { name: <Code>kills</Code>, value: '3', detail: 'How many the player must slay.' },
  {
    name: <Code>weight</Code>,
    value: '10',
    detail: 'How likely it is to be posted, relative to the other bounties.',
  },
  {
    name: <Code>bonus_kills</Code>,
    value: '0',
    detail: "Kills added to the creature's bestiary entry when the bounty is completed.",
  },
  { name: <Code>rewards</Code>, value: 'none', detail: 'A list of rewards, below.' },
]

const bountyRewardTypes: Row[] = [
  {
    name: <Code>item</Code>,
    value: 'item, count',
    detail: "Gives the items. Overflow drops at the player's feet.",
  },
  { name: <Code>experience</Code>, value: 'amount', detail: 'Gives experience points.' },
  {
    name: <Code>pmmo_xp</Code>,
    value: 'xp',
    detail: (
      <>
        Gives Project MMO skill experience, written as <Code>"skill/amount"</Code>, for example{' '}
        <Code>"combat/500"</Code>. Ignored when Project MMO is not installed.
      </>
    ),
  },
]

const bountyConfig: Row[] = [
  {
    name: <Code>refreshMinecraftDays</Code>,
    value: '1.0',
    detail: 'How often the postings change, in Minecraft days.',
  },
  {
    name: <Code>offersShown</Code>,
    value: '3',
    detail: 'How many postings the board shows at once (1 to 3).',
  },
  {
    name: <Code>claimCooldownMinutes</Code>,
    value: '10',
    detail: 'Real minutes after completing a bounty before the board posts again.',
  },
  {
    name: <Code>abandonCooldownMinutes</Code>,
    value: '20',
    detail: 'Real minutes after abandoning a bounty before the board posts again.',
  },
  {
    name: <Code>allowAbandon</Code>,
    value: 'true',
    detail: 'Whether a player may abandon an accepted bounty.',
  },
  {
    name: <Code>showLastSeen</Code>,
    value: 'false',
    detail:
      'Hovering a poster shows where the creature was last seen, even before the player has learned it.',
  },
]

const passiveConfig: Row[] = [
  {
    name: <Code>range</Code>,
    value: '24 / 32 / 48',
    detail: 'How far away, in blocks, a creature can be sensed.',
  },
  {
    name: <Code>pingIntervalSeconds</Code>,
    value: '25 / 19 / 15',
    detail: 'Seconds between pings.',
  },
]

const activeConfig: Row[] = [
  { name: <Code>durationSeconds</Code>, value: '30 / 30 / 30', detail: 'How long a hunt lasts.' },
  {
    name: <Code>cooldownSeconds</Code>,
    value: '240 / 180 / 150',
    detail: 'Seconds after a hunt ends before the next can start.',
  },
  {
    name: <Code>arrowRange</Code>,
    value: '48 / 48 / 64',
    detail: 'How far away, in blocks, the compass can find a creature.',
  },
]

const generalTrackingConfig: Row[] = [
  {
    name: <Code>heightHintBlocks</Code>,
    value: '4.0',
    detail:
      'Blocks above or below you before a ping or the compass says "above you" or "below you".',
  },
  {
    name: <Code>distanceRoundingBlocks</Code>,
    value: '10',
    detail: 'Pings round the distance to the nearest multiple of this.',
  },
  {
    name: <Code>glowRange</Code>,
    value: '32',
    detail:
      'Within this many blocks, Sight makes the nearest creature glow and Mark makes all of them glow.',
  },
  {
    name: <Code>huntHoldSeconds</Code>,
    value: '2',
    detail: 'How long the hunt key must be held. 0 starts the hunt on press.',
  },
  {
    name: <Code>huntScanIntervalTicks</Code>,
    value: '10',
    detail: 'Ticks between scans during a hunt. Lower is more responsive, higher is cheaper.',
  },
]

const clientConfig: Row[] = [
  { name: <Code>blocksPerTick</Code>, value: '0.45', detail: 'How fast the wisp travels.' },
  { name: <Code>maxLengthBlocks</Code>, value: '24.0', detail: 'The furthest the wisp travels.' },
  {
    name: <Code>stopShortBlocks</Code>,
    value: '8.0',
    detail: 'The wisp always stops at least this far before the creature.',
  },
  {
    name: <Code>swirlRadius</Code>,
    value: '0.25',
    detail: "How wide the wisp's spiral is. 0 flies straight.",
  },
  { name: <Code>swirlRadiansPerTick</Code>, value: '0.4', detail: 'How fast the wisp spirals.' },
  {
    name: <Code>pingTextSeconds</Code>,
    value: '4.0',
    detail: 'How long a ping stays readable before it fades.',
  },
]

const commands = [
  [
    '/bestiary kills <set|add|remove> <players> <entity> <amount>',
    "Change a player's kills for a creature.",
  ],
  [
    '/bestiary bounties <set|add|remove> <players> <entity> <amount>',
    "Change a player's claimed bounties for a creature.",
  ],
  ['/bestiary get <player> <entity>', 'Show kills, bounties, and the milestone reached.'],
  ['/bestiary reset <players> [entity]', 'Clear progress for one creature, or everything.'],
  [
    '/bestiary complete <players> [entity]',
    'Raise progress to the final milestone for one entry or all of them.',
  ],
  ['/bestiary board reroll', 'Post a new set of bounties for everyone now.'],
  ['/bestiary board clear <players>', "Drop the players' active bounty and cooldown."],
] as const

const faq = [
  {
    q: 'Does it add new mobs?',
    a: 'No. Beasts & Bounties gives you reasons to hunt the creatures already in your game. It works with vanilla mobs and anything added by other mods, as long as there is a datapack entry for it.',
  },
  {
    q: 'Will you make this for Fabric?',
    a: 'There are no current plans for a Fabric port. Anyone is welcome to create one though!',
  },
  {
    q: 'Can I use this on my server or modpack?',
    a: "Of course, that's why I made it! Just please give credit if possible. You may not use this to make money off of in any way.",
  },
  {
    q: 'Does it work on servers?',
    a: 'Yes. Progress is tracked per player on the server, and the bounty board posts the same hunts for everyone so friends can take them together. Install the mod on both the client and the server.',
  },
  {
    q: 'Why does it need SilverLib?',
    a: 'SilverLib keeps track of who took part in a fight. That is how kill credit reaches everyone who helped, including pet owners and healers, instead of only whoever landed the last hit.',
  },
  {
    q: 'Can I change the creatures, milestones, and rewards?',
    a: 'All of it. Entries and bounties are datapack JSON, and the vanilla content is a built-in datapack you can disable. Change a file, run /reload, and every player is updated with no migration, because only kill and bounty counts are ever saved.',
  },
  {
    q: 'Do I need to carry the book?',
    a: 'No. Kills count whether or not you have the bestiary on you. The book is where you read what you have learned and where you choose a creature to track.',
  },
]

export const BeastsAndBounties = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <img
          src={IMG.title}
          alt="Beasts & Bounties"
          className="max-w-xs object-contain drop-shadow-sm sm:max-w-sm"
        />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute top-0 right-[calc(50%+26rem+1.5rem)] bottom-0 hidden w-[12rem] xl:block [&>*]:pointer-events-auto">
          <VerticalTabNav tabs={TABS} activeTab={activeTab} onSelect={setActiveTab} />
        </div>

        <Card className="mx-auto xl:w-[52rem]">
          <div className="flex flex-wrap gap-1.5 border-b border-zinc-100 bg-zinc-50 px-4 py-3 xl:hidden dark:border-zinc-600 dark:bg-zinc-800/40">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                aria-current={activeTab === id ? 'page' : undefined}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 ${
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
            <div className="space-y-6 p-6">
              <Body>
                Beasts & Bounties does not add any new creatures to Minecraft. It gives you many
                reasons to hunt the ones already out there. Every kill is written into a Hunter's
                Bestiary that reveals a creature's secrets and sharpens you against it. Hunt one
                long enough and you learn to track it. A Bounty Board posts fresh hunts with real
                rewards. The hundredth zombie you slay should mean more than the first, and now it
                does.
              </Body>
              <Body>
                Everything is data-driven and works with any creature, vanilla or modded. A default
                vanilla datapack is included, so you can install it and play right away. It is built
                to be light on the server and should sit comfortably alongside other mods.
              </Body>

              <Divider />

              <div className="space-y-4">
                <FeatureHeading icon={IMG.iconBook}>The Bestiary</FeatureHeading>
                <Body>
                  A book that holds every note you have made from hunting the creatures of the
                  world. Every kill or bounty completed on a creature brings you closer to its
                  milestones, and each milestone unlocks new insights or perks. A new creature
                  starts as a nameless ??? and, milestone by milestone, gives up its name and
                  picture, its stats, how it fights, its strengths and weaknesses, where it dwells,
                  and more. Every player keeps their own book and progress.
                </Body>
                <Screenshot
                  src={IMG.book}
                  alt="The Hunter's Bestiary open on a completed Husk entry"
                  caption="A completed entry: the Husk, 500 slain, nothing left to learn"
                />
                <Body>
                  Knowledge is only half the battle. Milestones also grant permanent bonuses: more
                  damage against that creature, less damage taken from it, extra loot rolls and
                  bonus experience when killing it, and sometimes a permanent attribute. Slay enough
                  creepers and explosions push you around a little less. Finish the spider and you
                  step a little higher. It all stacks, so a seasoned hunter is a tougher one.
                  Milestones can also unlock new ways of finding a creature, allowing you to track
                  it.
                </Body>
                <Screenshot
                  src={IMG.tabs}
                  alt="The four bestiary tabs: Overview, Knowledge, Rewards, and Tracking & Bounties"
                  caption="Overview, Knowledge, Rewards, and Tracking & Bounties"
                />
              </div>

              <Divider />

              <div className="space-y-4">
                <FeatureHeading icon={IMG.iconBoard}>Bounties</FeatureHeading>
                <Body>
                  A Bounty Board posts WANTED posters: slay a number of that creature and claim the
                  reward in items and experience. You hold one bounty at a time. Postings refresh
                  every Minecraft day and are the same for everyone on the server, so friends can
                  take the same hunt together. Completing a bounty also feeds your bestiary with a
                  claimed bounty and bonus kills, and entries can require bounties to reach their
                  later milestones.
                </Body>
                <Screenshot
                  src={IMG.boardMenu}
                  alt="The Bounty Board showing three WANTED posters"
                  caption="Three postings, refreshed every Minecraft day"
                />
              </div>

              <Divider />

              <div className="space-y-4">
                <FeatureHeading icon={IMG.iconTracking}>Tracking</FeatureHeading>
                <Body>
                  Know a creature well enough and you can sense it. Tracking unlocks through
                  milestones and comes in two kinds, each with three levels.
                </Body>
                <Body>
                  <Strong>Passive Sense</Strong> whispers to you now and then when your tracked
                  creature is near: "You sense the Zombie to the left." Higher levels sharpen the
                  direction, add a distance, and at the top send a wisp of light spiraling away from
                  you toward it.
                </Body>
                <Body>
                  <Strong>Active Hunt</Strong> is the chase. Hold the hunt key and a compass rises
                  above your hotbar, giving you a much better read on where the creature is than the
                  passive sense. At higher levels the creature glows through walls, for your eyes
                  only. Then the trail goes cold, and you must wait a while before hunting again.
                </Body>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Screenshot
                    src={IMG.huntCompass}
                    alt="The hunt compass with a timer counting down"
                    caption="The compass points the way while the hunt lasts"
                    className="max-h-72 object-contain"
                  />
                  <Screenshot
                    src={IMG.huntGlow}
                    alt="A creature glowing red through a wall above the compass"
                    caption="At higher levels the creature glows through walls"
                    className="max-h-72 object-contain"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'getting-started' && (
            <div className="space-y-8 p-6">
              <Step number={1} title="Craft the Hunter's Bestiary">
                <Body>
                  Leather over a book over a bone, stacked in a column. Right-click to open it. You
                  do not need to carry it for kills to count; the book is where you read what you
                  have learned. It also lives in the Tools & Utilities creative tab.
                </Body>
                <Screenshot
                  src={IMG.bookRecipe}
                  alt="Crafting recipe: leather, book, and bone in a column"
                  className="max-w-sm"
                />
              </Step>

              <Divider />

              <Step number={2} title="Go hunting">
                <Body>
                  Kill something. Anything with an entry appears in your book after the first kill,
                  with a "New Creature Recorded" toast. Each milestone after that shows "Knowledge
                  Deepened." Everyone who took part in a fight gets credit, including the owner of a
                  pet or summon and anyone who healed the group, so a party hunt moves everyone's
                  book forward as long as you were actively involved.
                </Body>
              </Step>

              <Divider />

              <Step number={3} title="Read the book">
                <Body>
                  The left page lists every creature you have found, with a search bar at the top.
                  Elites and bosses stand out with a colored name and an icon. The right page shows
                  the selected creature across four tabs. Tabs with nothing to show stay hidden
                  until you unlock something for them.
                </Body>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  <Screenshot src={IMG.tabOverview} alt="The Overview tab" caption="Overview" />
                  <Screenshot src={IMG.tabKnowledge} alt="The Knowledge tab" caption="Knowledge" />
                  <Screenshot src={IMG.tabRewards} alt="The Rewards tab" caption="Rewards" />
                  <Screenshot
                    src={IMG.tabTracking}
                    alt="The Tracking & Bounties tab"
                    caption="Tracking & Bounties"
                  />
                </div>
                <BulletList
                  items={[
                    <>
                      <Strong>Overview</Strong>: name, model, type, description, "Slain" and
                      "Bounties completed" counts, and the next milestone's requirement. When there
                      is nothing left it reads "Entry complete. Nothing left to learn."
                    </>,
                    <>
                      <Strong>Knowledge</Strong>: the stats, then How It Fights, Strengths,
                      Weaknesses, Where It Dwells, and Hunter's Notes.
                    </>,
                    <>
                      <Strong>Rewards</Strong>: what you have earned, in two sections. "Against the
                      Husk" holds the bonuses that apply only while fighting it. "Permanent Boons"
                      holds the attribute bonuses that are always active.
                    </>,
                    <>
                      <Strong>Tracking & Bounties</Strong>: the Track button, your active bounty's
                      progress, and the tracking levels you have learned.
                    </>,
                  ]}
                />
              </Step>

              <Divider />

              <Step number={4} title="Take a bounty">
                <Body>
                  Craft a Bounty Board from three paper across the top, any sign in the middle, and
                  a stick below. Place it anywhere and click the board.
                </Body>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Screenshot
                    src={IMG.boardRecipe}
                    alt="Crafting recipe: three paper, a sign, and a stick"
                    caption="Three paper, any sign, and a stick"
                  />
                  <Screenshot
                    src={IMG.boardBlock}
                    alt="The Bounty Board placed in the world"
                    caption="The board placed in the world"
                    className="max-h-56 object-contain"
                  />
                </div>
                <Body>
                  Each poster shows the creature, "Slay 5", and the rewards. The poster always names
                  the creature, even if your book still shows ???. Hover a poster and click Accept,
                  and the hunt is on.
                </Body>
                <div className="grid gap-4 sm:grid-cols-[1fr_1.6fr]">
                  <Screenshot
                    src={IMG.poster}
                    alt="A hovered WANTED poster for a Stray with the Accept button"
                    caption="Hover a poster to accept it"
                    className="max-h-80 object-contain"
                  />
                  <Screenshot
                    src={IMG.boardActive}
                    alt="The board showing the active Husk bounty at 0 of 5 slain"
                    caption="With a bounty active the board shows only your hunt"
                  />
                </div>
                <Body>
                  Every kill reports in on the action bar: "Bounty: 2 of 5 slain." Finish it and the
                  rewards are yours, with a "Bounty Claimed" toast. Then the board goes quiet for a
                  while before it posts again, and the footer tells you how long. Abandoning a
                  bounty is allowed by default, with a longer wait after.
                </Body>
              </Step>

              <Divider />

              <Step number={5} title="Track a creature">
                <Body>
                  Once an entry has unlocked tracking, press <Strong>Track</Strong> on its Tracking
                  & Bounties tab. You track one creature at a time, an eye icon marks it in the
                  list, and <Strong>Stop Tracking</Strong> is in the same place. The book describes
                  each level you have learned in plain words.
                </Body>
                <LevelTable heading="Passive Sense" levels={passiveLevels} />
                <Screenshot
                  src={IMG.passivePing}
                  alt='A passive ping: "You have caught the scent of the Cow about 50 blocks away. It is behind you to the left."'
                  caption="A level 3 passive ping"
                />
                <Body>
                  For the hunt, hold the <Strong>Hunt Tracked Creature</Strong> key (G by default,
                  rebindable) for two seconds. A compass rises above your hotbar with a timer
                  counting the hunt down, and an up or down marker when the creature is above or
                  below you. When the hunt ends the timer shows how long until the next one.
                </Body>
                <LevelTable heading="Active Hunt" levels={activeLevels} />
                <Screenshot
                  src={IMG.huntHold}
                  alt="Holding the hunt key shows the text Searching for the Cow's trail with a progress bar"
                  caption="Hold the hunt key to pick up the trail"
                />
              </Step>

              <Divider />

              <div className="space-y-3">
                <SectionLabel>Advancements</SectionLabel>
                <Body>
                  Three advancements mark the big moments: "A Hunter's First Page" when you record
                  your first creature, "Nothing Left to Learn" when you finish an entry, and "Master
                  of Beasts" when every entry is complete. They are trophies only. Nothing is gated
                  behind them.
                </Body>
              </div>

              <Divider />

              <div className="space-y-3">
                <SectionLabel>What's included</SectionLabel>
                <Body>
                  The built-in datapack covers 54 vanilla creatures: every hostile mob, the bosses,
                  and the livestock and fish players normally kill. Pets, villagers, golems, and
                  peaceful creatures like axolotls and turtles are left out on purpose, since
                  rewarding their deaths would encourage it.
                </Body>
                <Body>
                  Creatures are classed as normal, Elite, Minor Boss, or Major Boss. The tougher the
                  class, the fewer kills each milestone takes and the bigger the rewards. A zombie
                  takes 250 kills to complete. The Ender Dragon takes 5.
                </Body>
                <Body>
                  Bounties are included for the hostiles and bosses. Rewards are themed to the
                  creature and sized to its class: common mobs pay in iron, Nether mobs and the
                  rarer undead in gold, illagers in emeralds, creepers and endermen in diamonds, and
                  bosses in netherite and diamonds, with experience to match.
                </Body>
              </div>
            </div>
          )}

          {activeTab === 'datapacks' && (
            <div className="space-y-6 p-6">
              <div className="space-y-3">
                <SectionLabel>Everything is data</SectionLabel>
                <Body>
                  Everything about a creature lives in the datapack. The mod works for any living
                  entity, including those from other mods. Add a file for it and it is tracked.
                </Body>
              </div>

              <Divider />

              <div className="space-y-3">
                <SectionLabel>Bestiary entries</SectionLabel>
                <Body>
                  One file per creature at{' '}
                  <Code>data/&lt;namespace&gt;/bestiary/&lt;entity&gt;.json</Code>. The file path is
                  the entity id, so <Code>data/minecraft/bestiary/zombie.json</Code> is{' '}
                  <Code>minecraft:zombie</Code> and{' '}
                  <Code>data/alexsmobs/bestiary/grizzly_bear.json</Code> is{' '}
                  <Code>alexsmobs:grizzly_bear</Code>.
                </Body>
                <JsonBlock>{`{
  "classification": "normal",
  "milestones": [
    { "kills": 1 },
    { "kills": 3, "name": true, "model": true, "type": "Undead" },
    { "kills": 10,
      "description": "A shambling corpse that never tires.",
      "stats": { "health": "medium", "damage": "medium", "speed": "low" },
      "attack_patterns": ["Melee"],
      "habitat": ["Overworld, at night or in darkness"] },
    { "kills": 25,
      "weaknesses": ["Sunlight", "Smite"],
      "strengths": ["Calls nearby zombies for help"],
      "rewards": [ { "type": "damage_bonus", "amount": 0.05 } ] },
    { "kills": 50,
      "notes": ["Villagers it kills may rise as zombie villagers"],
      "rewards": [
        { "type": "damage_resistance", "amount": 0.1 },
        { "type": "extra_loot", "chance": 0.25 },
        { "type": "passive_tracking", "level": 1 },
        { "type": "attribute", "attribute": "minecraft:generic.max_health",
          "amount": 1, "operation": "add_value" }
      ] }
  ]
}`}</JsonBlock>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Top level</p>
                <RowTable rows={entryTopLevel} />
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  Milestone fields
                </p>
                <Body>
                  Everything except the requirement is optional. A milestone needs{' '}
                  <Code>kills</Code>, <Code>bounties</Code>, or both. Text fields accept a plain
                  string or a vanilla text component like{' '}
                  <Code>{'{"translate": "my.lang.key"}'}</Code>.
                </Body>
                <RowTable rows={milestoneFields} />
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Rewards</p>
                <RowTable rows={rewardTypes} valueLabel="Fields" />
                <BulletList
                  items={[
                    <>
                      Milestones unlock in order. A milestone that needs a bounty blocks everything
                      after it until the bounty is claimed, however many kills the player has. To
                      gate late progress, give it a kill count too:{' '}
                      <Code>{'{"kills": 25, "bounties": 1}'}</Code>.
                    </>,
                    <>
                      Reached milestones stack. Lists append, later <Code>name</Code>,{' '}
                      <Code>type</Code>, and <Code>description</Code> values replace earlier ones,
                      and rewards add up.
                    </>,
                    'Files from different packs merge, like vanilla tags. Your pack can add a reward at 25 zombie kills without copying the vanilla file. Milestones with the same requirement combine.',
                    'A bad file is logged and skipped. It never fails the reload.',
                  ]}
                />
              </div>

              <Divider />

              <div className="space-y-3">
                <SectionLabel>Bounties</SectionLabel>
                <Body>
                  One file per creature at{' '}
                  <Code>data/&lt;namespace&gt;/bounty/&lt;entity&gt;.json</Code>, named the same
                  way. A bounty is only ever posted for a creature that has a bestiary entry.
                </Body>
                <JsonBlock>{`{
  "kills": 5,
  "weight": 10,
  "bonus_kills": 4,
  "rewards": [
    { "type": "item", "item": "minecraft:iron_ingot", "count": 15 },
    { "type": "experience", "amount": 150 }
  ]
}`}</JsonBlock>
                <RowTable rows={bountyFields} valueLabel="Default" />
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  Reward types
                </p>
                <RowTable rows={bountyRewardTypes} valueLabel="Fields" />
                <Body>
                  Unlike entries, bounty files do not merge. The highest pack's file wins.
                </Body>
              </div>

              <Divider />

              <div className="space-y-3">
                <SectionLabel>The built-in datapack</SectionLabel>
                <Body>
                  The vanilla content is a built-in datapack, enabled by default. If you want to
                  ship your own content from scratch, disable it on the world's datapack screen or
                  with:
                </Body>
                <JsonBlock>{`/datapack disable "mod/beasts_and_bounties:builtin_data_packs/vanilla_bestiary"`}</JsonBlock>
                <Body>
                  Only kill and bounty counts are saved on the player. Everything else is computed
                  from the datapack, so you can change your data, run <Code>/reload</Code>, and
                  every player is right with no migration.
                </Body>
              </div>
            </div>
          )}

          {activeTab === 'configuration' && (
            <div className="space-y-6 p-6">
              <Body>
                Bestiary content is tuned in the datapack, not in config. The config files cover the
                board and tracking.
              </Body>

              <Divider />

              <div className="space-y-3">
                <SectionLabel>Bounty board</SectionLabel>
                <Body>
                  <Code>beasts_and_bounties-bounty-server.toml</Code>
                </Body>
                <RowTable rows={bountyConfig} valueLabel="Default" />
              </div>

              <Divider />

              <div className="space-y-3">
                <SectionLabel>Tracking</SectionLabel>
                <Body>
                  <Code>beasts_and_bounties-tracking-server.toml</Code>. Per-level values are listed
                  as level 1 / 2 / 3.
                </Body>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  Passive Sense (Scent / Trail / Track)
                </p>
                <RowTable rows={passiveConfig} valueLabel="Defaults" />
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  Active Hunt (Hunt / Sight / Mark)
                </p>
                <RowTable rows={activeConfig} valueLabel="Defaults" />
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">General</p>
                <RowTable rows={generalTrackingConfig} valueLabel="Default" />
              </div>

              <Divider />

              <div className="space-y-3">
                <SectionLabel>Tracking visuals (client)</SectionLabel>
                <Body>
                  <Code>beasts_and_bounties-tracking-client.toml</Code>
                </Body>
                <RowTable rows={clientConfig} valueLabel="Default" />
              </div>

              <Divider />

              <div className="space-y-3">
                <SectionLabel>Commands</SectionLabel>
                <Body>
                  All <Code>/bestiary</Code> commands need operator level 2.
                </Body>
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

              <Divider />

              <div className="space-y-3">
                <SectionLabel>Mod compatibility</SectionLabel>
                <BulletList
                  items={[
                    <>
                      <Strong>Project MMO</Strong> (optional): bounties can reward skill experience
                      with the <Code>pmmo_xp</Code> reward type. The shipped bounties do not use it.
                      It is there for packs that run PMMO.
                    </>,
                  ]}
                />
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-600">
              {faq.map(({ q, a }) => (
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
            <DownloadLinks curseforgeUrl={CURSEFORGE_URL} discordUrl={DISCORD_URL} />
          </div>
        </div>
      </div>

      <DownloadLinks
        curseforgeUrl={CURSEFORGE_URL}
        discordUrl={DISCORD_URL}
        className="items-center xl:hidden"
      />
    </div>
  )
}
