import { useState } from "react"

import Dropdown from "../../components/Dropdown"

import { Api } from "../../services/apiClient"

type ConfigProps = {
  guild: any
}
export default function Config({ guild }: ConfigProps) {
  const [currentGuild, setCurrentGuild] = useState(guild)
  const [isLoading, setIsLoading] = useState(false)
    
  const handleLanguageChange = (language: string) => {
    setIsLoading(true)
    Api.patch(`api/bot/guild/${currentGuild.id}`, { lang: language })
      .then(data => {
        if (data.ok) {
          setCurrentGuild({ ...currentGuild, lang: language })
        }
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false))    
  }
  
  return <>
    <h2>Configuration - {currentGuild.name}</h2>
    <Dropdown 
      disabled={isLoading}
      options={[
        <span onClick={() => handleLanguageChange("en")}>English</span>,
        <span onClick={() => handleLanguageChange("es")}>Español</span>,
    ]}>
      <span>Bot language ({currentGuild.lang.toUpperCase()})</span>
    </Dropdown>
  </>
}
