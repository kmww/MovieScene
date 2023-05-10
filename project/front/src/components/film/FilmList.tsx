import { useFilmsQuery } from '../../generated/graphql';

const FilmList = () => {
  const { data, loading, error } = useFilmsQuery();

  if (loading) return <p>...loading</p>;
  if (error) return <p>{error.message}</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default FilmList;
