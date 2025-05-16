import { NavLink, Outlet } from "react-router-dom";
import Messages from "./components/Messages";

export default function App() {

  return (
    <>
      <h1 className="text-xl text-slate-700 fron-bold text=center">React Heroes</h1>

      <nav className="bg-slate-200 p-1 mt-2">
        <ul className="flex justify-center gap-4 text-2xl font-semibold uppercase">

          <li>
            <NavLink to='/dashboard'>Dashboard</NavLink>
          </li>

          <li>
            <NavLink to='/heroes'>Heroes List</NavLink>
          </li>

        </ul>
      </nav>
      <div className='mt-5 container mx-auto flex justify-between gap-6'>
        <div className="flex-1">
          <Outlet />
        </div>

        <div className='flex-1'>
          <Messages />
        </div>
      </div>
    </>
  )
}

