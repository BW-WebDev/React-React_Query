import styled from "styled-components";

const CharacterCardStyle = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 400px;
  gap: 15px;

  > img {
    width: 100%;
    border-radius: 500px;
    border-bottom-right-radius: 0;
    overflow: hidden;
    min-width: 200px;
    object-fit: cover;
    background-image: url("https://rickandmortyapi.com/api/character/avatar/19.jpeg");
    background-size: cover;
    aspect-ratio: 1/1;
    grid-column: 1 / span 2;
    grid-row: 1;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

    &::after {
      content: "Brett";
      display: block;
      height: 250px;
      width: 250px;
      background-color: red;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
        rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    }
  }
  > div {
    align-self: end;
    margin-left: 25%;
    background-color: white;

    border-top-right-radius: 15px;
    padding: 15px;
    grid-row: 1;
    grid-column: 2 / span 2;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    > div {
      h3 {
        margin: 0;
      }
      i {
        font-size: 0.85rem;
      }
      p {
        margin: 5px 0;
        font-size: 0.8rem;
      }
    }
  }
`;

export default function CharacterCard({ character }) {
  return (
    <CharacterCardStyle>
      <img src={character.image} alt={character.name} />
      <div>
        <div>
          <h3>{character.name}</h3>
          <i>
            {character.status} - {character.species}
          </i>
          <p className="title">Last seen on:</p>
          <b>{character.location.name}</b>
        </div>
      </div>
    </CharacterCardStyle>
  );
}
