import * as z from "zod"
import { CompleteSong, RelatedSongModel } from "./index"

export const InstrumentModel = z.object({
  id: z.string(),
  name: z.string(),
  active: z.number().int(),
  description: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteInstrument extends z.infer<typeof InstrumentModel> {
  songs: CompleteSong[]
}

/**
 * RelatedInstrumentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedInstrumentModel: z.ZodSchema<CompleteInstrument> = z.lazy(() => InstrumentModel.extend({
  songs: RelatedSongModel.array(),
}))
