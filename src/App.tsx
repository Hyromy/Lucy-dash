import Card, {CardBody} from "./components/Card"
import List from "./components/List"

export default function App() {
  return <Card>
    <CardBody title="hola buenas" text="texto"/>
    <List data={["hola", "buenas", "tardes"]}/>
  </Card>
}
