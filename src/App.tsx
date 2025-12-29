import { useState } from "react"

import Card, {CardBody} from "./components/Card"
import List from "./components/List"
import Button from "./components/Button"

export default function App() {
  const handleSelect = (item: string) => {
    console.log("selected", item)
  }
  const handleClick = () => {
    console.log("button clicked")
    setIsLoading(true)
  }
  const addMinion = () => {
    setData([...data, "Minion"])
  }
  const delMinion = () => {
    setData(data.slice(0, -1))
  }

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(["hola", "buenas", "tardes"])

  const content = data.length
  ? <List data={data} onSelect={handleSelect}/>
  : "No hay datos"

  return <Card>
    <CardBody title="hola buenas" text="texto"/>
    <Button callback={addMinion}>Agregar</Button>
    <Button callback={delMinion}>Eliminar</Button>
    {content}
    <Button callback={handleClick} isLoading={isLoading}>
      Botón de carga
    </Button>
  </Card>
}
