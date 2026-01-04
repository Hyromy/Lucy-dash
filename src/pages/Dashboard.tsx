import Nav from "../layout/Nav"
import Foot from "../layout/Foot"

import { useNavigate } from "react-router-dom"

import { GuildCard } from "../components/Card"

import { hasAdmin } from "../services/guildService"
import { useGuilds } from "../hooks/useGuilds"

export default function Dashboard() {
  const { guilds, isLoading } = useGuilds()
  const navigate = useNavigate()
  
  const content = isLoading
    ? <p>Loading...</p>
    : <div className="d-flex flex-wrap gap-3 justify-content-center">
      {guilds.map(guild => {
        return <GuildCard
          key={guild.id}
          guild={guild}
          onClick={() => navigate(`/dashboard/${guild.id}`)}
        />
      })}
    </div>

  return <>
    <Nav />
    <main className="container-xxl py-4">
      {content}
    </main>
    <Foot />
  </>
}
