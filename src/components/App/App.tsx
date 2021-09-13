import { useQuery } from '@apollo/client';
import GET_ALL_POSTS from './graphql/getAllPosts';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import './App.css';
import Graph, { TopMonthlyTopics } from '../Graph/Graph';

const YEAR_IN_EPOCH = 31536000;

type Post = {
  createdAt: number,
  likelyTopics: [{
    label: string;
  }];
};

type Month = {
  [key: string]: number;
};

function App() {
  const { loading, error, data } = useQuery(GET_ALL_POSTS, { variables: { count: 3000 } });
  let topRange = 1;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  const newData = data.allPosts.reduce((acc: [{ [key: string]: number; }], post: Post): Month[] => {
    const epochCreatedDate = Number(post.createdAt);
    const createdDate = new Date(Number(post.createdAt));
    if (epochCreatedDate < (epochCreatedDate - YEAR_IN_EPOCH)) return acc;
    const month = createdDate.getMonth();
    let monthlyTopicsIndex = acc.findIndex((x) => x.month === month);
    let currentLabel = post.likelyTopics[0].label;
    acc[monthlyTopicsIndex][currentLabel] ? acc[monthlyTopicsIndex][currentLabel] += 1 : acc[monthlyTopicsIndex][post.likelyTopics[0].label] = 1;
    if (acc[monthlyTopicsIndex][currentLabel] > topRange) topRange = acc[monthlyTopicsIndex][currentLabel]
    return acc;
  }, [{ month: 0 }, { month: 1 }, { month: 2 }, { month: 3 }, { month: 4 }, { month: 5 }, { month: 6 }, { month: 7 }, { month: 8 }, { month: 9 }, { month: 10 }, { month: 11 }]);

  const sortedData = newData.map((monthlyTopics: Month) => {
    const sortedTopics = Object.entries(monthlyTopics).filter((x) => x[0] !== "month").sort(([, a], [, b]) => b - a);
    let topThree = sortedTopics.splice(0, 3);
    return topThree;
  });

  return (
    <div className="App">
      <header className="App-header">
        {sortedData.map((topMonthlyTopics: TopMonthlyTopics, index: number) =>
          <Graph data={topMonthlyTopics} month={index} width={800} height={100} topRange={topRange} />
        )}
      </header>
    </div>
  );
}

export default App;
