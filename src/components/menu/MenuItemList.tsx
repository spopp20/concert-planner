import { MenuItem as MenuItemType } from '../../constants/menu-items'
import MenuItem from './MenuItem'

type MenuItemListProps = {
  options: MenuItemType[]
}

export default function MenuItemList({ options }: MenuItemListProps) {
  return (
    <>
      {options.map((option) => (
        <MenuItem menuItem={option} key={option.id} />
      ))}
    </>
  )
}
