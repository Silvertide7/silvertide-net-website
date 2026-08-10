import { NavLink } from 'react-router-dom'

type ModLink = {
  path: string
  label: string
  logo?: string
}

const HOME: ModLink = { path: '/', label: 'Home' }

const MODS: ModLink[] = [
  { path: '/artifactory', label: 'Artifactory', logo: '/artifactory/logo.png' },
  { path: '/homebound', label: 'Homebound', logo: '/homebound/logo_small.png' },
  { path: '/alchemical', label: 'Alchemical', logo: '/alchemical/elixir_logo_450.png' },
  { path: '/kindred', label: 'Kindred', logo: '/kindred/kindred_logo.png' },
  { path: '/player-abilities', label: 'Player Abilities', logo: '/player-abilities/logo.png' },
  { path: '/mortal-boons', label: 'Mortal Boons', logo: '/mortal-boons/mortal_boons_logo.png' },
]

const linkBase =
  'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition'
const linkInactive =
  'text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700/60 dark:hover:text-zinc-100'
const linkActive =
  'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `${linkBase} ${isActive ? linkActive : linkInactive}`

export const ModNav = () => (
  <aside className="fixed top-0 left-0 z-40 hidden h-screen w-52 flex-col border-r border-zinc-200 bg-zinc-50 px-3 py-6 dark:border-zinc-700 dark:bg-zinc-900 lg:flex">
    <NavLink to={HOME.path} end className={linkClass}>
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 shrink-0"
        aria-hidden="true"
      >
        <path d="M2 7l6-5 6 5v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Z" />
      </svg>
      {HOME.label}
    </NavLink>

    <p className="mt-6 mb-2 px-3 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
      Mods
    </p>

    <nav className="flex flex-col gap-0.5">
      {MODS.map((mod) => (
        <NavLink key={mod.path} to={mod.path} className={linkClass}>
          {mod.logo && (
            <img
              src={mod.logo}
              alt=""
              className="h-5 w-5 shrink-0 object-contain"
              aria-hidden="true"
            />
          )}
          {mod.label}
        </NavLink>
      ))}
    </nav>
  </aside>
)
