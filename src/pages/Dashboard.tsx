import Nav from "../layout/Nav"
import Foot from "../layout/Foot"

import { useNavigate } from "react-router-dom"

import { GuildCard } from "../components/Card"

import { useGuilds } from "../hooks/useGuilds"

import { type Guild } from "../services/guildService"

export default function Dashboard() {
  const { guilds, isLoading } = useGuilds()
  const navigate = useNavigate()
  
  const {
    ok,
    registered_guilds,
    ready_to_install_guilds
  } = guilds

  const installed = registered_guilds?.length > 0
  ? <section>
      <h2>Manage</h2>
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {registered_guilds?.map((guild: Guild) => {
          return <GuildCard
            key={guild.id}
            guild={guild}
            onClick={() => navigate(`/dashboard/${guild.id}`)}
          />
        })}
      </div>
    </section>
  : null

  const notInstalled = ready_to_install_guilds?.length > 0
  ? <section>
      <h2>Install Lucy</h2>
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {ready_to_install_guilds?.map((guild: Guild) => {
          return <GuildCard
            key={guild.id}
            guild={guild}
            onClick={() => navigate(`/dashboard/${guild.id}`)}
          />
        })}
      </div>
    </section>
  : null

  const content = isLoading
    ? <p>Loading...</p>
    : !ok 
      ? <p>Error loading guilds.</p>
      : <>
        {installed}
        {notInstalled}
      </>

  return <>
    <Nav />
    <main className="container-xxl py-4">
      {content}
    </main>
    <Foot />
  </>
}
