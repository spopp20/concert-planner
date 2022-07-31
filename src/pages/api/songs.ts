// src/pages/api/songs.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../server/db/client'

const songs = async (req: NextApiRequest, res: NextApiResponse) => {
  const songs = await prisma.song.findMany()
  res.status(200).json(songs)
}

export default songs
