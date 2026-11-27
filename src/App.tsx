import { HomePage } from './components/home/HomePage.tsx'
import { Sidebar } from './components/shell/Sidebar.tsx'
import { TopBar } from './components/shell/TopBar.tsx'
import './styles/home.css'

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="workspace">
        <TopBar />
        <main>
          <HomePage />
        </main>
      </div>
    </div>
  )
}

export default App
