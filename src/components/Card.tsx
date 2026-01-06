import { type Guild } from "../services/guildService"

import style from "../assets/css/Card.module.css"

type GuildCardProps = {
  guild: Guild
  onClick?: () => void
}
export function GuildCard({guild, onClick}: GuildCardProps) {
  const {
    id,
    name,
    icon
  } = guild

  const iconUrl = icon 
    ? `https://cdn.discordapp.com/icons/${id}/${icon}.png?size=256`
    : null

  const bgImg = {
    backgroundImage: iconUrl
      ? `url(${iconUrl})`
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }

  return (
    <div className={style["guild-card"]} onClick={onClick}>
      <div className={style["guild-banner"]}>
        <div className={style["guild-banner-bg"]} style={bgImg} />
        <h3 className={style["guild-name"]}>{name}</h3>
      </div>
    </div>
  )
}
