import { MortalBoonsBuilderForm } from '../features/mortalBoonsBuilder/MortalBoonsBuilderForm'

export const MortalBoonsBuilder = () => (
  <div className="space-y-3">
    <div className="flex items-center gap-3">
      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
        Mortal Boons Datapack Builder
      </p>
    </div>

    <MortalBoonsBuilderForm />
  </div>
)
