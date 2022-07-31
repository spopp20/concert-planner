import * as z from "zod"
import { CompleteSong, RelatedSongModel, CompleteTag, RelatedTagModel } from "./index"

export const SongTagsModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  songId: z.string().nullish(),
  tagId: z.string().nullish(),
})

export interface CompleteSongTags extends z.infer<typeof SongTagsModel> {
  Song?: CompleteSong | null
  Tag?: CompleteTag | null
}

/**
 * RelatedSongTagsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSongTagsModel: z.ZodSchema<CompleteSongTags> = z.lazy(() => SongTagsModel.extend({
  Song: RelatedSongModel.nullish(),
  Tag: RelatedTagModel.nullish(),
}))
