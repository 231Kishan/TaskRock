import { useParams, Link } from 'react-router-dom';

function CharacterDetails({ data, theme }) {
  const { id } = useParams();
  const character = data.find((char) => char.id === parseInt(id));

  if (!character) {
    return <p>Character not found!</p>;
  }

  return (
    <div className={theme}>
      <Link to="/">Back to List</Link>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Type: {character.type || 'N/A'}</p>
      <p>Gender: {character.gender}</p>
      <p>Species: {character.species}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Location: {character.location.name}</p>
      <p>Episode Count: {character.episode.length}</p>
      <p>Created: {character.created}</p>
      <p>URL: {character.url}</p>
      <p>ID: {character.id}</p>
    </div>
  );
}

export default CharacterDetails;