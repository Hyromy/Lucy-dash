import { type ReactNode } from "react"

import Nav from "../layout/Nav"
import Foot from "../layout/Foot"

import { useParams } from "react-router-dom"

import { useGuilds } from "../hooks/useGuilds"

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
  const { guilds, isLoading, error } = useGuilds()

  const guild = guilds.find(g => g.id == id_guild)

  if (isLoading) return template(<p>Loading...</p>)
  if (error) return template(<p>{error}</p>)
  if (!guild) return template(<p>Guild not found</p>)

  console.log(guild)

  return template(
    <div>
      hola
    </div>
  )
}
