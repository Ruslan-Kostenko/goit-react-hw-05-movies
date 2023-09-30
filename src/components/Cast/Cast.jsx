import { fetchCast } from "API";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Cast = () => {

const {id} = useParams();

const [actors, setActors] = useState(null);

useEffect(()=> {
    const getCast = async () =>{
        try{const data = await fetchCast(id);
            data.cast.length !== 0 && setActors(data.cast);
        } catch(error){
            console.log(error);
        }
    };
    getCast();
},[id]);

    return (
        <>
        {actors? (<ul>{actors.map(actor => (
            <li key={actor.id}>
                <img src={`http://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
                <p>{actor.name}</p>
                <p>{actor.character}</p>
            </li>
        ))}</ul>) : (<div>Sorry, don't worry!</div>)}
        </>
    )
}

export default Cast;