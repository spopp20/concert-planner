import {
  HiHome,
  HiSearch,
  HiMusicNote,
  HiCog,
  HiCalendar,
} from 'react-icons/hi'

const MENU_OPTIONS: MenuOption[] = [
  {
    name: 'Music Home',
    icon: HiHome,
    url: '/',
  },
  {
    name: 'Settings',
    icon: HiCog,
    url: '/instruments',
  },
  {
    name: 'Songs',
    icon: HiSearch,
    url: '/songs',
  },
  {
    name: 'Events',
    icon: HiCalendar,
    url: '/events',
  },
]

export type MenuItem = {
  name: string
  icon: React.ComponentType
  url: string
  id: string
  depth: number
  subItems?: MenuItem[]
}

type MenuOption = {
  name: string
  icon: React.ComponentType
  url: string
  subItems?: MenuOption[]
}

/**
 * Recursively call to make application menu items
 * @param options MenuOption list
 * @param depth Current depth of the menu items
 * @returns MenuItem list
 */
function makeMenuLevel(options: MenuOption[], depth = 0): MenuItem[] {
  return options.map((option, idx) => ({
    ...option,
    id: depth === 0 ? idx.toString() : `${depth}.${idx}`,
    depth,
    subItems:
      option.subItems && option.subItems.length > 0
        ? makeMenuLevel(option.subItems, depth + 1)
        : undefined,
  }))
}

export const MENU_ITEMS: MenuItem[] = makeMenuLevel(MENU_OPTIONS)
