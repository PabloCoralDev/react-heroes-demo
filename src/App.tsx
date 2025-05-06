import { Outlet } from "react-router-dom";
import HeroesList from "./components/HeroesList";

export default function App() {

  return (
    <div className='mt-5 container mx-auto flex justify-between gap-6'>
      <div className="flex-1">
        <Outlet />
      </div>

      <div className='flex-1'>
        Messages will go here!
      </div>
    </div>
  )
}

