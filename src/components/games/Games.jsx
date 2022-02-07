import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./games.css";
const Games = () => {
  const [games, setGames] = useState([]);
  const getGames = async () => {
    try {
      const gameList = await axios.get(
        "https://adaorachi.github.io/esetech-assessment-api/game-data.json"
      );
      setGames(gameList.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getGames();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <div className="container games_cont row py-5">
        <div className="col col-sm-12 col-md-4 col-lg-3 searchbar">
          <p>filter results</p>
          <form action="">
            <div className="form-group">
              <label htmlFor="name">name (contains)</label>
              <br />
              <input
                type="text"
                placeholder="text string"
                name="name"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="orderby">Order by</label>
              <br />
              <input
                name="orderby"
                type="text"
                placeholder=""
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>

            <button type="submit" onSubmit={(e) => e.preventDefault()}>
              <i className="fas fa-search"></i> clear
            </button>
          </form>
        </div>

        <div className="col col-sm-12 col-md-6 col-lg-9 games">
          {games
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.name
                  .toLocaleLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
              ) {
                return val;
              } else if (val.first_release_date.includes(searchTerm)) {
                return val;
              } else if (val.rating.includes(searchTerm)) {
                return val;
              }
              return false;
            })
            .map((game) => {
              return (
                <>
                  <Link to={`/game/${game.id}`} className="game_box">
                    <div className="games_id" key={game.id}>
                      <h1>{game.name}</h1>
                      <p>{game.first_release_date}</p>
                      <p className="summary">{game.summary}</p>
                    </div>
                  </Link>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Games;