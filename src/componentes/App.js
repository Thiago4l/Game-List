import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './pesquisa';
import Loader from '../componentes/loader';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [showLoaderTimeout, setShowLoaderTimeout] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleApiError = (status) => {
    if (
      status === 500 ||
      status === 502 ||
      status === 503 ||
      status === 504 ||
      status === 507 ||
      status === 508 ||
      status === 509
    ) {
      return 'O servidor falhou em responder, tente recarregar a página.';
    } else {
      return 'O servidor não conseguiu responder por agora, tente voltar novamente mais tarde.';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://games-test-api-81e9fb0d564a.herokuapp.com/api/data', {
          headers: {
            'dev-email-address': 'seu-email@example.com',
          },
        });
        const gamesArray = Object.values(response.data);
        setData(gamesArray);
        setIsLoading(false);
      } catch (error) {
        if (error.response && error.response.status) {
          const errorMsg = handleApiError(error.response.status);
          setErrorMsg(errorMsg);
        } else {
          setErrorMsg('Erro ao conectar-se ao servidor.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = data.filter((item) => {
      const matchesGenre = !selectedGenre || item.genre === selectedGenre;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesGenre && matchesSearch;
    });

    setFilteredData(filteredData);
  }, [data, selectedGenre, searchTerm]);

  useEffect(() => {
    // Inicia o timer quando isLoading é verdadeiro
    if (isLoading) {
      const timeout = setTimeout(() => {
        setShowLoaderTimeout(true);
      }, 5000);

      return () => {
        // Limpa o timer quando o componente é desmontado ou isLoading se torna falso
        clearTimeout(timeout);
      };
    } else {
      setShowLoaderTimeout(false);
    }
  }, [isLoading]);

  const renderGameData = () => {
    return filteredData.map((item) => {
      const { title, thumbnail, genre } = item;
      return (
        <div className="game-list" key={item.id}>
          <h2>{title}</h2>
          <img src={thumbnail} alt={title} />
          <p>{genre}</p>
        </div>
      );
    });
  };

  return (
    <>
      <h2 className="titulo">Games List</h2>
      {errorMsg ? (
        <div className="erro-msg">{errorMsg}</div>
      ) : (
        <>
          <SearchBar handleSearch={handleSearch} handleGenreChange={handleGenreChange} />
          <div className="game-container">
            {isLoading && showLoaderTimeout ? (
              <div className="erro-msg">Tempo limite excedido ao carregar os dados.</div>
            ) : (
              <>{isLoading ? <Loader /> : renderGameData()}</>
            )}
          </div>
          <button className='scroll-button' onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              Voltar ao topo
          </button>
        </>
      )}
    </>
  );
};

export default App;
