import * as z from "zod"
import { CompleteSongTags, RelatedSongTagsModel } from "./index"

export const TagModel = z.object({
  id: z.string(),
  name: z.string(),
})

export interface CompleteTag extends z.infer<typeof TagModel> {
  songs: CompleteSongTags[]
}

/**
 * RelatedTagModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTagModel: z.ZodSchema<CompleteTag> = z.lazy(() => TagModel.extend({
  songs: RelatedSongTagsModel.array(),
}))
