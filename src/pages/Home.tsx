import { Link } from 'react-router-dom'

type Mod = {
  path: string
  titleAlt: string
  description: string
  tags: string[]
  logo?: string
  title?: string
  name?: string
  centerTitle?: boolean
}

const mods: Mod[] = [
  {
    path: '/artifactory',
    logo: '/artifactory/logo.png',
    title: '/artifactory/title.png',
    titleAlt: 'Artifactory',
    description:
      'A data-driven attunement system for Minecraft. Bind items to their wielder through configurable requirements, unlock powerful modifications, and create deep progression for any item in the game.',
    tags: ['Forge 1.20.1', 'NeoForge 1.21.1'],
  },
  {
    path: '/homebound',
    logo: '/homebound/logo_small.png',
    title: '/homebound/title.png',
    titleAlt: 'Homebound',
    centerTitle: true,
    description:
      'Items that let you set a home and teleport there without trivializing transportation and danger in Minecraft. Fully configurable cooldowns, distance restrictions, and dimensional travel rules.',
    tags: ['Forge 1.20.1', 'NeoForge 1.21.1'],
  },
  {
    path: '/kindred',
    logo: '/kindred/kindred_logo.png',
    title: '/kindred/kindred_banner.png',
    titleAlt: 'Kindred',
    centerTitle: true,
    description:
      'Bond your tamed pets into a portable companion roster. Pets live on you, not in the world: they survive logouts, deaths, and dimension changes, and answer a single keypress from anywhere.',
    tags: ['NeoForge 1.21.1'],
  },
  {
    path: '/player-abilities',
    logo: '/player-abilities/logo.png',
    title: '/player-abilities/title.png',
    titleAlt: 'Player Abilities',
    centerTitle: true,
    description:
      'A framework for player abilities: castable actives, always-on passives, and triggered abilities that fire on their own when a condition is met. Levels, cooldowns, requirements, and full datapack configuration, with an API for building your own.',
    tags: ['NeoForge 1.21.1'],
  },
  {
    path: '/alchemical',
    logo: '/alchemical/elixir_logo_450.png',
    title: '/alchemical/minecraft_title_hd.png',
    titleAlt: 'Alchemical',
    description:
      'A reusable elixir system inspired by real-world alchemy. Craft permanent flasks, load them with Essence Stones, Tinctures, and Catalysts, and fine-tune effects, duration, and cooldowns. Fully datapack-driven.',
    tags: ['NeoForge 1.21.1'],
  },
]

export const Home = () => (
  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {mods.map((mod) => (
        <Link
          key={mod.path}
          to={mod.path}
          className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-600 dark:bg-zinc-700 dark:hover:border-zinc-500"
        >
          <div className="mb-4 flex items-center gap-3">
            {mod.logo && (
              <img
                src={mod.logo}
                alt={mod.titleAlt}
                className="h-12 w-12 shrink-0 object-contain drop-shadow-sm"
              />
            )}
            <div className="min-w-0 flex-1">
              {mod.title ? (
                <img
                  src={mod.title}
                  alt={mod.titleAlt}
                  className={`h-10 w-full object-contain ${mod.centerTitle ? 'object-center' : 'object-left'}`}
                />
              ) : (
                <span className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
                  {mod.name ?? mod.titleAlt}
                </span>
              )}
            </div>
          </div>

          <p className="flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {mod.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {mod.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-500 dark:bg-zinc-600 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-1 text-sm font-medium text-zinc-700 transition group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100">
            View mod
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </div>
        </Link>
      ))}
  </div>
)
