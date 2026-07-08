import { useState } from 'react'
import { VerticalTabNav } from '../components/VerticalTabNav'

const IMG = {
  title: '/player-abilities/title.png',
  logo: '/player-abilities/logo.png',
  wheel: '/player-abilities/screenshot-wheel.png',
  hud: '/player-abilities/screenshot-hud.png',
  bookActive: '/player-abilities/screenshot-book-active.png',
  bookPassive: '/player-abilities/screenshot-book-passive.png',
  bookTriggered: '/player-abilities/screenshot-book-triggered.png',
}

const Figure = ({ src, alt, caption, className = '' }: { src: string; alt: string; caption: string; className?: string }) => (
  <figure className="my-1">
    <img
      src={src}
      alt={alt}
      className={`w-full rounded-lg border border-zinc-200 shadow-sm dark:border-zinc-600 ${className}`}
    />
    <figcaption className="mt-1.5 text-center text-xs text-zinc-400 dark:text-zinc-500">{caption}</figcaption>
  </figure>
)

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <section
    className={`overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700 ${className}`}
  >
    {children}
  </section>
)

const Divider = () => <hr className="border-zinc-100 dark:border-zinc-600" />

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">{children}</p>
)

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">{children}</h2>
)

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-sm font-semibold tracking-wide text-zinc-700 uppercase dark:text-zinc-200">
    {children}
  </h3>
)

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
    {children}
  </code>
)

const CodeBlock = ({ children }: { children: string }) => (
  <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-xs leading-relaxed text-zinc-300">
    {children}
  </pre>
)

const Key = ({ children }: { children: React.ReactNode }) => (
  <kbd className="mr-1 inline-flex min-w-[1.5rem] justify-center rounded border border-zinc-300 border-b-2 bg-zinc-100 px-1.5 py-0.5 font-mono text-xs font-semibold text-zinc-700 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200">
    {children}
  </kbd>
)

const FieldRow = ({ name, type, desc }: { name: string; type: string; desc: string }) => (
  <div className="grid grid-cols-1 gap-1 py-2.5 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-4">
    <div>
      <p className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">{name}</p>
      <p className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">{type}</p>
    </div>
    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{desc}</p>
  </div>
)

type Tab =
  | 'overview'
  | 'getting-started'
  | 'active'
  | 'passive'
  | 'triggered'
  | 'progression'
  | 'json-config'
  | 'api'
  | 'compat'
  | 'faq'

const TABS = [
  { id: 'overview' as const, label: 'Overview' },
  { id: 'getting-started' as const, label: 'Getting Started' },
  { id: 'active' as const, label: 'Active Abilities' },
  { id: 'passive' as const, label: 'Passive Abilities' },
  { id: 'triggered' as const, label: 'Triggered Abilities' },
  { id: 'progression' as const, label: 'Levels & Cooldowns' },
  { id: 'json-config' as const, label: 'JSON Configuration' },
  { id: 'api' as const, label: 'Creating Abilities' },
  { id: 'compat' as const, label: 'Mod Compat' },
  { id: 'faq' as const, label: 'FAQ' },
] satisfies readonly { id: Tab; label: string }[]

const TRIGGERS = [
  { id: 'LETHAL_DAMAGE', context: 'DamageTaken (amount + source)', desc: 'A hit that would kill the player. Exclusive: the first ability that fires wins and the killing blow is negated. One save per hit.' },
  { id: 'DAMAGE_TAKEN', context: 'DamageTaken (amount + source)', desc: 'The player took damage. Filter by damage type in shouldTrigger.' },
  { id: 'DEALT_DAMAGE', context: 'DamageDealt (target + amount)', desc: 'The player dealt damage to another entity.' },
  { id: 'HEALTH_DROPPED', context: 'HealthChange (before, after, max)', desc: 'Health went down. The context has a droppedBelow(fraction) helper that is true only when a threshold is crossed, so "below 30% health" fires once.' },
  { id: 'KILL', context: 'LivingEntity (the victim)', desc: 'The player killed something.' },
  { id: 'DEATH', context: 'DamageSource', desc: 'The player died. Fires after ability effects are cleared.' },
  { id: 'CRIT', context: 'Entity (the target)', desc: 'The player landed a critical hit.' },
  { id: 'SHIELD_BLOCK', context: 'Float (blocked damage)', desc: 'The player blocked damage with a shield.' },
  { id: 'FALL', context: 'Float (fall distance)', desc: 'The player landed from a fall.' },
  { id: 'JUMP', context: 'none', desc: 'The player jumped.' },
  { id: 'RESPAWN', context: 'none', desc: 'The player respawned.' },
  { id: 'BLOCK_BREAK', context: 'BlockState', desc: 'The player broke a block.' },
  { id: 'WAKE_UP', context: 'none', desc: 'The player woke from a bed.' },
  { id: 'EAT', context: 'ItemStack (the food)', desc: 'The player finished eating.' },
  { id: 'XP_GAIN', context: 'Integer (amount)', desc: 'The player gained experience.' },
]

export const PlayerAbilities = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <img
          src={IMG.title}
          alt="Player Abilities"
          className="w-full max-w-xl rounded-xl object-contain"
        />
      </div>

      <div className="relative">
        {/* Section nav: floats to the left on xl+ */}
        <div className="pointer-events-none absolute top-0 bottom-0 right-[calc(50%+26rem+1.5rem)] hidden w-[12rem] xl:block [&>*]:pointer-events-auto">
          <VerticalTabNav tabs={TABS} activeTab={activeTab} onSelect={setActiveTab} />
        </div>

        <Card className="mx-auto xl:w-[52rem]">
          {/* Tab bar (mobile / < xl) */}
          <div className="flex flex-wrap gap-1.5 border-b border-zinc-100 bg-zinc-50 px-4 py-3 xl:hidden dark:border-zinc-600 dark:bg-zinc-800/40">
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
              <P>
                Player Abilities is a framework for adding abilities to players. It supports active
                abilities the player uses on demand, always-on passives, and triggered abilities
                that fire on their own when a condition is met. Abilities have levels, cooldowns,
                and optional requirements, and everything can be tuned from datapacks.
              </P>
              <P>
                The mod itself ships zero abilities. It is an API and the systems around it: the
                selection wheel, the ability book, the HUD, Ability Tomes, datapack configuration,
                and skill mod compat. Content comes from mods built on top of it, like{' '}
                <span className="font-semibold">Player Abilities: Reverie</span>, which implements
                18 abilities and doubles as the reference example for building your own.
              </P>

              <Figure
                src={IMG.wheel}
                alt="The radial ability wheel in game"
                caption="The radial ability wheel, showing a selected ability and its category page."
                className="mx-auto max-w-md"
              />

              <Divider />

              <H2>The three kinds of abilities</H2>
              <div className="space-y-3">
                <P>
                  <span className="font-semibold text-sky-600 dark:text-sky-400">Active</span>{' '}
                  abilities are selected and used by the player. An ability can fire instantly,
                  charge up (hold to wind up, then release), or channel (the effect runs while you
                  maintain it).
                </P>
                <P>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    Passive
                  </span>{' '}
                  abilities are on while you have them. They grant attribute bonuses or run custom
                  always-on behavior, and can be toggled off from the ability book.
                </P>
                <P>
                  <span className="font-semibold text-rose-600 dark:text-rose-400">Triggered</span>{' '}
                  abilities fire automatically when their condition happens: survive a killing
                  blow, gain speed after taking damage, react to a crit or a fall. Each has its own
                  cooldown.
                </P>
              </div>

              <Divider />

              <H2>Everything is data driven</H2>
              <P>
                Every gameplay value can be overridden per ability from a datapack: cooldowns, use
                times, requirements, max levels, effect durations, attribute and effect grants,
                categories, and the skill mod wiring. Pack authors can also disable any ability
                with one JSON field. See the JSON Configuration tab.
              </P>
              <P>
                Requires NeoForge for Minecraft 1.21.1. Downloads on CurseForge and Modrinth are
                coming with the first public release.
              </P>
            </div>
          )}

          {activeTab === 'getting-started' && (
            <div className="space-y-5 p-6">
              <H2>Getting abilities</H2>
              <P>There are three ways a player gets an ability:</P>
              <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                <li>
                  <span className="font-semibold">Ability Tomes.</span> Every registered ability
                  automatically gets a tome item, color coded by kind. Using the tome teaches the
                  ability. They live in the Player Abilities creative tab and work well in loot
                  tables and quest rewards.
                </li>
                <li>
                  <span className="font-semibold">Commands.</span>{' '}
                  <Code>/playerabilities grant &lt;player&gt; &lt;ability&gt; [level] [source]</Code>{' '}
                  and <Code>/playerabilities revoke</Code>. Grants are tracked per source, so a
                  command grant and a skill tree grant of the same ability coexist cleanly.
                </li>
                <li>
                  <span className="font-semibold">Skill mods.</span> Pufferfish's Skills tree nodes
                  and Project MMO levels can grant abilities automatically. See the Mod Compat tab.
                </li>
              </ul>

              <Divider />

              <H2>Using abilities</H2>
              <P>
                Four keybinds, all rebindable under the Player Abilities category in controls. The
                defaults below don't conflict with any vanilla key:
              </P>
              <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                <li>
                  <Key>Z</Key> <span className="font-semibold">Ability Wheel</span> opens a radial
                  selector of your active abilities, grouped into pages by category. Click a slice
                  to select it, and scroll to page through categories.
                </li>
                <li>
                  <Key>X</Key> <span className="font-semibold">Use Selected Ability</span> fires the
                  selected ability. For charged abilities you press once and the use bar fills;
                  pressing again cancels. For channeled abilities the effect runs until the bar
                  completes or you press again to stop.
                </li>
                <li>
                  <Key>C</Key> <span className="font-semibold">Cycle Selected Ability</span> steps
                  through your actives without opening the wheel.
                </li>
                <li>
                  <Key>N</Key> <span className="font-semibold">View Abilities</span> opens the
                  ability book: every ability you know, tabbed by kind, with tooltips showing
                  description, cooldown, level, and requirements. Passives are toggled on and off
                  here with a click.
                </li>
              </ul>

              <Divider />

              <H2>Reading the HUD</H2>
              <P>
                The HUD shows your selected ability with a cooldown sweep and status line, active
                ability effects with icons and timers, and notices when a triggered ability fires
                or comes off cooldown. A centered progress bar with a countdown appears while an
                ability is in use.
              </P>
              <P>
                Client config offers four display modes (always, contextual, minimized, hidden) and
                lets you place the HUD in any corner of the screen. The wheel can group by category
                or page through everything.
              </P>
              <Figure
                src={IMG.hud}
                alt="The ability HUD showing the selected ability"
                caption="The HUD cell: the selected ability's icon, name, and ready state."
                className="mx-auto max-w-md"
              />
            </div>
          )}

          {activeTab === 'active' && (
            <div className="space-y-5 p-6">
              <H2>Active abilities</H2>
              <P>
                Active abilities are the castable kind: the player selects one, presses the use
                key, and something happens. Every active declares one of three use types.
              </P>
              <Figure
                src={IMG.bookActive}
                alt="The ability book showing an active ability's tooltip"
                caption="The ability book's Active tab, hovering Restful Meditation to show its tooltip."
              />
              <div className="divide-y divide-zinc-100 dark:divide-zinc-600">
                <FieldRow
                  name="INSTANT"
                  type="use type"
                  desc="Fires immediately on the use key. No wind up, no bar."
                />
                <FieldRow
                  name="CHARGED"
                  type="use type"
                  desc="Press to start winding up. The use bar fills over the ability's use time and the effect fires when it completes. Pressing again during the wind up cancels it."
                />
                <FieldRow
                  name="CHANNELED"
                  type="use type"
                  desc="The ability works while the bar runs, tick by tick. Pressing again ends the channel early, which counts as finishing, not cancelling."
                />
              </div>

              <Divider />

              <H2>The gate order</H2>
              <P>Before an ability fires, it passes through the same checks every time:</P>
              <CodeBlock>{`selected -> granted -> cooldown -> requirements -> canUse -> AbilityPerformEvent`}</CodeBlock>
              <P>
                Each failed gate tells the player why on the action bar: on cooldown, requires two
                more kills, or the ability's own failure message ("You must be in water to invoke
                Fathom's Eye"). The final event is cancelable, which is how Project MMO level
                gating works and how any other mod can veto a use.
              </P>

              <Divider />

              <H2>Interruption</H2>
              <P>
                Charged and channeled uses are interrupted by taking damage (abilities can opt
                out). An ability can also require standing still, where drifting more than half a
                block cancels the use. Cancelled uses do not pay the cooldown or consume
                requirements.
              </P>
            </div>
          )}

          {activeTab === 'passive' && (
            <div className="space-y-5 p-6">
              <H2>Passive abilities</H2>
              <P>
                Passives are on while you have them. No selection, no casting: possession is the
                ability. The framework handles activation on grant, deactivation on revoke, and
                reapplication on login, respawn, and dimension change.
              </P>

              <Divider />

              <H2>Attribute grants</H2>
              <P>
                The most common passive shape is a stat boost, so it is declarative: a passive
                lists the attributes it grants (health, speed, reach, jump strength, or any other
                attribute) with amounts that can scale by level. The framework applies and removes
                the modifiers at all the right moments, including level changes and death.
              </P>
              <P>
                Passives that do more than stats implement <Code>onActivated</Code> and{' '}
                <Code>onDeactivated</Code>, or subscribe to game events and ask the API whether the
                player has the passive.
              </P>

              <Divider />

              <H2>Player toggling</H2>
              <P>
                Players can turn any passive off and on by clicking its row in the ability book.
                The toggle survives death, relogging, and even a skill tree respec that removes and
                re-grants the ability. Useful when an item magnet passive is picking up a
                teammate's drops.
              </P>
              <Figure
                src={IMG.bookPassive}
                alt="The ability book's Passive tab with a toggle"
                caption="The Passive tab: Swift Step with its on/off toggle and hover tooltip."
              />
            </div>
          )}

          {activeTab === 'triggered' && (
            <div className="space-y-5 p-6">
              <H2>Triggered abilities</H2>
              <P>
                Triggered abilities fire automatically when their condition happens, then go on an internal
                cooldown. The player sees a banner with the ability icon when one fires and a ready
                notice when the cooldown ends.
              </P>
              <P>
                A triggered ability subscribes to a trigger point, optionally adds a condition, and
                implements what happens. Mods can define and fire their own trigger points; these
                ship built in:
              </P>
              <Figure
                src={IMG.bookTriggered}
                alt="The ability book's Triggered tab with a tooltip"
                caption="The Triggered tab: Guardian Angel's tooltip showing its effect, kind, and cooldown."
              />

              <Divider />

              <div className="divide-y divide-zinc-100 dark:divide-zinc-600">
                {TRIGGERS.map((trigger) => (
                  <FieldRow
                    key={trigger.id}
                    name={trigger.id}
                    type={trigger.context}
                    desc={trigger.desc}
                  />
                ))}
              </div>

              <Divider />

              <P>
                Triggers pass a typed context to the ability's condition, so "when burned" is a
                damage type check on <Code>DAMAGE_TAKEN</Code>, not a separate trigger. Lethal
                damage is exclusive: if a player somehow has two death saving abilities, only one
                is consumed per hit, deterministically.
              </P>
            </div>
          )}

          {activeTab === 'progression' && (
            <div className="space-y-5 p-6">
              <H2>Ability levels</H2>
              <P>
                Every grant carries a level, and an ability's effective level is the highest across
                everything granting it. Levels reach all ability logic, so higher levels can mean
                stronger effects, shorter cooldowns, faster wind ups, bigger ranges, or newly
                unlocked behavior. Leveling is opt in: an ability that does not declare a max level
                is simply level 1/1.
              </P>

              <Divider />

              <H2>Cooldowns</H2>
              <P>
                Any active or triggered ability can have a cooldown, static per level or set
                dynamically by the ability itself (a transmutation ability can charge a different
                toll per recipe). The <Code>player_abilities:ability_cooldown</Code> attribute
                grants cooldown reduction: 1.0 is neutral, 1.5 halves cooldowns, 2.0 removes them.
                Gear, effects, and skill mods can all touch it.
              </P>

              <Divider />

              <H2>Requirements</H2>
              <P>
                Separate from cooldowns, an ability can demand kills or damage taken before it is
                ready again. Requirements stack with the cooldown: all of them must be satisfied to
                use the ability. Progress shows on the HUD and in the ability book, and a cancelled
                use never consumes progress.
              </P>

              <Divider />

              <H2>Ability power</H2>
              <P>
                The <Code>player_abilities:ability_power</Code> attribute (default 1.0) is the
                generic strength knob. Abilities multiply whatever they choose by it: radii,
                capacities, yields, potencies. Pack authors scale it with gear or skills to make
                abilities grow beyond their level bases.
              </P>
            </div>
          )}

          {activeTab === 'json-config' && (
            <div className="space-y-5 p-6">
              <H2>Datapack configuration</H2>
              <P>
                Every ability can be tuned from a datapack file at{' '}
                <Code>data/&lt;namespace&gt;/player_abilities/&lt;ability&gt;.json</Code>, where
                namespace and path match the ability id. Configs are pure overrides: no file is
                required for any ability, a field that is present wins over the ability's own
                default, and an explicitly empty list disables a class-declared list.
              </P>
              <P>
                Per-level fields accept a single value or an array indexed by level, clamped to the
                last entry. <Code>"cooldown_ticks": 600</Code> and{' '}
                <Code>"cooldown_ticks": [600, 400, 200]</Code> are both valid.
              </P>

              <Divider />

              <H3>Fields</H3>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-600">
                <FieldRow name="enabled" type="boolean" desc="Set false to disable the ability pack-wide. It cannot be used or triggered, disappears from the wheel, book, and HUD, and its tome refuses to teach. Grants stay in player data, so re-enabling restores everyone." />
                <FieldRow name="cooldown_ticks" type="int, per level" desc="Cooldown after a successful use, in ticks (20 per second)." />
                <FieldRow name="use_ticks" type="int, per level" desc="Wind up or channel duration for charged and channeled abilities." />
                <FieldRow name="effect_duration_ticks" type="int, per level" desc="Duration of the ability's lingering effect, if it declares one." />
                <FieldRow name="kill_requirement" type="int, per level" desc="Kills needed between uses. 0 means none." />
                <FieldRow name="damage_taken_requirement" type="float, per level" desc="Damage the player must take between uses." />
                <FieldRow name="max_level" type="int" desc="Cap for the ability's level. Grants above it clamp down, including already-stored ones." />
                <FieldRow name="category" type="resource location" desc="Grouping used by the wheel pages and ability book headers." />
                <FieldRow name="attribute_grants" type="list" desc="For passives: attribute modifiers granted while active. Each entry is an attribute id, a per-level amount, and an operation (add_value, add_multiplied_base, add_multiplied_total). Replaces the ability's own list entirely when present." />
                <FieldRow name="effect_grants" type="list" desc="For actives and triggered: vanilla mob effects applied on use. Each entry is an effect id, per-level duration_ticks, and optional per-level amplifier." />
                <FieldRow name="pmmo_use_requirement" type="object" desc="Project MMO skill and per-level skill level required to use the ability." />
                <FieldRow name="pmmo_grants" type="list" desc="Project MMO skill levels that grant the ability automatically: skill, level, and the ability level given." />
                <FieldRow name="puffish_grants" type="list" desc="Pufferfish's Skills nodes that grant the ability: category, skill node id, and ability level. Grants follow the tree, including respecs." />
              </div>

              <Divider />

              <H3>Examples</H3>
              <P>Disable an ability the pack does not want:</P>
              <CodeBlock>{`{ "enabled": false }`}</CodeBlock>
              <P>Rebalance a cooldown and cap the level:</P>
              <CodeBlock>{`{
  "cooldown_ticks": [6000, 4800, 3600],
  "max_level": 2
}`}</CodeBlock>
              <P>Give a passive per-level speed and grant it from a skill tree node:</P>
              <CodeBlock>{`{
  "attribute_grants": [
    {
      "attribute": "minecraft:generic.movement_speed",
      "amount": [0.1, 0.2, 0.3],
      "operation": "add_multiplied_base"
    }
  ],
  "puffish_grants": [
    { "category": "mypack:exploration", "skill": "swift_step_node", "ability_level": 1 }
  ]
}`}</CodeBlock>
              <P>Make an active apply a vanilla buff on use and require Project MMO Magic 20:</P>
              <CodeBlock>{`{
  "effect_grants": [
    { "effect": "minecraft:speed", "duration_ticks": [200, 300, 400], "amplifier": 0 }
  ],
  "pmmo_use_requirement": { "skill": "magic", "level": [20, 40, 60] }
}`}</CodeBlock>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-5 p-6">
              <H2>Creating abilities with the API</H2>
              <P>
                Abilities are Java classes registered into the ability registry. Everything else
                (tomes, wheel, book, HUD, configs, compat gating) picks them up automatically. The
                examples below are real code from Player Abilities: Reverie, which is open for
                exactly this purpose: use it as is or base your own implementations on it.
              </P>

              <Divider />

              <H3>Setup and registration</H3>
              <P>
                Depend on the mod (CurseMaven or a local jar), declare it required in your
                neoforge.mods.toml, and register abilities with a DeferredRegister:
              </P>
              <CodeBlock>{`private static final DeferredRegister<Ability> ABILITIES =
        DeferredRegister.create(AbilityRegistry.ABILITY_REGISTRY_KEY, MOD_ID);

public static final DeferredHolder<Ability, DeepsightAbility> DEEPSIGHT =
        ABILITIES.register("deepsight", DeepsightAbility::new);`}</CodeBlock>
              <P>
                Names and descriptions come from lang keys (
                <Code>ability.&lt;namespace&gt;.&lt;path&gt;</Code> and{' '}
                <Code>.description</Code>), icons from{' '}
                <Code>textures/ability/&lt;path&gt;.png</Code> in your namespace.
              </P>

              <Divider />

              <H3>Your first active ability</H3>
              <P>
                Deepsight, complete. A charged ability with a use condition, a failure message, and
                a declarative vanilla effect on completion:
              </P>
              <CodeBlock>{`public final class DeepsightAbility extends HarvestAbility {
    private static final int COOLDOWN_SECONDS = 300;
    private static final int DEPTH_BELOW_SURFACE_REQUIRED = 64;

    @Override
    public AbilityUseType getUseType() {
        return AbilityUseType.CHARGED;
    }

    @Override
    public int getUseTicks(int level) {
        return 20;
    }

    @Override
    public int getCooldownTicks(int level) {
        return COOLDOWN_SECONDS * TICKS_PER_SECOND;
    }

    @Override
    public boolean canUse(ServerPlayer player, int level) {
        if (player.level().dimension() == Level.NETHER) {
            return true;
        }
        int surfaceY = player.serverLevel().getHeight(
                Heightmap.Types.WORLD_SURFACE, player.getBlockX(), player.getBlockZ());
        return player.getY() < surfaceY - DEPTH_BELOW_SURFACE_REQUIRED;
    }

    @Override
    public Component getUseFailureMessage(ServerPlayer player, int level) {
        return Component.translatable("message.pa_reverie.deepsight_too_shallow");
    }

    @Override
    public List<EffectGrant> getEffectGrants(int level) {
        return List.of(new EffectGrant(MobEffects.NIGHT_VISION,
                byLevel(level, 3600, 7200, 18000), 0));
    }
}`}</CodeBlock>
              <P>
                <Code>byLevel</Code> picks a value by ability level. HarvestAbility is just a tiny
                base class in the Reverie pack that sets the category and max level for all its
                abilities.
              </P>

              <Divider />

              <H3>Doing work every tick</H3>
              <P>Channeled abilities implement onUseTick. Mend repairs the held item as you channel:</P>
              <CodeBlock>{`@Override
public void onUseTick(ServerPlayer player, int level, int elapsedTicks, int totalTicks) {
    ItemStack repairable = findRepairableStack(player);
    if (repairable == null) {
        return;
    }
    float repairPercentPerTick = (float) (byLevel(level, 0.004f, 0.00533f, 0.00667f)
            * AbilityAPI.getAbilityPower(player));
    int repairAmount = Math.max(1, Math.round(repairable.getMaxDamage() * repairPercentPerTick));
    repairable.setDamageValue(Math.max(0, repairable.getDamageValue() - repairAmount));
}`}</CodeBlock>
              <P>
                <Code>totalTicks</Code> is the resolved duration including datapack overrides, so
                pacing math stays correct when packs rebalance. Note the ability power multiplier.
              </P>

              <Divider />

              <H3>State during a use</H3>
              <P>
                <Code>AbilityAPI.setUseData</Code> holds any object for the duration of a use. It
                also works inside canUse, so the gate check can hand its work forward instead of
                recomputing. Canopy Leap raycasts once, stashing either the destination or the
                reason it failed:
              </P>
              <CodeBlock>{`@Override
public boolean canUse(ServerPlayer player, int level) {
    BlockPos treeHit = raycastTree(player, level);
    if (treeHit == null) {
        AbilityAPI.setUseData(player, "message.pa_reverie.canopy_leap_no_tree");
        return false;
    }
    ...
    AbilityAPI.setUseData(player, new Vec3(top.getX() + 0.5, top.getY() + 3, top.getZ() + 0.5));
    return true;
}

@Override
public Component getUseFailureMessage(ServerPlayer player, int level) {
    return AbilityAPI.getUseData(player) instanceof String failureKey
            ? Component.translatable(failureKey)
            : Component.translatable("message.pa_reverie.canopy_leap_no_tree");
}

@Override
public void onUseReleased(ServerPlayer player, int level) {
    if (AbilityAPI.getUseData(player) instanceof Vec3 destination) {
        teleportTo(player, destination);
    }
}`}</CodeBlock>
              <P>
                <Code>onUseReleased</Code> fires only when a use completes successfully.{' '}
                <Code>onUseComplete(player, level, cancelled)</Code> also exists for abilities that
                care about both outcomes, like Woodsong awarding partial yields when its channel is
                cut short.
              </P>

              <Divider />

              <H3>Passives</H3>
              <CodeBlock>{`public final class SwiftStepAbility extends PassiveAbility {
    @Override
    public List<AttributeGrant> getAttributeGrants(int level) {
        return List.of(new AttributeGrant(Attributes.MOVEMENT_SPEED,
                0.2 * level, AttributeModifier.Operation.ADD_MULTIPLIED_BASE));
    }

    @Override
    public int getMaxLevel() {
        return 3;
    }
}`}</CodeBlock>
              <P>
                That is the whole ability. The framework applies and removes the modifiers through
                every lifecycle moment: grant, revoke, level change, toggle, login, death. For
                behavior beyond stats, override <Code>onActivated</Code> /{' '}
                <Code>onDeactivated</Code> or listen to game events and check{' '}
                <Code>AbilityAPI.getPassiveLevel(player, ability)</Code>.
              </P>

              <Divider />

              <H3>Triggered abilities</H3>
              <CodeBlock>{`public final class GuardianAngelAbility extends TriggeredAbility<PlayerTriggers.DamageTaken> {
    @Override
    public AbilityTrigger<PlayerTriggers.DamageTaken> getTrigger() {
        return PlayerTriggers.LETHAL_DAMAGE;
    }

    @Override
    public int getCooldownTicks(int level) {
        return 1200;
    }

    @Override
    public void onTrigger(ServerPlayer player, int level) {
        player.setHealth(player.getMaxHealth());
        player.level().playSound(null, player.blockPosition(),
                SoundEvents.TOTEM_USE, SoundSource.PLAYERS, 1.0f, 1.0f);
    }
}`}</CodeBlock>
              <P>
                Add a <Code>shouldTrigger(player, level, context)</Code> condition to filter, like
                only reacting to fire damage or only below 30% health. A fully declarative
                triggered ability needs no onTrigger at all: trigger + cooldown + effect grants.
              </P>
              <P>
                Custom trigger points are plain objects. Declare a static{' '}
                <Code>AbilityTrigger</Code> and call{' '}
                <Code>AbilityAPI.fireTrigger(trigger, player, context)</Code> from your own event
                handler; every subscribed ability gets the full pipeline, including compat gating
                and the HUD banner.
              </P>

              <Divider />

              <H3>Lingering effects</H3>
              <P>
                Declare <Code>getEffectDurationTicks(level)</Code> and the framework runs a timed
                effect after use with <Code>onEffectStart</Code>, <Code>onEffectTick</Code>, and{' '}
                <Code>onEffectEnd</Code> hooks, serialized across relogs and shown on the HUD with
                its icon and timer. Restful Meditation uses it for an anchored trance that heals
                until you move. For plain vanilla buffs, use effect grants instead; both can
                coexist.
              </P>

              <Divider />

              <H3>Utilities and events</H3>
              <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                <li>
                  <Code>AbilityTickJobs.schedule(player, interval, job)</Code> for paced work after
                  a use, like Excavate breaking blocks in waves.
                </li>
                <li>
                  <Code>AbilityAPI.setCooldown</Code> for dynamic cooldowns,{' '}
                  <Code>AbilityAPI.finishUse</Code> for channels that end themselves early.
                </li>
                <li>
                  <Code>AbilityPerformEvent</Code> (cancelable) and{' '}
                  <Code>AbilityPerformedEvent</Code> on the NeoForge bus for gating and observing
                  any ability use, plus granted/revoked events.
                </li>
                <li>
                  <Code>AbilityAPI.getAbilityPower(player)</Code> for stat scaled abilities.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'compat' && (
            <div className="space-y-5 p-6">
              <H2>Mod compat</H2>
              <P>
                Compat is optional: the mod works standalone and the integrations light up when the
                other mod is installed. Both are configured from the same config JSON or
                from ability class defaults.
              </P>

              <Divider />

              <H3>Project MMO</H3>
              <P>
                Two integrations. Use gating cancels an ability use when the player's skill is too
                low, with a per-ability skill and per-level threshold. Granting gives ability
                levels automatically as PMMO skills grow, and takes them away if levels are lost.
              </P>

              <Divider />

              <H3>Pufferfish's Skills</H3>
              <P>
                Skill tree nodes grant abilities. Unlocking the node grants the ability at the
                configured level; multiple nodes can grant the same ability at different levels and
                the highest wins. Grants reconcile against the tree, so respecs, datapack edits,
                and relocking all stay consistent with no stale abilities left behind.
              </P>

              <Divider />

              <H3>Planned</H3>
              <P>
                Iron's Spells 'n Spellbooks mana costs for abilities, so packs using Iron's mana
                pool can price abilities in mana.
              </P>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-5 p-6">
              <H2>FAQ</H2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-zinc-800 dark:text-zinc-100">
                    I installed the mod and the creative tab is empty. Where are the abilities?
                  </p>
                  <P>
                    Player Abilities is a framework and ships none. Install a content mod built on
                    it, like Player Abilities: Reverie, and the tab fills with tomes for everything
                    it adds.
                  </P>
                </div>
                <div>
                  <p className="font-semibold text-zinc-800 dark:text-zinc-100">
                    Why does an ability say level 1/1?
                  </p>
                  <P>
                    Leveling is opt in. An ability that does not declare a max level is a single
                    level ability. Pack authors can raise the cap with max_level in its config if
                    the ability's logic scales.
                  </P>
                </div>
                <div>
                  <p className="font-semibold text-zinc-800 dark:text-zinc-100">
                    An ability from another mod is annoying. Can I remove it?
                  </p>
                  <P>
                    Yes. One datapack file with <Code>{'{ "enabled": false }'}</Code> disables it
                    everywhere without touching player data. Players can also toggle individual
                    passives off for themselves in the ability book.
                  </P>
                </div>
                <div>
                  <p className="font-semibold text-zinc-800 dark:text-zinc-100">
                    Where does cooldown reduction come from?
                  </p>
                  <P>
                    The ability_cooldown attribute. Anything that can add attribute modifiers
                    (gear, potions, skill mods) can grant it. 1.5 halves cooldowns, 2.0 removes
                    them.
                  </P>
                </div>
                <div>
                  <p className="font-semibold text-zinc-800 dark:text-zinc-100">
                    Is it server side, client side, or both?
                  </p>
                  <P>
                    Both sides. All ability logic runs on the server; the client provides the
                    wheel, book, HUD, and keybinds. HUD position and display mode are client
                    config; ability balance lives in server-side datapacks.
                  </P>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
