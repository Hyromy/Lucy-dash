import Footer from "../components/Footer"
import Icon from "../components/Icon"

export default function Foot() {
  return <Footer>
    <Icon
      iconName="discord"
      size={1}
      title="Discord"
      onClick={() => window.open("https://discord.com/users/608870766586494976", "_blank")}
    />
    <Icon 
      iconName="github"
      size={1}
      title="GitHub"
      onClick={() => window.open("https://github.com/Hyromy", "_blank")}
    />
  </Footer>
}
