import * as z from "zod"
import { CompleteEvent, RelatedEventModel, CompleteInstrument, RelatedInstrumentModel } from "./index"

export const SongModel = z.object({
  id: z.string(),
  title: z.string(),
  active: z.number().int(),
  alias: z.string().nullish(),
  startKey: z.string().nullish(),
  tempoCd: z.number().int(),
  startWords: z.string().nullish(),
  arrangement: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  eventId: z.string().nullish(),
  instrumentId: z.string().nullish(),
})

export interface CompleteSong extends z.infer<typeof SongModel> {
  Event?: CompleteEvent | null
  Instrument?: CompleteInstrument | null
}

/**
 * RelatedSongModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSongModel: z.ZodSchema<CompleteSong> = z.lazy(() => SongModel.extend({
  Event: RelatedEventModel.nullish(),
  Instrument: RelatedInstrumentModel.nullish(),
}))
