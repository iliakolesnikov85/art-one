import { HelpIcon, LogoMark, PersonIcon, SparkIcon } from '../icons/Icon.tsx'

export function TopBar() {
  return (
    <header className="topbar">
      <div className="brand">
        <LogoMark />
        <span className="wordmark">artven</span>
      </div>
      <div className="account">
        <button className="icon-button" type="button" aria-label="Help">
          <HelpIcon />
        </button>
        <span className="account-divider" />
        <div className="token-chip">
          <span className="token-balance">
            <SparkIcon className="token-spark" />
            <span>15</span>
          </span>
          <button className="upgrade-button" type="button">
            Upgrade
          </button>
        </div>
        <button className="avatar" type="button" aria-label="Profile">
          <PersonIcon />
        </button>
      </div>
    </header>
  )
}
