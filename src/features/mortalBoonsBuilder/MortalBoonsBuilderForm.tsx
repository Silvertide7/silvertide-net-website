import { useEffect, useMemo, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm, type UseFormRegister } from 'react-hook-form'
import { Button } from '../../components/Button'
import { FormField } from '../../components/FormField'
import { JsonPreview } from '../../components/JsonPreview'
import { SectionHeader } from '../../components/SectionHeader'
import { StringListInput } from '../../components/StringListInput'
import { Tooltip } from '../../components/Tooltip'
import { ErrorMessage } from '../../components/ErrorMessage'
import { inputClass, selectClass } from '../../components/inputStyles'
import { ATTRIBUTES_1211 } from '../../data/attributes'
import { SavedItemsList } from './SavedItemsList'
import { useSavedItems, itemKey } from './useSavedItems'
import {
  mortalBoonsFormSchema,
  defaultValues,
  emptyAttributeGrant,
  emptyAbilityGrant,
  TIER_LABELS,
  DEFAULT_SIGNS,
  type ContentType,
  type MortalBoonsFormValues,
} from './fieldConfig'
import {
  copyJsonToClipboard,
  computeDownloadFileName,
  computePlacementPath,
  deriveFileName,
  downloadJsonFile,
  downloadDatapack,
  toCleanOutput,
  toPrettyJson,
} from './output'

const TYPE_LABELS: Record<ContentType, string> = {
  boon: 'Boon',
  sign: 'Sign',
  offering: 'Offering',
}

const TYPE_ACCENT: Record<ContentType, string> = {
  boon: 'text-amber-600 dark:text-amber-400',
  sign: 'text-emerald-600 dark:text-emerald-400',
  offering: 'text-sky-600 dark:text-sky-400',
}

const modeToggleClass = (active: boolean) =>
  [
    'rounded-md px-2.5 py-1 text-[11px] font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400',
    active
      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
      : 'text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-600 dark:hover:text-zinc-200',
  ].join(' ')

type TierFieldErrors = readonly ({ message?: string } | undefined)[] | undefined

type TierInputsProps = {
  register: UseFormRegister<MortalBoonsFormValues>
  namePrefix: string
  step?: string
  placeholders?: readonly [string, string, string, string]
  errors?: TierFieldErrors
}

const TierInputs = ({ register, namePrefix, step, placeholders, errors }: TierInputsProps) => {
  const firstErrorMessage = errors?.find((error) => error?.message)?.message
  return (
    <div className="space-y-1">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {TIER_LABELS.map((tier, index) => (
          <div key={tier} className="space-y-1">
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
              {tier}
            </span>
            <input
              type="number"
              step={step ?? 'any'}
              placeholder={placeholders?.[index]}
              aria-invalid={errors?.[index] ? true : undefined}
              className={inputClass}
              {...register(`${namePrefix}.${index}` as never)}
            />
          </div>
        ))}
      </div>
      {firstErrorMessage && <ErrorMessage message={firstErrorMessage} />}
    </div>
  )
}

export const MortalBoonsBuilderForm = () => {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [pendingLoad, setPendingLoad] = useState<string | null>(null)
  const [savePrompt, setSavePrompt] = useState(false)
  const { items: savedItems, save: saveItem, remove: removeItem, find: findItem } = useSavedItems()

  const {
    register,
    control,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm<MortalBoonsFormValues>({
    defaultValues,
    resolver: zodResolver(mortalBoonsFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const attributeGrants = useFieldArray({ control, name: 'attribute_grants' })
  const abilityGrants = useFieldArray({ control, name: 'ability_grants' })
  const typeMultipliers = useFieldArray({ control, name: 'type_multipliers' })

  const [cleanOutput, setCleanOutput] = useState(() => toCleanOutput(getValues()))

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const { unsubscribe } = watch((values) => {
      setCleanOutput(toCleanOutput(values as MortalBoonsFormValues))
    })
    return unsubscribe
  }, [watch])

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current !== null) clearTimeout(copyTimeoutRef.current)
    }
  }, [])

  const previewJson = useMemo(() => toPrettyJson(cleanOutput), [cleanOutput])
  const hasOutput = Object.keys(cleanOutput).length > 0

  const contentType = watch('content_type')
  const displayName = watch('display_name')
  const namespace = watch('namespace')
  const weightMode = watch('weight_mode')
  const selectedTypes = watch('types')

  const slug = deriveFileName(displayName)
  const downloadFileName = computeDownloadFileName(displayName)
  const placementPath = computePlacementPath(displayName, contentType, namespace)

  const namespaceIsValid = /^[a-z0-9_.-]+$/.test(namespace.trim())
  const canSave = hasOutput && slug !== '' && namespaceIsValid

  const doLoad = (loaded: MortalBoonsFormValues) => {
    const values = { ...defaultValues, ...loaded }
    reset(values)
    setCleanOutput(toCleanOutput(values))
    setPendingLoad(null)
    setSavePrompt(false)
    setCopyState('idle')
  }

  const handleTypeChange = (type: ContentType) => {
    reset({ ...defaultValues, content_type: type, namespace })
    setCleanOutput({})
    setCopyState('idle')
  }

  const handleItemClick = (key: string) => {
    if (!hasOutput) {
      const item = findItem(key)
      if (item) doLoad(item.values)
    } else {
      setPendingLoad(key)
    }
  }

  const handleLoad = (key: string) => {
    const item = findItem(key)
    if (item) doLoad(item.values)
  }

  const handleSave = () => {
    if (!canSave) return
    const existing = findItem(itemKey(namespace, contentType, displayName))
    if (!existing) {
      saveItem(getValues())
      return
    }
    if (toPrettyJson(toCleanOutput(existing.values)) === toPrettyJson(cleanOutput)) return
    setSavePrompt(true)
  }

  const onCopy = async () => {
    try {
      await copyJsonToClipboard(cleanOutput)
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }
    if (copyTimeoutRef.current !== null) clearTimeout(copyTimeoutRef.current)
    copyTimeoutRef.current = setTimeout(() => setCopyState('idle'), 1500)
  }

  const onReset = () => {
    reset({ ...defaultValues, content_type: contentType, namespace })
    setCleanOutput({})
    setCopyState('idle')
  }

  const toggleDefaultSign = (sign: string) => {
    const current = getValues('types')
    const index = current.findIndex((entry) => entry.value.trim() === sign)
    if (index >= 0) {
      setValue(
        'types',
        current.filter((_, i) => i !== index),
        { shouldDirty: true },
      )
    } else {
      setValue('types', [...current, { value: sign }], { shouldDirty: true })
    }
  }

  const isBoon = contentType === 'boon'
  const isSign = contentType === 'sign'
  const isOffering = contentType === 'offering'

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <form className="space-y-4 lg:col-span-3" onSubmit={(e) => e.preventDefault()} noValidate>
        <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
          <SectionHeader title="Content Type" />
          <div className="p-5">
            <div className="flex gap-2">
              {(['boon', 'sign', 'offering'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleTypeChange(type)}
                  className={[
                    'flex-1 rounded-lg border px-3 py-2.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                    contentType === type
                      ? type === 'boon'
                        ? 'border-amber-300 bg-amber-50 text-amber-700 focus-visible:outline-amber-400 dark:border-amber-700/60 dark:bg-amber-950/30 dark:text-amber-400'
                        : type === 'sign'
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-700 focus-visible:outline-emerald-400 dark:border-emerald-700/60 dark:bg-emerald-950/30 dark:text-emerald-400'
                          : 'border-sky-300 bg-sky-50 text-sky-700 focus-visible:outline-sky-400 dark:border-sky-700/60 dark:bg-sky-950/30 dark:text-sky-400'
                      : 'border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 focus-visible:outline-zinc-400 dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200',
                  ].join(' ')}
                >
                  {TYPE_LABELS[type]}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-400">
              {isBoon
                ? 'A rollable reward: attribute bonuses (and optionally Player Abilities) that scale with tier.'
                : isSign
                  ? 'A category boons belong to, shown on cards in its color. The mod ships The Bear, Wolf, Hare, Wyrm, and Raven.'
                  : 'An item players place in the Fatestone to sway the roll: tier odds, sign odds, or a minimum tier.'}
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
          <SectionHeader title="Identity" />
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <FormField
              label="Namespace"
              htmlFor="namespace"
              error={errors.namespace?.message}
              hint={'The datapack namespace your files live under.\nBecomes part of every id: <namespace>:<file_name>.\n\nUse your own pack name, e.g. mypack.\nUsing mortal_boons here lets you override the built-in files by name.'}
            >
              {(errorId) => (
                <input
                  id="namespace"
                  type="text"
                  placeholder="mypack"
                  aria-describedby={errorId}
                  aria-invalid={errors.namespace ? true : undefined}
                  className={inputClass}
                  {...register('namespace')}
                />
              )}
            </FormField>

            <FormField
              label={
                <span>
                  Name{' '}
                  <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[10px] font-semibold text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                    Required
                  </span>
                </span>
              }
              htmlFor="display_name"
              error={errors.display_name?.message}
              hint={
                isBoon
                  ? 'Shown on the boon card. Also derives the file name.\nExample: Fleetfoot, Iron Blooded, Springstep.'
                  : isSign
                    ? 'The sign title shown on cards, e.g. The Hare.\nAlso derives the file name.'
                    : 'Only used to derive the file name. Offerings show their item name in game.'
              }
            >
              {(errorId) => (
                <input
                  id="display_name"
                  type="text"
                  placeholder={isBoon ? 'Fleetfoot' : isSign ? 'The Hare' : 'Golden Offering'}
                  aria-describedby={errorId}
                  aria-invalid={errors.display_name ? true : undefined}
                  className={inputClass}
                  {...register('display_name')}
                />
              )}
            </FormField>

            {slug && placementPath && (
              <div className="space-y-0.5 sm:col-span-2">
                <p className="text-xs text-zinc-400">
                  Will download as{' '}
                  <span className="font-mono font-medium text-zinc-600 dark:text-zinc-300">
                    {downloadFileName}
                  </span>
                </p>
                <p className="text-xs text-zinc-400">
                  Place in{' '}
                  <span className="font-mono font-medium text-zinc-600 dark:text-zinc-300">
                    {placementPath}
                  </span>
                </p>
              </div>
            )}

            {isSign && (
              <FormField
                label="Color"
                htmlFor="color"
                error={errors.color?.message}
                hint={'Hex color for the sign title on cards.\nFormat: #RRGGBB\n\nDefault sign colors:\n  #6B4A2A (The Bear)\n  #8C2F2F (The Wolf)\n  #3E7C44 (The Hare)\n  #A85A1E (The Wyrm)\n  #4A3A6B (The Raven)'}
              >
                {(errorId) => (
                  <input
                    id="color"
                    type="text"
                    placeholder="#3E7C44"
                    aria-describedby={errorId}
                    aria-invalid={errors.color ? true : undefined}
                    className={inputClass}
                    {...register('color')}
                  />
                )}
              </FormField>
            )}

            {isBoon && (
              <>
                <FormField
                  label="Icon"
                  htmlFor="icon"
                  error={errors.icon?.message}
                  hint={'Texture path shown in the card frame.\nAny 16x16 texture works.\n\nExamples:\n  minecraft:textures/item/feather.png\n  minecraft:textures/item/golden_apple.png\n\nBoons that grant a Player Ability fall back to that ability\'s icon automatically.'}
                >
                  {(errorId) => (
                    <input
                      id="icon"
                      type="text"
                      placeholder="minecraft:textures/item/feather.png"
                      aria-describedby={errorId}
                      aria-invalid={errors.icon ? true : undefined}
                      className={inputClass}
                      {...register('icon')}
                    />
                  )}
                </FormField>

                <FormField
                  label="Description"
                  htmlFor="description"
                  error={undefined}
                  hint={'Optional flavor line shown in the card tooltip.\nExample: "The road grows shorter beneath you."'}
                >
                  {() => (
                    <input
                      id="description"
                      type="text"
                      placeholder="The road grows shorter beneath you."
                      className={inputClass}
                      {...register('description')}
                    />
                  )}
                </FormField>
              </>
            )}

            {isOffering && (
              <FormField
                label="Description"
                htmlFor="description"
                error={undefined}
                hint={'Optional tooltip text replacing the auto-generated one.\nExample: "Favors a Gold turn of fate."\n\nLeave empty and the mod describes the offering\'s mechanics automatically.'}
              >
                {() => (
                  <input
                    id="description"
                    type="text"
                    placeholder="Favors a Gold turn of fate."
                    className={inputClass}
                    {...register('description')}
                  />
                )}
              </FormField>
            )}
          </div>
        </section>

        {isBoon && (
          <>
            <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
              <SectionHeader title={<span className={TYPE_ACCENT.boon}>Weight and Tiers</span>} />
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    Roll Weight
                    <Tooltip
                      content={
                        'How likely this boon is relative to others once a tier is rolled.\nDefault boons all use 10.\n\nPer tier mode gates tiers: a weight of 0 means the boon can never appear at that tier.\nExample: 0 / 0 / 10 / 10 makes a Diamond-and-up boon.'
                      }
                    />
                  </span>
                  <div className="flex gap-1 rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-800/60">
                    <button
                      type="button"
                      onClick={() => setValue('weight_mode', 'single', { shouldDirty: true })}
                      className={modeToggleClass(weightMode === 'single')}
                    >
                      Same all tiers
                    </button>
                    <button
                      type="button"
                      onClick={() => setValue('weight_mode', 'per_tier', { shouldDirty: true })}
                      className={modeToggleClass(weightMode === 'per_tier')}
                    >
                      Per tier
                    </button>
                  </div>
                </div>
                {weightMode === 'single' ? (
                  <div className="space-y-1">
                    <input
                      type="number"
                      step="1"
                      placeholder="10"
                      className={inputClass}
                      {...register('weight_single')}
                    />
                    {errors.weight_single?.message && (
                      <ErrorMessage message={errors.weight_single.message} />
                    )}
                  </div>
                ) : (
                  <TierInputs
                    register={register}
                    namePrefix="weight_tiers"
                    step="1"
                    placeholders={['0', '0', '10', '10']}
                    errors={errors.weight_tiers as TierFieldErrors}
                  />
                )}

                <div className="space-y-2 pt-2">
                  <span className="flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    Signs
                    <Tooltip
                      content={
                        'The signs this boon belongs to. Shown on the card and targeted by offering sign multipliers.\n\nClick to toggle the default signs, or add your own custom sign ids below.'
                      }
                    />
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {DEFAULT_SIGNS.map((sign) => {
                      const active = selectedTypes.some((entry) => entry.value.trim() === sign)
                      return (
                        <button
                          key={sign}
                          type="button"
                          onClick={() => toggleDefaultSign(sign)}
                          className={[
                            'rounded-full border px-2.5 py-1 text-[11px] font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400',
                            active
                              ? 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700/60 dark:bg-amber-950/30 dark:text-amber-400'
                              : 'border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200',
                          ].join(' ')}
                        >
                          {sign.replace('mortal_boons:', '')}
                        </button>
                      )
                    })}
                  </div>
                  <StringListInput
                    control={control}
                    name="types"
                    label="Sign ids"
                    labelClassName="text-xs font-medium text-zinc-500 dark:text-zinc-400"
                    placeholder="mypack:custom_sign"
                    itemErrors={errors.types as never}
                  />
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
              <SectionHeader
                title={<span className={TYPE_ACCENT.boon}>Attribute Grants</span>}
                action={
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={() => attributeGrants.append(emptyAttributeGrant)}
                  >
                    + Add attribute
                  </Button>
                }
              />
              <div className="space-y-4 p-5">
                {attributeGrants.fields.length === 0 && (
                  <p className="rounded-lg border border-dashed border-zinc-300 py-3 text-center text-xs text-zinc-400 dark:border-zinc-600">
                    No attribute grants. A boon needs at least one attribute or ability grant to do
                    anything.
                  </p>
                )}
                {attributeGrants.fields.map((field, index) => {
                  const grantErrors = errors.attribute_grants?.[index]
                  const amountMode = watch(`attribute_grants.${index}.amount_mode`)
                  return (
                    <div
                      key={field.id}
                      className="space-y-3 rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-600 dark:bg-zinc-600/30"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <FormField
                            label="Attribute"
                            htmlFor={`attribute-${index}`}
                            error={grantErrors?.attribute?.message}
                            hint={'The attribute to modify.\nStart typing for suggestions, or paste any modded attribute id.\n\nExamples:\n  minecraft:generic.max_health\n  minecraft:generic.movement_speed\n  minecraft:generic.attack_damage'}
                          >
                            {(errorId) => (
                              <input
                                id={`attribute-${index}`}
                                type="text"
                                list="mortal-boons-attributes"
                                placeholder="minecraft:generic.max_health"
                                aria-describedby={errorId}
                                aria-invalid={grantErrors?.attribute ? true : undefined}
                                className={inputClass}
                                {...register(`attribute_grants.${index}.attribute`)}
                              />
                            )}
                          </FormField>
                        </div>
                        <button
                          type="button"
                          onClick={() => attributeGrants.remove(index)}
                          aria-label={`Remove attribute grant ${index + 1}`}
                          className="mt-7 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:border-zinc-600 dark:hover:border-rose-700 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                        >
                          ×
                        </button>
                      </div>

                      <FormField
                        label="Operation"
                        htmlFor={`operation-${index}`}
                        error={undefined}
                        hint={'add_value: flat amount (e.g. +2 hearts of Max Health).\nadd_multiplied_base: percentage of the base value (0.2 = +20%).\nadd_multiplied_total: percentage of the final value after other modifiers.'}
                      >
                        {() => (
                          <select
                            id={`operation-${index}`}
                            className={selectClass}
                            {...register(`attribute_grants.${index}.operation`)}
                          >
                            <option value="add_value">add_value (flat)</option>
                            <option value="add_multiplied_base">
                              add_multiplied_base (% of base)
                            </option>
                            <option value="add_multiplied_total">
                              add_multiplied_total (% of total)
                            </option>
                          </select>
                        )}
                      </FormField>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                            Amount
                            <Tooltip
                              content={
                                'The value granted at each tier (Iron, Gold, Diamond, Netherite).\nHigher tiers should be stronger.\n\nExample for Max Health: 2 / 4 / 6 / 8.\nFor percentage operations use decimals: 0.08 = 8%.'
                              }
                            />
                          </span>
                          <div className="flex gap-1 rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-800/60">
                            <button
                              type="button"
                              onClick={() =>
                                setValue(`attribute_grants.${index}.amount_mode`, 'single', {
                                  shouldDirty: true,
                                })
                              }
                              className={modeToggleClass(amountMode === 'single')}
                            >
                              Same all tiers
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setValue(`attribute_grants.${index}.amount_mode`, 'per_tier', {
                                  shouldDirty: true,
                                })
                              }
                              className={modeToggleClass(amountMode === 'per_tier')}
                            >
                              Per tier
                            </button>
                          </div>
                        </div>
                        {amountMode === 'single' ? (
                          <input
                            type="number"
                            step="any"
                            placeholder="2"
                            className={inputClass}
                            {...register(`attribute_grants.${index}.amount_single`)}
                          />
                        ) : (
                          <TierInputs
                            register={register}
                            namePrefix={`attribute_grants.${index}.amount_tiers`}
                            placeholders={['2', '4', '6', '8']}
                            errors={grantErrors?.amount_tiers as TierFieldErrors}
                          />
                        )}
                      </div>
                    </div>
                  )
                })}
                <datalist id="mortal-boons-attributes">
                  {ATTRIBUTES_1211.map((attribute) => (
                    <option key={attribute} value={attribute} />
                  ))}
                </datalist>
              </div>
            </section>

            <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
              <SectionHeader
                title={<span className={TYPE_ACCENT.boon}>Ability Grants (Player Abilities)</span>}
                action={
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={() => abilityGrants.append(emptyAbilityGrant)}
                  >
                    + Add ability
                  </Button>
                }
              />
              <div className="space-y-4 p-5">
                <p className="text-xs text-zinc-400">
                  Optional. Requires the Player Abilities mod. Boons that only grant abilities are
                  removed from the roll pool automatically when Player Abilities is not installed.
                </p>
                {abilityGrants.fields.map((field, index) => {
                  const grantErrors = errors.ability_grants?.[index]
                  const levelMode = watch(`ability_grants.${index}.level_mode`)
                  return (
                    <div
                      key={field.id}
                      className="space-y-3 rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-600 dark:bg-zinc-600/30"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <FormField
                            label="Ability Id"
                            htmlFor={`ability-${index}`}
                            error={grantErrors?.ability?.message}
                            hint={'The Player Abilities id of the ability to grant.\nFormat: namespace:ability_name'}
                          >
                            {(errorId) => (
                              <input
                                id={`ability-${index}`}
                                type="text"
                                placeholder="player_abilities:swift_step"
                                aria-describedby={errorId}
                                aria-invalid={grantErrors?.ability ? true : undefined}
                                className={inputClass}
                                {...register(`ability_grants.${index}.ability`)}
                              />
                            )}
                          </FormField>
                        </div>
                        <button
                          type="button"
                          onClick={() => abilityGrants.remove(index)}
                          aria-label={`Remove ability grant ${index + 1}`}
                          className="mt-7 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:border-zinc-600 dark:hover:border-rose-700 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                        >
                          ×
                        </button>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                            Ability Level
                            <Tooltip
                              content={
                                'The ability level granted at each tier.\nDefaults to 1 for every tier when left empty.'
                              }
                            />
                          </span>
                          <div className="flex gap-1 rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-800/60">
                            <button
                              type="button"
                              onClick={() =>
                                setValue(`ability_grants.${index}.level_mode`, 'single', {
                                  shouldDirty: true,
                                })
                              }
                              className={modeToggleClass(levelMode === 'single')}
                            >
                              Same all tiers
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setValue(`ability_grants.${index}.level_mode`, 'per_tier', {
                                  shouldDirty: true,
                                })
                              }
                              className={modeToggleClass(levelMode === 'per_tier')}
                            >
                              Per tier
                            </button>
                          </div>
                        </div>
                        {levelMode === 'single' ? (
                          <input
                            type="number"
                            step="1"
                            placeholder="1"
                            className={inputClass}
                            {...register(`ability_grants.${index}.level_single`)}
                          />
                        ) : (
                          <TierInputs
                            register={register}
                            namePrefix={`ability_grants.${index}.level_tiers`}
                            step="1"
                            placeholders={['1', '1', '2', '3']}
                            errors={grantErrors?.level_tiers as TierFieldErrors}
                          />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </>
        )}

        {isOffering && (
          <>
            <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
              <SectionHeader title={<span className={TYPE_ACCENT.offering}>Offered Item</span>} />
              <div className="grid gap-4 p-5 sm:grid-cols-2">
                <FormField
                  label={
                    <span>
                      Item{' '}
                      <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[10px] font-semibold text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                        Required
                      </span>
                    </span>
                  }
                  htmlFor="item"
                  error={errors.item?.message}
                  hint={'The item players place in the offering slot.\n\nDefault offerings use:\n  minecraft:iron_ingot (plain)\n  minecraft:gold_ingot (favors Gold)\n  minecraft:diamond (favors Diamond)\n  minecraft:honeycomb, phantom_membrane,\n  rabbit_foot, blaze_powder, ender_pearl (sign boosts)\n\nCheck "Tag" to match an item tag instead, e.g. c:gems/diamond.'}
                >
                  {(errorId) => (
                    <input
                      id="item"
                      type="text"
                      placeholder="minecraft:gold_ingot"
                      aria-describedby={errorId}
                      aria-invalid={errors.item ? true : undefined}
                      className={inputClass}
                      {...register('item')}
                    />
                  )}
                </FormField>

                <div className="flex items-end gap-4 pb-1">
                  <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-200">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-600"
                      {...register('item_is_tag')}
                    />
                    Item id is a tag
                  </label>
                </div>

                <FormField
                  label="Count"
                  htmlFor="count"
                  error={errors.count?.message}
                  hint={'How many of the item one roll consumes.\nDefault: 1'}
                >
                  {(errorId) => (
                    <input
                      id="count"
                      type="number"
                      step="1"
                      placeholder="1"
                      aria-describedby={errorId}
                      aria-invalid={errors.count ? true : undefined}
                      className={inputClass}
                      {...register('count')}
                    />
                  )}
                </FormField>
              </div>
            </section>

            <section className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-700">
              <SectionHeader
                title={<span className={TYPE_ACCENT.offering}>Fate Manipulation</span>}
              />
              <div className="space-y-4 p-5">
                <div className="space-y-2">
                  <span className="flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    Tier Weight Multipliers
                    <Tooltip
                      content={
                        'Multiplies the odds of each tier.\nLeave empty for 1.0 (no change).\n\n2.0 doubles a tier\'s odds, 0 removes the tier from the roll entirely.\nDefault gold ingot uses 1 / 2 / 1 / 1.'
                      }
                    />
                  </span>
                  <TierInputs
                    register={register}
                    namePrefix="tier_multipliers"
                    placeholders={['1.0', '2.0', '1.0', '1.0']}
                    errors={errors.tier_multipliers as TierFieldErrors}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                      Sign Weight Multipliers
                      <Tooltip
                        content={
                          'Multiplies the odds of boons belonging to a sign.\nDefault sign offerings use 3.0.\n\nSigns not listed are unaffected (1.0).'
                        }
                      />
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      type="button"
                      onClick={() => typeMultipliers.append({ type: '', multiplier: '' })}
                    >
                      + Add sign
                    </Button>
                  </div>
                  {typeMultipliers.fields.length === 0 && (
                    <p className="rounded-lg border border-dashed border-zinc-300 py-3 text-center text-xs text-zinc-400 dark:border-zinc-600">
                      No sign multipliers.
                    </p>
                  )}
                  {typeMultipliers.fields.map((field, index) => {
                    const entryErrors = errors.type_multipliers?.[index]
                    const entryErrorMessage =
                      entryErrors?.type?.message ?? entryErrors?.multiplier?.message
                    return (
                      <div key={field.id} className="space-y-1">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            list="mortal-boons-signs"
                            placeholder="mortal_boons:hare"
                            aria-invalid={entryErrors?.type ? true : undefined}
                            className={inputClass}
                            {...register(`type_multipliers.${index}.type`)}
                          />
                          <input
                            type="number"
                            step="any"
                            placeholder="3.0"
                            aria-invalid={entryErrors?.multiplier ? true : undefined}
                            className={`${inputClass} max-w-24`}
                            {...register(`type_multipliers.${index}.multiplier`)}
                          />
                          <button
                            type="button"
                            onClick={() => typeMultipliers.remove(index)}
                            aria-label={`Remove sign multiplier ${index + 1}`}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:border-zinc-600 dark:hover:border-rose-700 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                          >
                            ×
                          </button>
                        </div>
                        {entryErrorMessage && <ErrorMessage message={entryErrorMessage} />}
                      </div>
                    )
                  })}
                  <datalist id="mortal-boons-signs">
                    {DEFAULT_SIGNS.map((sign) => (
                      <option key={sign} value={sign} />
                    ))}
                  </datalist>
                </div>

                <FormField
                  label="Minimum Tier"
                  htmlFor="min_tier"
                  error={undefined}
                  hint={'Sets a floor on the tier roll.\nA min tier of 3 promises Diamond or better.\n\nIf no boons remain at the promised tiers, the roll refuses and the offering is not consumed.'}
                >
                  {() => (
                    <select id="min_tier" className={selectClass} {...register('min_tier')}>
                      <option value="">None</option>
                      <option value="2">Gold or better</option>
                      <option value="3">Diamond or better</option>
                      <option value="4">Netherite only</option>
                    </select>
                  )}
                </FormField>
              </div>
            </section>
          </>
        )}
      </form>

      <div className="sticky top-4 flex max-h-[calc(100vh-2rem)] flex-col gap-4 overflow-y-auto lg:col-span-2">
        <div className="rounded-xl border border-zinc-700 bg-zinc-900">
          <div className="flex items-center justify-between border-b border-zinc-700/60 px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              JSON Preview
            </span>
            <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400">
              empty fields omitted
            </span>
          </div>

          <div className="min-h-48">
            <JsonPreview json={previewJson} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 border-t border-zinc-700/60 px-4 py-3">
            <Button type="button" onClick={onCopy} disabled={!hasOutput}>
              {copyState === 'copied'
                ? '✓ Copied!'
                : copyState === 'error'
                  ? '✗ Copy failed'
                  : 'Copy JSON'}
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => downloadJsonFile(cleanOutput, downloadFileName)}
              disabled={!hasOutput}
            >
              ↓ Download
            </Button>
            <Button variant="secondary" type="button" onClick={onReset} disabled={!hasOutput}>
              Clear
            </Button>
          </div>
        </div>

        <SavedItemsList
          items={savedItems}
          canSave={canSave}
          savePrompt={savePrompt}
          onSave={handleSave}
          onConfirmOverwrite={() => {
            saveItem(getValues())
            setSavePrompt(false)
          }}
          onCancelSavePrompt={() => setSavePrompt(false)}
          onDownloadDatapack={() => void downloadDatapack(savedItems)}
          onClearList={() => {
            savedItems.forEach((item) => removeItem(item.key))
          }}
          pendingLoad={pendingLoad}
          onItemClick={handleItemClick}
          onLoad={handleLoad}
          onCancelLoad={() => setPendingLoad(null)}
          onRemove={removeItem}
        />
      </div>
    </div>
  )
}
