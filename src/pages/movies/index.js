import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './movies.css'
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';


import api from "../../services/api";


function Movies() {
  const {id} = useParams();
  const navigation = useNavigate();

  const [filme, setFilme] = useState({});
  const [loanding, setLoading] = useState(true);

  useEffect(()=>{
    async function loadFilme(){
      await api.get(`/movie/${id}`, {
        params:{
          api_key: "5c0bf3b32e536c8a27dbd59ae82e4da2",
          language: "pt-BR"
        }
      })
      .then((response)=>{
        setFilme(response.data);
        //console.log(response);
        setLoading(false);
      })
      .catch(()=>{
        navigation("/", {replace: true})
        //console.log("Filme nao encontrado");
        return;
      })
    }
    loadFilme();

    return () => {
      console.log("componeante foi desmontado");
    }
  }, [navigation, id])

 function salvarFilme(){
  const minhaLista = localStorage.getItem("@marteflix");

  let filmesSalvos = JSON.parse(minhaLista) || [];

  const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

  if(hasFilme){
    toast.warn("Filme já está na sua lista");
    return;
   }
   filmesSalvos.push(filme);
   localStorage.setItem("@marteflix", JSON.stringify(filmesSalvos))
   toast.success("Filme salvo com sucesso");
 
 }

  if(loanding){
   return(
     <div className="loading">
        <span className="loader"></span>
      </div>    
    )
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} / 10 </strong>
      <span>Lançado em: {filme.release_date}</span>
      <span>Código IMDb: <strong>{filme.imdb_id}</strong></span>


      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
        </button>
        <button>
               <Link to={`/`}>Voltar</Link>
        </button>
      </div>
    </div>
  )
  }
export default Movies;