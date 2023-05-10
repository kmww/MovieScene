import { gql, useQuery } from '@apollo/client';

interface Film {
  id: number;
  title: string;
  subtitle: string;
}

interface FilmQueryResult {
  films: Film[];
}

const FILMS_QUERY = gql`
  query ExampleQuery {
    films {
      id
      title
      subtitle
    }
  }
`;

const FilmList = () => {
  const { data, loading, error } = useQuery<FilmQueryResult>(FILMS_QUERY);

  if (loading) return <p>...loading</p>;
  if (error) return <p>{error.message}</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default FilmList;
