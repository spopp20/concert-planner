import { SidebarContainer } from "./sidebarStyles";
import { MENU_ITEMS } from "../../constants/menu-items";
import MenuItemList from "../menu/MenuItemList";

type SidebarProps = {
  isOpened: boolean;
};

export default function Sidebar({ isOpened }: SidebarProps) {
  return (
  <SidebarContainer isOpened={isOpened}>
    <MenuItemList options={MENU_ITEMS} />
    </SidebarContainer>
  );
}
