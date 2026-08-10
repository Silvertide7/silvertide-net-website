import { Link, useLocation } from 'react-router-dom'

const LABELS: Record<string, string> = {
  '': 'Home',
  artifactory: 'Artifactory',
  'config-generator': 'JSON / Datapack Builder',
  homebound: 'Homebound',
  alchemical: 'Alchemical',
  'ingredient-builder': 'Ingredient Builder',
  kindred: 'Kindred',
  'mortal-boons': 'Mortal Boons',
  'datapack-builder': 'Datapack Builder',
}

export const Breadcrumb = () => {
  const { pathname } = useLocation()

  const segments = pathname.split('/').filter(Boolean)
  const crumbs = [
    { label: 'Home', path: '/' },
    ...segments.map((seg, i) => ({
      label: LABELS[seg] ?? seg,
      path: '/' + segments.slice(0, i + 1).join('/'),
    })),
  ]

  if (crumbs.length <= 1) return null

  return (
    <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-xs text-zinc-400">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1
        return (
          <span key={crumb.path} className="flex items-center gap-1.5">
            {i > 0 && (
              <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-600">
                /
              </span>
            )}
            {isLast ? (
              <span className="font-medium text-zinc-600 dark:text-zinc-300">{crumb.label}</span>
            ) : (
              <Link
                to={crumb.path}
                className="transition hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
