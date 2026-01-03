import { type Guild } from "../services/guildService"

import style from "../assets/css/Card.module.css"

export default function Card() {
  return <div>Card Component</div>
}

type GuildCardProps = {
  guild: Guild
}

export function GuildCard({guild}: GuildCardProps) {
  const {
    id,
    name,
    icon,
    banner,
    owner,
    permissions,
    permissions_new,
    features,
  } = guild

  const iconUrl = icon 
    ? `https://cdn.discordapp.com/icons/${id}/${icon}.png?size=128`
    : null

  const _style = {
    backgroundImage: iconUrl ? `url(${iconUrl})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div className={style["guild-card"]}>
      <div className={style["guild-banner"]}>
        <div className={style["guild-banner-bg"]} style={_style} />
        <h3 className={style["guild-name"]}>{name}</h3>
      </div>
    </div>
  )
}
