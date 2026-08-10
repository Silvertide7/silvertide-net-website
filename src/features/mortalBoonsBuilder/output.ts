import JSZip from 'jszip'
import type { ContentType, MortalBoonsFormValues } from './fieldConfig'

export const toPrettyJson = (value: unknown) => JSON.stringify(value, null, 2)

const parseIntField = (s: string): number | undefined => {
  const trimmed = s.trim()
  if (trimmed === '') return undefined
  const n = parseInt(trimmed, 10)
  return isNaN(n) ? undefined : n
}

const parseFloatField = (s: string): number | undefined => {
  const trimmed = s.trim()
  if (trimmed === '') return undefined
  const n = parseFloat(trimmed)
  return isNaN(n) ? undefined : n
}

const typeFolder = (type: ContentType) => {
  if (type === 'boon') return 'boons'
  if (type === 'sign') return 'boon_types'
  return 'offerings'
}

export const deriveFileName = (displayName: string): string =>
  displayName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')

export const computeDownloadFileName = (displayName: string): string => {
  const slug = deriveFileName(displayName)
  return slug ? `${slug}.json` : 'mortal_boons.json'
}

export const computePlacementPath = (
  displayName: string,
  type: ContentType,
  namespace: string,
): string | null => {
  const slug = deriveFileName(displayName)
  if (!slug) return null
  const cleanNamespace = namespace.trim() || 'mypack'
  return `data/${cleanNamespace}/mortal_boons/${typeFolder(type)}/${slug}.json`
}

const singleOrTiers = <T>(
  mode: 'single' | 'per_tier',
  single: T | undefined,
  tiers: Array<T | undefined>,
  fallback: T,
): T | T[] | undefined => {
  if (mode === 'single') return single
  if (tiers.every((value) => value === undefined)) return undefined
  return tiers.map((value) => value ?? fallback)
}

export const toCleanOutput = (values: MortalBoonsFormValues): Record<string, unknown> => {
  if (values.content_type === 'boon') return boonOutput(values)
  if (values.content_type === 'sign') return signOutput(values)
  return offeringOutput(values)
}

const boonOutput = (values: MortalBoonsFormValues): Record<string, unknown> => {
  const out: Record<string, unknown> = {}

  const weight = singleOrTiers(
    values.weight_mode,
    parseIntField(values.weight_single),
    values.weight_tiers.map(parseIntField),
    0,
  )
  if (weight !== undefined) out.weight = weight

  const types = values.types.map(({ value }) => value.trim()).filter(Boolean)
  if (types.length > 0) out.types = types

  const icon = values.icon.trim()
  if (icon) out.icon = icon

  const displayName = values.display_name.trim()
  if (displayName) out.name = displayName

  const description = values.description.trim()
  if (description) out.description = description

  const attributeGrants = values.attribute_grants
    .filter((grant) => grant.attribute.trim() !== '')
    .map((grant) => {
      const entry: Record<string, unknown> = { attribute: grant.attribute.trim() }
      const amount = singleOrTiers(
        grant.amount_mode,
        parseFloatField(grant.amount_single),
        grant.amount_tiers.map(parseFloatField),
        0,
      )
      if (amount !== undefined) entry.amount = amount
      entry.operation = grant.operation
      return entry
    })
  if (attributeGrants.length > 0) out.attribute_grants = attributeGrants

  const abilityGrants = values.ability_grants
    .filter((grant) => grant.ability.trim() !== '')
    .map((grant) => {
      const entry: Record<string, unknown> = { ability: grant.ability.trim() }
      const level = singleOrTiers(
        grant.level_mode,
        parseIntField(grant.level_single),
        grant.level_tiers.map(parseIntField),
        1,
      )
      if (level !== undefined) entry.level = level
      return entry
    })
  if (abilityGrants.length > 0) out.ability_grants = abilityGrants

  return out
}

const signOutput = (values: MortalBoonsFormValues): Record<string, unknown> => {
  const out: Record<string, unknown> = {}

  const displayName = values.display_name.trim()
  if (displayName) out.title = displayName

  const color = values.color.trim()
  if (color) out.color = color

  return out
}

const offeringOutput = (values: MortalBoonsFormValues): Record<string, unknown> => {
  const out: Record<string, unknown> = {}

  const item = values.item.trim()
  if (item) out.item = values.item_is_tag ? { tag: item } : { item }

  const count = parseIntField(values.count)
  if (count !== undefined) out.count = count

  const tierMultipliers = values.tier_multipliers.map(parseFloatField)
  if (tierMultipliers.some((value) => value !== undefined)) {
    out.tier_weight_multiplier = tierMultipliers.map((value) => value ?? 1.0)
  }

  const typeMultipliers: Record<string, number> = {}
  for (const entry of values.type_multipliers) {
    const type = entry.type.trim()
    const multiplier = parseFloatField(entry.multiplier)
    if (type && multiplier !== undefined) typeMultipliers[type] = multiplier
  }
  if (Object.keys(typeMultipliers).length > 0) out.type_weight_multiplier = typeMultipliers

  const minTier = parseIntField(values.min_tier)
  if (minTier !== undefined) out.min_tier = minTier

  const description = values.description.trim()
  if (description) out.description = description

  return out
}

export const copyJsonToClipboard = async (jsonValue: unknown) => {
  await navigator.clipboard.writeText(toPrettyJson(jsonValue))
}

const triggerDownload = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob)
  try {
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } finally {
    URL.revokeObjectURL(url)
  }
}

export const downloadJsonFile = (jsonValue: unknown, fileName = 'mortal_boons.json') => {
  triggerDownload(new Blob([toPrettyJson(jsonValue)], { type: 'application/json' }), fileName)
}

export const downloadDatapack = async (
  items: Array<{ content_type: ContentType; values: MortalBoonsFormValues }>,
) => {
  const zip = new JSZip()

  zip.file(
    'pack.mcmeta',
    toPrettyJson({
      pack: {
        description: 'Mortal Boons Datapack built from Web Builder',
        pack_format: 48,
      },
    }),
  )

  for (const item of items) {
    const path = computePlacementPath(
      item.values.display_name,
      item.content_type,
      item.values.namespace,
    )
    if (!path) continue
    zip.file(path, toPrettyJson(toCleanOutput(item.values)))
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  triggerDownload(blob, 'mortal-boons-datapack.zip')
}
