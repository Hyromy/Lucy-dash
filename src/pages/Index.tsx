import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Icon from "../components/Icon"
import { LoginButton, ThemeButton } from "../components/Button"

export default function Index() {
  return <>
    <Navbar>
      <LoginButton size={1} />
      <ThemeButton size={2} />
    </Navbar>
    <p>
      This is the content area.
    </p>
    <Footer>
      <Icon iconName="discord" size={1} title="Discord" />
      <Icon iconName="github" size={1} title="GitHub" />
    </Footer>
  </>
}
