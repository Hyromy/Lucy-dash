import { type ReactNode, Children } from "react"

const VALID_VARIANTS = [null, "flush"] as const
type ListGroupVariant = typeof VALID_VARIANTS[number]
type ListGroupProps = {
  children: ReactNode
  variant?: ListGroupVariant
}
export function ListGroup({
  children,
  variant = null
}: ListGroupProps) {
  if (variant && !VALID_VARIANTS.includes(variant)) {
    throw new Error(
      `Invalid variant '${variant}' for ListGroup component. Valid variants are: ${VALID_VARIANTS.filter(v => v != null).join(", ")}`
    )
  }

  const variantClass = variant
    ? `list-group-${variant}`
    : ""

  return <ul className={`list-group ${variantClass}`}>
    {Children.map(children, (child, index) => (
      <li key={index} className="list-group-item">
        {child}
      </li>
    ))}
  </ul>
}
