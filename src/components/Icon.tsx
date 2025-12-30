type IconProps = {
  iconName: string,
  size?: number,
  title?: string,
  onClick?: () => void,
}
export default function Icon({
  iconName,
  size = 6,
  title = "",
  onClick,
}: IconProps) {
  return <i
    className={`bi bi-${iconName} fs-${size}`}
    title={title}
    onClick={onClick}
  />
}
