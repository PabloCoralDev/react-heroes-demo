import { ChangeEvent, useState} from "react"
import { Hero } from './types/hero';
import { HEROES } from "./data/mock-heroes";

export default function App() {

  const [heroes, setHeroes] = useState<Hero[]>(HEROES);
  const [selectedHeroID, setSelectedHeroID] = useState<number | null>(null); // [stateVariable, setStateFunction]

  const selectedHero  = heroes.find(hero => hero.id === selectedHeroID)

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updateName = event.target.value;
    
    setHeroes(prevHeroes => prevHeroes.map(hero => {
        if (hero.id === selectedHeroID) {
        return {...hero, name: updateName}
      }
      return hero;
  })) 
  } //arrow function. Regular functions are good too

  const hadleSelectHero = (id: number) => {
    setSelectedHeroID(id);
  }

  return (

    <div className='container mt-5 mx-auto'>
      <h2 className="text-2xl">
        <ul className='flex flex-col gap-2 my-3'>
          {heroes.map(hero => (
            <li key={hero.id} className='flex cursor-pointer' onClick={() => hadleSelectHero(hero.id)}>
              <span className='bg-slate-700 text-white rounded-l p-2'>{hero.id}</span>
              <span className='p-2 bg-slate-300 rounded-r w-1/4'>{hero.name}</span>
            </li>
          ) )} 
        </ul>
      </h2>

        {selectedHero && 
        <>
                      <h2 className='text-2xl:'>Details</h2>
              <div>
                <span className='font-bold'>ID:</span> {selectedHero.id}
              </div>
              <div className='space-x-2'>
                <span className='font-bold'>Name:</span>
                <span className='uppercase'>{selectedHero.name}</span>
              </div>
              <div className="flex flex-col gap-2 mt-3 border-t">
                <label>Hero Name</label>
                <input
                  type="text"
                  placeholder='name'
                  className='border border-gray-300 rounded-lg p-2 w-1/4'
                  value={selectedHero.name}
                  onChange={handleNameChange}
                />
              </div>
        </>
      }

  </div>
  )
}

