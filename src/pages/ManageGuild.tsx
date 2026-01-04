import { type ReactNode } from "react"

import Nav from "../layout/Nav"
import Foot from "../layout/Foot"

import { useParams } from "react-router-dom"

import { useGuildDetails } from "../hooks/useGuilds"

function template(children : ReactNode) {
  return <>
    <Nav />
    <main className="container-xxl py-4">
      {children}
    </main>
    <Foot />
  </>
}

export default function ManageGuild() {
  const { id_guild } = useParams<{ id_guild: string }>()
  const { guild, isLoading, error } = useGuildDetails(id_guild)

  const {  } = guild

  if (isLoading) return template(<p>Loading...</p>)
  if (error) return template(<p>{error}</p>)
  if (!guild) return template(<p>Guild not found</p>)

  return template(
    Object.keys(guild.guild).map(key => (
      <p key={key}>
        <strong>{key}:</strong> {JSON.stringify((guild.guild as any)[key])}
      </p>
    ))
  )
}
