import { HeaderContainer, TitleContainer, IconContainer } from './headerStyles'
import { HiMenu, HiChevronLeft } from 'react-icons/hi'

type HeaderProps = {
  isOpened: boolean
  toggleDrawer: () => void
}

const Header = ({ isOpened, toggleDrawer }: HeaderProps) => {
  return (
    <HeaderContainer>
      <IconContainer onClick={toggleDrawer}>
        {isOpened ? <HiChevronLeft /> : <HiMenu />}
      </IconContainer>
      <TitleContainer>Header</TitleContainer>
    </HeaderContainer>
  )
}

export default Header
