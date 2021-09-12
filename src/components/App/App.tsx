import React from 'react';
import { useQuery } from '@apollo/client';
import GET_ALL_POSTS from './graphql/getAllPosts';
import './App.css';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';

function App() {
  const { loading, error, data } = useQuery(GET_ALL_POSTS, { variables: { count: 100 } });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  return (
    <pre>{JSON.stringify(data, null, 4)}</pre>
  );
}

export default App;
