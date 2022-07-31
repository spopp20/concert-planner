// src/pages/api/instruments.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../server/db/client'

const instruments = async (req: NextApiRequest, res: NextApiResponse) => {
  const instruments = await prisma.instrument.findMany()
  res.status(200).json(instruments)
}

export default instruments
