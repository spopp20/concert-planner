import * as z from "zod"
import { CompleteSong, RelatedSongModel } from "./index"

export const EventModel = z.object({
  id: z.string(),
  name: z.string(),
  active: z.number().int(),
  description: z.string().nullish(),
  venue: z.string().nullish(),
  location: z.string().nullish(),
  notes: z.string().nullish(),
  telephone: z.string().nullish(),
  startDateTime: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteEvent extends z.infer<typeof EventModel> {
  songs: CompleteSong[]
}

/**
 * RelatedEventModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedEventModel: z.ZodSchema<CompleteEvent> = z.lazy(() => EventModel.extend({
  songs: RelatedSongModel.array(),
}))
