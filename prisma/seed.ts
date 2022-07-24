import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
    {
        name: 'Alice',
        email: 'alice@concert.io',
    },
    {
        name: 'Art',
        email: 'art@concert.io',
    },
    {
        name: 'John',
        email: 'john@concert.io',
    },
]

const eventData: Prisma.EventCreateInput[] = [
    {
        name: 'Morning Event',
        description: 'This is a sample event.',
        active: 1,
    },
    {
        name: 'Evening Event',
        description: 'This is a very long event.',
        active: 1,
    }
]

const instrumentData: Prisma.InstrumentCreateInput[] = [
    {
        name: 'Piano',
        description: 'Concert Piano',
        active: 1,
    },
    {
        name: 'Guitar',
        description: 'Electric Guitar',
        active: 1,
    },
]

const songData: Prisma.SongCreateInput[] = [
    {
        title: 'Faithful One',
        startKey: 'A',
        startWords: 'Faithful One so unchanging',
        arrangement: 'Piano Introduction',
        tempoCd: 1,
        active: 1,
    },
    {
        title: 'Great is your Faithfulness to me',
        startKey: 'B',
        startWords: 'Faithful One so unchanging',
        arrangement: 'Men Start',
        tempoCd: 1,
        active: 1,
    },
]

async function main() {
    console.log(`Start seeding ...`)
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        })
        console.log(`Created user with id: ${user.id}`)
    }

    for (const e of eventData) {
        const event = await prisma.event.create({
            data: e,
        })
        console.log(`Created event with id: ${event.id}`)
    }

    for (const i of songData) {
        const song = await prisma.song.create({
            data: i,
        })
        console.log(`Created song with id: ${song.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
