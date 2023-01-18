import { useState } from "react";
import { useQuery } from "react-query";
import CharacterCard from "./CharacterCard";
import styled from "styled-components";

const CharactersGalleryStyle = styled.div`
  gap: 15px;
  padding: 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  height: 100vh;
  min-height: -webkit-fill-available;
  max-width: 2000px;
  margin:auto;
  display: grid;
  align-items: start;
  justify-items: center;
  grid-template-rows: auto min-content;
  > section {
    width: 100%;
    height: 100%;
    overflow: auto;
    border: 1px solid gray;
    padding: 15px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    background-image: #99fff7;
    background-image: radial-gradient(
        at 36% 14%,
        hsla(22, 65%, 77%, 1) 0,
        transparent 48%
      ),
      radial-gradient(at 27% 39%, hsla(258, 99%, 71%, 1) 0, transparent 50%),
      radial-gradient(at 75% 93%, hsla(234, 90%, 60%, 1) 0, transparent 53%),
      radial-gradient(at 48% 32%, hsla(269, 96%, 62%, 1) 0, transparent 59%),
      radial-gradient(at 68% 69%, hsla(151, 82%, 68%, 1) 0, transparent 40%),
      radial-gradient(at 3% 21%, hsla(291, 88%, 75%, 1) 0, transparent 46%),
      radial-gradient(at 46% 73%, hsla(131, 79%, 73%, 1) 0, transparent 48%);
    background-color: white;
    > div {
      gap: 15px;
      display: grid;
      align-items: center;
      justify-items: center;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    }
  }

  nav {
    margin: auto;
    text-align: center;
    button {
      width: 100px;
      margin: 5px 15px;
    }
  }
`;

const LoadingStyle = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
  width: 100%;
  grid-template-rows: auto min-content;
  position: absolute;
  h2 {
    background-color: white;
    text-transform: capitalize;
    padding: 10px 25px;
    border-radius: 15px;
    border: 1px solid gray;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
`;

export default function Characters() {
  const [page, setPage] = useState(1);

  const fetchCharacters = async ({ queryKey }) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${queryKey[0]}`
    );
    return response.json();
  };

  const { data: charactersData, isPreviousData, isLoading, isError } = useQuery(
    [page],
    fetchCharacters,
    {
      keepPreviousData: false
    }
  );

  if (isLoading)
    return (
      <LoadingStyle>
        <h2>loading</h2>
      </LoadingStyle>
    );
  if (isError) return <div>Error</div>;

  const { results, info } = charactersData;

  return (
    <CharactersGalleryStyle>
      <section>
        <div>
          {results.map((character) => (
            <CharacterCard character={character} />
          ))}
        </div>
      </section>
      <nav>
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </button>
        <button
          disabled={!isPreviousData && info.next === null}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </nav>
      {isLoading && (
        <div className="loading">
          <h2>loading</h2>
        </div>
      )}
    </CharactersGalleryStyle>
  );
}
