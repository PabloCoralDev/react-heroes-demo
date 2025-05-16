//convention for naming components is PascalCase and NOT camelCase.
import { useState, useRef, useEffect, FormEvent } from "react";
import { Hero } from "../types/hero"
import { useParams } from "react-router";
import { useMessages } from "../context/MessageContext";

/*
type Props = {
  hero?: Hero; //the question mark basically says 'hero is optional'
  onChangeName?: (event: ChangeEvent<HTMLInputElement>) => void;
}
  */
const apiUrl = import.meta.env.VITE_API_URL;

export default function HeroDetail() {

  //conditional since hero is optional
  const [hero, setHero] = useState<Hero | null>(null);
  const params = useParams();
  const fetched = useRef(false);
  const {addMessage} = useMessages();

  //addMessage('Hero Exported')
  
  useEffect(() => {
    if (!fetched.current)
      fetch(`${apiUrl}/heroes/${params.id}`).then(res => {
        return res.json();
      }).then(data => {
        setHero(data);
        addMessage(`Hero  '${data.name}' loaded`)
      })
      
      fetched.current = true;
  }, [addMessage, params.id]) //if dependency changes (params.id), then useEffect re-runs
  
  if (!hero) return null;

  /*
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {

    setHero({...hero, name: event.target.value})

  }
    */

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget);
    const url = `${apiUrl}/heroes/${hero.id}`;

    //console.log(formData.get('name'));
    //try except because we're using async block. Send to server!

    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({name: formData.get('name')})
      });

      if (!response.ok) throw new Error('Request Failed: ' + response.statusText)
      
        const data = await response.json();
        addMessage(`Hero ${hero.name} updated to ${data.name}`)
        setHero(data);

    } catch (error) {
      console.log(error);
      addMessage('unable to update hero')
    }

  }

  //async functions because we're updating API
  // form elements (or components) are HTml elements that deal with user data that will affect server-side ops (in or out)
  return (
  <>
    <h2 className='text-2xl:'>Details</h2>
        <div>
          <span className='font-bold'>ID:</span> {hero.id}
        </div>
        <div className='space-x-2'>
          <span className='font-bold'>Name:</span>
          <span className='uppercase'>{hero.name}</span>
        </div>
        <div className="flex flex-col gap-2 mt-3">
          <form onSubmit={onSubmit}>
          <label>Hero Name</label>
            <div className="flex gap-3">
              <input
                type="text"
                name='name'
                placeholder='name'
                className='border border-gray-300 rounded-lg p-2 w-1/4'
                defaultValue={hero.name}
              />
              <button type="submit" className="myBtn">
                Submit
              </button>
            </div>
          </form>
        </div>
        
  </>
  )
} 

