import { useState } from 'react'
import Login from './pages/Login'
import Bienvenida from './pages/Bienvenida'

function App() {
  const [logueado, setLogueado] = useState(false)

  return (
    <div>
      {logueado ? (
        <Bienvenida />
      ) : (
        <Login onLogin={() => setLogueado(true)} />
      )}
    </div>
  )
}

export default App