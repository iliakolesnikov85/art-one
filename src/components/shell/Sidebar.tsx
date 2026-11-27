import { ChatIcon, HomeIcon, ResultsIcon, SearchIcon, SettingsIcon } from '../icons/Icon.tsx'

const navItems = [
  { id: 'home', label: 'Home', icon: HomeIcon, current: true },
  { id: 'chat', label: 'Chat', icon: ChatIcon, current: false },
  { id: 'results', label: 'Results', icon: ResultsIcon, current: false, unread: true },
  { id: 'settings', label: 'Settings', icon: SettingsIcon, current: false },
] as const

export function Sidebar() {
  return (
    <aside className="sidebar">
      <button className="sidebar-search" type="button" aria-label="Search">
        <SearchIcon />
      </button>
      <div className="sidebar-divider" />
      <nav className="sidebar-nav" aria-label="Primary">
        {navItems
          .filter((item) => item.id !== 'settings')
          .map((item) => (
            <button
              key={item.id}
              className={item.current ? 'nav-item is-current' : 'nav-item'}
              type="button"
              aria-current={item.current ? 'page' : undefined}
            >
              <span className="nav-icon">
                <item.icon />
                {'unread' in item && item.unread ? <span className="unread-dot" /> : null}
              </span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="sidebar-divider" />
        <button className="nav-item" type="button">
          <span className="nav-icon">
            <SettingsIcon />
          </span>
          <span className="nav-label">Settings</span>
        </button>
      </div>
    </aside>
  )
}
