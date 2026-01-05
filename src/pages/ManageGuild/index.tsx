import { type ReactNode } from "react"
import { useParams, useSearchParams } from "react-router-dom"

import Nav from "../../layout/Nav"
import Foot from "../../layout/Foot"

import { useGuildDetails } from "../../hooks/useGuilds"

import { ListGroup, ListGroupItem } from "../../components/List"
import Icon from "../../components/Icon"

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
        <ListGroup variant="flush">
          <ListGroupItem onclick={() => setView("overview")} active={activeView == "overview"}>
            <Icon iconName="info-circle-fill" />
            <span className="ps-2">Overview</span>
          </ListGroupItem>
          <ListGroupItem onclick={() => setView("config")} active={activeView == "config"}>
            <Icon iconName="gear-fill" />
            <span className="ps-2">Config</span>
          </ListGroupItem>
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

  if (isLoading) return template(<p>Loading...</p>, activeView, setView)
  if (error) return template(<p>{error}</p>, activeView, setView)
  if (!ok) return template(<p>Error loading guild details.</p>, activeView, setView)
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
  return <div className="container-fluid">
    <div className="card mb-4">
      <div 
        className="card-header d-flex align-items-center gap-3"
        style={{ minHeight: '120px' }}
      >
        {guild.icon && (
          <img 
            src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
            alt={guild.name}
            className="rounded-circle"
            style={{ width: '80px', height: '80px' }}
          />
        )}
        <div>
          <h2 className="mb-1">{guild.name}</h2>
          <p className="mb-0 opacity-75">{guild.description || 'Sin descripción'}</p>
        </div>
      </div>
    </div>
    <div className="row g-3 mb-4">
      <div className="col-md-3">
        <div className="card text-center">
          <div className="card-body">
            <i className="bi bi-people-fill fs-1 text-primary"></i>
            <h3 className="mt-2 mb-0">{guild.approximate_member_count || 0}</h3>
            <small className="text-muted">Miembros</small>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card text-center">
          <div className="card-body">
            <i className="bi bi-circle-fill fs-1 text-success"></i>
            <h3 className="mt-2 mb-0">{guild.approximate_presence_count || 0}</h3>
            <small className="text-muted">En Línea</small>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card text-center">
          <div className="card-body">
            <i className="bi bi-shield-fill fs-1 text-warning"></i>
            <h3 className="mt-2 mb-0">{guild.roles?.length || 0}</h3>
            <small className="text-muted">Roles</small>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card text-center">
          <div className="card-body">
            <i className="bi bi-emoji-smile-fill fs-1 text-info"></i>
            <h3 className="mt-2 mb-0">{guild.emojis?.length || 0}</h3>
            <small className="text-muted">Emojis</small>
          </div>
        </div>
      </div>
    </div>
    <div className="row g-3">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Información General</h5>
          </div>
          <div className="card-body">
            <dl className="row mb-0">
              <dt className="col-sm-4">ID del Servidor:</dt>
              <dd className="col-sm-8"><code>{guild.id}</code></dd>
              <dt className="col-sm-4">Propietario:</dt>
              <dd className="col-sm-8">{guild.owner_id}</dd>
              <dt className="col-sm-4">Región:</dt>
              <dd className="col-sm-8">{guild.region || 'Automática'}</dd>
              <dt className="col-sm-4">Nivel Boost:</dt>
              <dd className="col-sm-8">
                <span className="badge bg-primary">
                  Nivel {guild.premium_tier || 0}
                </span>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Características</h5>
          </div>
          <div className="card-body">
            <div className="d-flex flex-wrap gap-2">
              {guild.features?.map((feature: string) => (
                <span key={feature} className="badge bg-secondary">
                  {feature.replace(/_/g, ' ')}
                </span>
              )) || <span className="text-muted">Sin características especiales</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}
