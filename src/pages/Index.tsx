import Nav from "../layout/Nav"
import Foot from "../layout/Foot"

export default function Index() {
  return <>
    <Nav />
    <div style={{
      maxWidth: '1200px',
      margin: '2rem auto',
      padding: '0 1rem'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        padding: '3rem 2rem',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        marginBottom: '2rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          color: 'white'
        }}>
          🚧 Site Under Development 🚧
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.9)',
          marginBottom: '0.5rem'
        }}>
          The site can be unstable and some features may not work as expected.
        </p>
        <p style={{
          fontSize: '1rem',
          color: 'rgba(255,255,255,0.7)'
        }}>
          We appreciate your patience as we continue to improve the experience.
        </p>
      </div>
    </div>
    <Foot />
  </>
}
