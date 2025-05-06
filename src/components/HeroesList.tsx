import { useState, useRef, useEffect, ChangeEvent } from "react";
import { HEROES } from "../data/mock-heroes";
import { Hero } from "../types/hero";
import HeroDetail from "./HeroDetail";

export default function HeroesList() {
    
    const [heroes, setHeroes] = useState<Hero[]>(HEROES);
    const [selectedHeroID, setSelectedHeroID] = useState<number | null>(null); 
    const fetched = useRef(false);

    // [stateVariable, setStateFunction] --> return types froom useState<specified data type>(initialState)
    /*  
    fetch returns a 'promise' (code is Async)
    when we have a promise, we can promise.then to decide what to do when the promise returns
    Promise.prototype.then(onFulfilled, onRejected);
    onFulfilled is a function that takes as input the value with which the promise is satisfied.
    we use a line function to represent: (args) => {function_body}
    
    i.e. fetch(url).then((value) => {value + 1});
    */

    useEffect(() => {

      if (!fetched.current)
      fetch('http://localhost:3000/heroes').then(res => {
        return res.json();
      }).then(data => {
        setHeroes(data);
      })

      fetched.current = true;
  
    }, [])

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

    // {} in JSX is to embed JavaScript variables, function calls and expressions into html!

    const hadleSelectHero = (id: number) => {
      setSelectedHeroID(id);
    }

    return (

      <div className='container mt-5 mx-auto'>
        <h2 className="text-2xl">My Heroes</h2>
          <ul className='flex flex-col gap-2 my-3'>
            {heroes.map(hero => (
              <li key={hero.id} className='flex cursor-pointer' onClick={() => hadleSelectHero(hero.id)}>
                <span className='bg-slate-700 text-white rounded-l p-2'>{hero.id}</span>
                <span className='p-2 bg-slate-300 rounded-r w-1/4'>{hero.name}</span>
              </li>
            ) )} 
          </ul>
        <HeroDetail hero={selectedHero} onChangeName={handleNameChange}/> 
      </div>  
    ) 
}