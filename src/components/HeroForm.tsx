import { FormEvent, use } from "react";
import { Hero } from "../types/hero";
import { useMessages } from "../context/MessageContext";
import { useNavigate } from "react-router";

type Props = {
    hero?: Hero;
    setHero?: (hero: Hero) => void
}

const apiUrl = import.meta.env.VITE_API_URL;

export default function HeroForm({hero, setHero}: Props) {

    const {addMessage} = useMessages();
    const navigate = useNavigate(); //another react hook!
    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    
        const formData = new FormData(event.currentTarget);
        const url = hero ? `${apiUrl}/heroes/${hero.id}`; : `${apiUrl}/heroes`
        const method = hero ? 'PUT' : 'POST'; //do we have this ? to-do-if-yes : to-do-if-no

        //console.log(formData.get('name'));
        //try except because we're using async block. Send to server!
    
        try {
          const response = await fetch(url, {
            method: method, //dyanmic method depending on if we have hero id or not
            body: JSON.stringify({name: formData.get('name')})
          });
    
          if (!response.ok) throw new Error('Request Failed: ' + response.statusText)
          
            const data = await response.json();
            const message = hero 
            ? `Hero ${hero.name} updated to ${data.name}` 
            : `Hero ${data.name} created!`

            addMessage(message)
            hero && setHero ? setHero(data) : navigate(`/heroes/${data.id}`); //either set the hero, or route to locn of new hero!
    
        } catch (error) {
          console.log(error);
          addMessage('unable to update hero')
        }
    
      }

  return (
    <form onSubmit={onSubmit}>
    <label>Hero Name</label>
      <div className="flex gap-3">
        <input
          type="text"
          name='name'
          placeholder='name'
          className='border border-gray-300 rounded-lg p-2 w-1/4'
          defaultValue={hero?.name || ''} 
        />
        <button type="submit" className="myBtn">
          Submit
        </button>
      </div>
    </form>
  )
}