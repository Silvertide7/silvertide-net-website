import { z } from 'zod'

export type ContentType = 'boon' | 'sign' | 'offering'

export const TIER_LABELS = ['Iron', 'Gold', 'Diamond', 'Netherite'] as const

const RESOURCE_LOCATION = /^[a-z0-9_.-]+:[a-z0-9_./-]+$/
const NAMESPACE = /^[a-z0-9_.-]+$/
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/

const resourceLocationOrEmpty = z
  .string()
  .refine((val) => val.trim() === '' || RESOURCE_LOCATION.test(val.trim()), {
    message: 'Format: modid:name (e.g. minecraft:generic.max_health)',
  })

const optionalInt = (min: number, max?: number) =>
  z.string().refine(
    (val) => {
      if (val.trim() === '') return true
      const n = Number(val)
      if (!Number.isInteger(n) || n < min) return false
      return max === undefined || n <= max
    },
    {
      message:
        max === undefined
          ? `Must be a whole number of at least ${min}`
          : `Must be a whole number between ${min} and ${max}`,
    },
  )

const optionalFloat = z.string().refine(
  (val) => {
    if (val.trim() === '') return true
    return !isNaN(parseFloat(val))
  },
  { message: 'Must be a number' },
)

const optionalNonNegativeFloat = z.string().refine(
  (val) => {
    if (val.trim() === '') return true
    const n = parseFloat(val)
    return !isNaN(n) && n >= 0
  },
  { message: 'Must be a number of at least 0' },
)

const tierValues = z.tuple([optionalFloat, optionalFloat, optionalFloat, optionalFloat])

const attributeGrantSchema = z.object({
  attribute: resourceLocationOrEmpty,
  operation: z.enum(['add_value', 'add_multiplied_base', 'add_multiplied_total']),
  amount_mode: z.enum(['single', 'per_tier']),
  amount_single: optionalFloat,
  amount_tiers: tierValues,
})

const abilityGrantSchema = z.object({
  ability: resourceLocationOrEmpty,
  level_mode: z.enum(['single', 'per_tier']),
  level_single: optionalInt(1),
  level_tiers: z.tuple([optionalInt(1), optionalInt(1), optionalInt(1), optionalInt(1)]),
})

const typeMultiplierSchema = z.object({
  type: resourceLocationOrEmpty,
  multiplier: optionalNonNegativeFloat,
})

export const mortalBoonsFormSchema = z
  .object({
    content_type: z.enum(['boon', 'sign', 'offering']),
    namespace: z
      .string()
      .refine((val) => val.trim() !== '' && NAMESPACE.test(val.trim()), {
        message: 'Lowercase letters, numbers, underscores (e.g. mypack)',
      }),
    display_name: z.string(),

    // Boon fields
    weight_mode: z.enum(['single', 'per_tier']),
    weight_single: optionalInt(0),
    weight_tiers: z.tuple([optionalInt(0), optionalInt(0), optionalInt(0), optionalInt(0)]),
    types: z.array(z.object({ value: resourceLocationOrEmpty })),
    icon: resourceLocationOrEmpty,
    description: z.string(),
    attribute_grants: z.array(attributeGrantSchema),
    ability_grants: z.array(abilityGrantSchema),

    // Sign fields
    color: z
      .string()
      .refine((val) => val.trim() === '' || HEX_COLOR.test(val.trim()), {
        message: 'Must be a 6-digit hex color (e.g. #3E7C44)',
      }),

    // Offering fields
    item: resourceLocationOrEmpty,
    item_is_tag: z.boolean(),
    count: optionalInt(1, 64),
    tier_multipliers: z.tuple([
      optionalNonNegativeFloat,
      optionalNonNegativeFloat,
      optionalNonNegativeFloat,
      optionalNonNegativeFloat,
    ]),
    type_multipliers: z.array(typeMultiplierSchema),
    min_tier: z.enum(['', '2', '3', '4']),
  })
  .superRefine((data, ctx) => {
    if (data.display_name.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Name is required, it becomes the file name',
        path: ['display_name'],
      })
    }
    if (data.content_type === 'offering' && data.item.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Item is required for offerings',
        path: ['item'],
      })
    }
    if (data.content_type === 'boon') {
      data.attribute_grants.forEach((grant, index) => {
        if (grant.attribute.trim() === '') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Attribute is required',
            path: ['attribute_grants', index, 'attribute'],
          })
        }
      })
      data.ability_grants.forEach((grant, index) => {
        if (grant.ability.trim() === '') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Ability id is required',
            path: ['ability_grants', index, 'ability'],
          })
        }
      })
    }
  })

export type MortalBoonsFormValues = z.infer<typeof mortalBoonsFormSchema>
type AttributeGrantValues = z.infer<typeof attributeGrantSchema>
type AbilityGrantValues = z.infer<typeof abilityGrantSchema>

export const emptyAttributeGrant: AttributeGrantValues = {
  attribute: '',
  operation: 'add_value',
  amount_mode: 'per_tier',
  amount_single: '',
  amount_tiers: ['', '', '', ''],
}

export const emptyAbilityGrant: AbilityGrantValues = {
  ability: '',
  level_mode: 'single',
  level_single: '',
  level_tiers: ['', '', '', ''],
}

export const defaultValues: MortalBoonsFormValues = {
  content_type: 'boon',
  namespace: 'mypack',
  display_name: '',

  weight_mode: 'single',
  weight_single: '',
  weight_tiers: ['', '', '', ''],
  types: [],
  icon: '',
  description: '',
  attribute_grants: [emptyAttributeGrant],
  ability_grants: [],

  color: '',

  item: '',
  item_is_tag: false,
  count: '',
  tier_multipliers: ['', '', '', ''],
  type_multipliers: [],
  min_tier: '',
}

export const DEFAULT_SIGNS = [
  'mortal_boons:bear',
  'mortal_boons:wolf',
  'mortal_boons:hare',
  'mortal_boons:wyrm',
  'mortal_boons:raven',
] as const
