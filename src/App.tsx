import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Artifactory } from './pages/Artifactory'
import { JsonBuilder } from './pages/JsonBuilder'
import { Homebound } from './pages/Homebound'
import { Alchemical } from './pages/Alchemical'
import { AlchemicalBuilder } from './pages/AlchemicalBuilder'
import { Kindred } from './pages/Kindred'
import { PlayerAbilities } from './pages/PlayerAbilities'
import { MortalBoons } from './pages/MortalBoons'
import { MortalBoonsBuilder } from './pages/MortalBoonsBuilder'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="artifactory" element={<Artifactory />} />
          <Route path="artifactory/config-generator" element={<JsonBuilder />} />
          <Route path="homebound" element={<Homebound />} />
          <Route path="alchemical" element={<Alchemical />} />
          <Route path="alchemical/ingredient-builder" element={<AlchemicalBuilder />} />
          <Route path="kindred" element={<Kindred />} />
          <Route path="player-abilities" element={<PlayerAbilities />} />
          <Route path="mortal-boons" element={<MortalBoons />} />
          <Route path="mortal-boons/datapack-builder" element={<MortalBoonsBuilder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
