type ListProps = {
    data: string[]
}
export default function List(props: ListProps) {
    const {data} = props
    return <ul className="list-group">
        {data.map((item, i) => {
            return <li key={i} className="list-group-item">{item}</li>
        })}
    </ul>
}
