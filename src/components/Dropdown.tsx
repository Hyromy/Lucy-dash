import { type ReactNode, Children } from "react"

import Icon from "./Icon"

const VALID_ALIGNMENTS = [null, "start", "end"] as const
type AlignOptions = typeof VALID_ALIGNMENTS[number]
type DropdownProps = {
  children: ReactNode
  options: ReactNode[]
  align?: AlignOptions
  disabled?: boolean
}
export default function Dropdown({
  children,
  options,
  align = null,
  disabled = false
}: DropdownProps) {
  if (align && !VALID_ALIGNMENTS.includes(align)) {
    throw new Error(
      `Invalid align '${align}' for Dropdown component. Valid alignments are: ${VALID_ALIGNMENTS.filter(v => v != null).join(", ")}`
    )
  }

  const alignmentClass = align
    ? `dropdown-menu-${align}`
    : ""

  return <div className="dropdown" {...disabled ? { 'aria-disabled': 'true' } : {}}>
    <button className="btn dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      {children}
    </button>
    <ul className={`dropdown-menu ${alignmentClass}`}>
      {Children.map(options, (option, index) => {
        const isDropdownItem = option && typeof option == 'object' && 'type' in option && option.type == DropdownItem
        const isDropDownDivider = option && typeof option == 'object' && 'type' in option && option.type == DropdownDivider

        const content = isDropdownItem
          ? option
          : isDropDownDivider 
            ? <DropdownDivider />
            : <button className="dropdown-item" type="button">
                {option}
              </button>

        return <li key={index}>{content}</li>
      })}
    </ul>
  </div>
}

const VALID_VARIANTS = [null, "primary", "secondary", "danger", "warning", "info", "light", "dark", "link"] as const
type VariantOptions = typeof VALID_VARIANTS[number]
type DropdownItemProps = {
  text: string,
  icon?: string,
  variant?: VariantOptions,
  onclick?: () => void,
}
export function DropdownItem({
  text,
  icon,
  variant = null,
  onclick
}: DropdownItemProps) {
  if (variant && !VALID_VARIANTS.includes(variant)) {
    throw new Error(
      `Invalid variant '${variant}' for DropdownItem component. Valid variants are: ${VALID_VARIANTS.filter(v => v != null).join(", ")}`
    )
  }

  const textContainer = icon
    ? <span className="ps-2">{text}</span>
    : text

  const iconElement = icon
    ? <Icon iconName={icon} />
    : null

  const variantClass = variant
    ? `link-${variant}`
    : ""

  return <button className={`dropdown-item ${variantClass}`} type="button" onClick={onclick}>
    {iconElement}
    {textContainer}
  </button>
}

export function DropdownDivider() {
  return <li><hr className="dropdown-divider" /></li>
}
