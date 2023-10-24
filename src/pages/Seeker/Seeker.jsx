import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce"
import "./Seeker.css"
import axios from "axios";


const Seeker = () => {
  const [inputValue, setInputValue] = useState("");
  const [value] = useDebounce(inputValue, 700);
  const [characters, setCharacters] = useState([])
  const [pageNum, setPageNum] = useState()
  const [error, setError] = useState(false);

  const getCharacters = async () => {
    try {
      const pag = await axios.get(`https://rickandmortyapi.com/api/character?${pageNum}`)
      setPageNum(pag.data.results)
      console.log("pag", pag)
    } catch (error) {
      setError(true)
    }
  };

  const searchCharacter = async () => {
    setError(false)
    try {
      const res = await axios.get(`https://rickandmortyapi.com/api/character?name=${value}`)
      console.log(res)
      setCharacters(res.data.results);
    } catch (error) {
      setInputValue("")
    }

  };


  useEffect(() => {
    searchCharacter()
    getCharacters()

  }, [value])




  return (
    <main>
      <div className="search">
        <input type="text" placeholder="Character name..." value={inputValue} onInput={(ev) => setInputValue(ev.target.value)} />
        <div className="pages">
          <button onClick={() => setPageNum(pageNum - 1)}>prev</button>
          <button onClick={() => setPageNum(pageNum + 1)}>next</button>
        </div>
      </div>
      {error ? <div className="error">
        <img className="not-exist" src="https://files.cults3d.com/uploaders/14307074/illustration-file/3c12b15c-003f-409f-a9b6-b0dcde4495d8/render0001.png" alt="Paceholder Rick&Morty" />
        <h2>No existe este personaje</h2>
      </div> :
        <section className="results">
          {characters.map((char) => (
            <div key={char.id} className="card">
              <h3>{char.name}</h3>
              <div className="dates">
                <img src={char.image} alt={char.name} />
                <h4> Origen: {char.origin.name}</h4>
                <h4>Especie: {char.species}</h4>
                <h4>Estado: {char.status}</h4>
              </div>
            </div>
          ))}
        </section>}
    </main>
  )
}
export default Seeker;