import Nav from "../layout/Nav"
import Foot from "../layout/Foot"

import { hasAdmin } from "../services/guildService"
import { useGuilds } from "../hooks/useGuilds"

export default function Dashboard() {
  const { guilds } = useGuilds()

  return <>
    <Nav />
    <h1>Dashboard</h1>
    <ul>
      {guilds.filter(guild => hasAdmin(guild)).map(guild => (
        <li key={guild.id}>{guild.name}</li>
      ))}
    </ul>
    <Foot />
  </>
}
