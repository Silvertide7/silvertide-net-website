type Props = {
  curseforgeUrl: string
  modrinthUrl?: string
  discordUrl?: string
  className?: string
}

const linkClass =
  'flex items-center justify-center rounded-xl border border-zinc-800 bg-black p-3 shadow-sm transition hover:border-zinc-600 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400'

export const DownloadLinks = ({ curseforgeUrl, modrinthUrl, discordUrl, className = '' }: Props) => (
  <div className={`flex flex-col gap-3 ${className}`}>
    <a
      href={curseforgeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
      aria-label="Download on CurseForge (opens in a new tab)"
    >
      <img
        src="/curseforge_link.png"
        alt="CurseForge"
        className="h-auto w-40 object-contain"
      />
    </a>
    {modrinthUrl && (
      <a
        href={modrinthUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label="Download on Modrinth (opens in a new tab)"
      >
        <img
          src="/modrinth_link.png"
          alt="Modrinth"
          className="h-auto w-40 object-contain"
        />
      </a>
    )}
    {discordUrl && (
      <a
        href={discordUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label="Join the Discord (opens in a new tab)"
      >
        <img
          src="/discord_link.png"
          alt="Discord"
          className="h-auto w-40 object-contain"
        />
      </a>
    )}
  </div>
)
