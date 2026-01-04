type ConfigProps = {
  guild: any
}

export default function Config({ guild }: ConfigProps) {
  return <div>
    <h2>Configuration - {guild.name}</h2>
    <p>Settings and configuration options for this guild...</p>
  </div>
}
