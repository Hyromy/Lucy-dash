import { useState } from "react"

type ListProps = {
    data: string[],
    onSelect?: (item: string) => void
}
export default function List(props: ListProps) {
    const [index, setIndex] = useState(-1)
    const {data, onSelect} = props
    const handleClick = (i: number, item: string) => {
        setIndex(i)
        onSelect?.(item)
    }
    return <ul className="list-group">
        {data.map((item, i) => {
            return <li 
                onClick={() => handleClick(i, item)}
                key={i}
                className={`list-group-item ${index == i ? "active" : ""}`}>
                    {item}
            </li>
        })}
    </ul>
}
