import { useState } from "react"

type ListProps = {
    data: string[]
}
export default function List(props: ListProps) {
    const [index, setIndex] = useState(-1)
    const {data} = props
    const handleClick = (i: number) => {
        setIndex(i)
    }
    return <ul className="list-group">
        {data.map((item, i) => {
            return <li 
                onClick={() => handleClick(i)}
                key={i}
                className={`list-group-item ${index == i ? "active" : ""}`}>
                    {item}
            </li>
        })}
    </ul>
}
