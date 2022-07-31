import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

type ExpandIconPros = {
  isExpanded: boolean
  handleClick: () => void
}

export default function ExpandIcon({
  isExpanded,
  handleClick,
}: ExpandIconPros): JSX.Element {
  return isExpanded ? (
    <HiChevronUp onClick={handleClick} />
  ) : (
    <HiChevronDown onClick={handleClick} />
  )
}
