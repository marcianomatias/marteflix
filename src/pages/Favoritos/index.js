import { useEffect, useState } from 'react';
import './favorito.css'
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';



function Favoritos() {

  const [filmes, setFilmes] = useState ([])

  useEffect(()=>{

    const minhaLista = localStorage.getItem("@marteflix");
    setFilmes(JSON.parse(minhaLista) || [])
  }, [])

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item)=>{
      return(item.id !== id)
    })
    setFilmes(filtroFilmes);
    localStorage.setItem("@marteflix", JSON.stringify(filtroFilmes))
    toast.success("Excluido com sucesso!")
  }

  return (
    <div className='meus-filmes'>
     <h1> Meus Filmes Favoritos</h1>

      {filmes.length === 0 && <span><h1>Você não possui nenhum filme salvo 🤦! </h1></span>}
     <ul>
      {filmes.map((item)=> {
        return(
          <li key={item.id}>
            <span>{item.title}</span>
                <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
            <div>
                <Link to={`/movies/${item.id}`}>Ver Detalhes</Link>
                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
            </div>
            <div>
               <Link to={`/`}>Voltar</Link>
            </div>
          </li>
          
        )
      })}
     </ul>
      
    </div>
  )
}

export default Favoritos;