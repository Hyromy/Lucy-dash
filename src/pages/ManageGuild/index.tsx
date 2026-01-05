import { type ReactNode } from "react"
import { useParams, useSearchParams } from "react-router-dom"

import Nav from "../../layout/Nav"
import Foot from "../../layout/Foot"

import { useGuildDetails } from "../../hooks/useGuilds"

import { ListGroup } from "../../components/List"
import Config from "./Config"

import style from "../../assets/css/ManageGuildView.module.css"

type ViewType = "overview" | "config"

function template(
  children : ReactNode,
  activeView: ViewType,
  setView: (view: ViewType) => void
) {
  return <>
    <Nav />
    <main className="container-xxl py-2 d-flex gap-3">
      <aside className={style.aside}>
        <ListGroup variant={"flush"}>
          <span 
            onClick={() => setView("overview")}
            style={{ 
              cursor: 'pointer',
              fontWeight: activeView == "overview" ? 'bold' : 'normal'
            }}
          >
            Overview
          </span>
          <span 
            onClick={() => setView("config")}
            style={{ 
              cursor: 'pointer',
              fontWeight: activeView == "config" ? 'bold' : 'normal'
            }}
          >
            Config
          </span>
        </ListGroup>
      </aside>
      <section className={style.section}>
        {children}
      </section>
    </main>
    <Foot />
  </>
}

export default function ManageGuild() {
  const { id_guild } = useParams<{ id_guild: string }>()
  const { guild: guildResponse, isLoading, error } = useGuildDetails(id_guild)
  const [searchParams, setSearchParams] = useSearchParams()

  const activeView = (searchParams.get('view') as ViewType) || 'overview'

  const setView = (view: ViewType) => {
    const params = new URLSearchParams(searchParams)

    if (view == "overview") {
      params.delete('view')
    } else {
      params.set('view', view)
    }
    setSearchParams(params)
  }

  const { ok, guild } = guildResponse

  if (!ok) return template(<p>Error loading guild details.</p>, activeView, setView)
  if (isLoading) return template(<p>Loading...</p>, activeView, setView)
  if (error) return template(<p>{error}</p>, activeView, setView)
  if (!guild) return template(<p>Guild not found</p>, activeView, setView)

  const renderContent = () => {
    switch (activeView) {
      case "overview":
        return thisView(guild)

      case "config":
        return <Config guild={guild} />

      default:
        setView("overview")
    }
  }

  return template(renderContent(), activeView, setView)
}

function thisView(guild: any) {
  console.log(guild)
  
  return Object.keys(guild).map((key) => (
    <div key={key} className="mb-2">
      <strong>{key}:</strong> {String((guild as any)[key])}
    </div>
  ))
}
