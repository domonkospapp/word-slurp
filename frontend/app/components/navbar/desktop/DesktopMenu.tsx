import { signIn, signOut } from 'next-auth/react'
import { menu } from '../Navbar'
import DesktopMenuItem from './DesktopMenuItem'

const DesktopMenu = ({ loggedIn }: { loggedIn: boolean }) => (
  <div className="hidden grid-cols-4 sm:grid">
    {menu.map((item, index) => (
      <DesktopMenuItem key={index} item={item} />
    ))}
    <LoginLogoutButton loggedIn={loggedIn} />
  </div>
)

const LoginLogoutButton = ({ loggedIn }: { loggedIn: boolean }) => {
  return (
    <button
      className="sm-text-2xl hover:text-stone-00 text-normal col-span-1 flex items-center justify-center border-b-4 border-l-4 border-stone-900 bg-stone-900 p-3.5 text-center font-bold text-stone-200 transition-all duration-150 sm:border-4 sm:bg-stone-200 sm:text-2xl sm:text-stone-900 hover:sm:bg-stone-200 hover:sm:text-stone-900"
      onClick={() => (loggedIn ? signOut() : signIn('google'))}
    >
      {loggedIn ? 'LOGOUT' : 'LOGIN'}
    </button>
  )
}
export default DesktopMenu
