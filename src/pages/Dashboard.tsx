import Nav from "../layout/Nav"
import Foot from "../layout/Foot"

import { GuildCard } from "../components/Card"

import { hasAdmin } from "../services/guildService"
import { useGuilds } from "../hooks/useGuilds"

export default function Dashboard() {
  const { guilds, isLoading } = useGuilds()
  
  const content = isLoading
    ? <p>Loading...</p>
    : <div className="d-flex flex-wrap gap-3 justify-content-center">
      {guilds.filter(hasAdmin).map(guild => <GuildCard key={guild.id} guild={guild} /> )}
    </div>

  const myGuild = [{
    "id": "822176592196534283",
    "name": "Otakus de closet",
    "icon": "e4d86cdbbd94f430a3d10e6c917486a5",
    "banner": null,
    "owner": true,
    "permissions": 2147483647,
    "permissions_new": "9007199254740991",
    "features": [
      "MEMBER_VERIFICATION_GATE_ENABLED",
      "GUILD_ONBOARDING_EVER_ENABLED",
      "NEWS",
      "PREVIEW_ENABLED",
      "CHANNEL_ICON_EMOJIS_GENERATED",
      "AUTO_MODERATION",
      "COMMUNITY",
      "GUILD_ONBOARDING_HAS_PROMPTS",
      "GUILD_ONBOARDING",
      "WELCOME_SCREEN_ENABLED"
    ]
  }]

  return <>
    <Nav />
    <main className="container-xxl py-4">
      {content}
    </main>
    <Foot />
  </>
}
