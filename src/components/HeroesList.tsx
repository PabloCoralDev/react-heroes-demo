import { useState, useRef, useEffect} from "react";
import { Hero } from "../types/hero";
import { Link } from "react-router";
import { useMessages } from "../context/MessageContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function HeroesList() {
    
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const fetched = useRef(false);
    const {addMessage} = useMessages();

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
      fetch(`${apiUrl}/heroes`).then(res => {
        return res.json();
      }).then(data => {
        setHeroes(data);
        addMessage('Heroes Loaded')
      })

      fetched.current = true;
  
    }, [addMessage])


    // {} in JSX is to embed JavaScript variables, function calls and expressions into html!

    return (

      <>
        <h2 className="text-2xl">My Heroes</h2>
          <ul className='flex flex-col gap-2 my-3'>
            {heroes.map(hero => (
              <Link to={`/heroes/${hero.id}`} key={hero.id} className='flex cursor-pointer'>
                <span className='bg-slate-700 text-white rounded-l p-2'>{hero.id}</span>
                <span className='p-2 bg-slate-300 rounded-r w-full'>{hero.name}</span>
              </Link>
            ) )} 
          </ul>
      </> 
    ) 
}