import { useQuery } from '@apollo/client';
import GET_ALL_POSTS from './graphql/getAllPosts';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import './App.css';
import Graph, { months, TopMonthlyTopics } from '../Graph/Graph';

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

type MonthlyPostTopic = { [key: string]: number; };

function App() {
  const { loading, error, data } = useQuery(GET_ALL_POSTS, { variables: { count: 3000 } });
  let topRange = 1;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  const monthlyPostTopics = data.allPosts.reduce((acc: MonthlyPostTopic[], post: Post): Month[] => {
    const epochCreatedDate = Number(post.createdAt);
    const createdDate = new Date(Number(post.createdAt));
    if (epochCreatedDate < (epochCreatedDate - YEAR_IN_EPOCH)) return acc;
    const month = createdDate.getMonth();
    let monthlyTopicsIndex = acc.findIndex((x) => x.month === month);
    let currentLabel = post.likelyTopics[0].label;
    acc[monthlyTopicsIndex][currentLabel] ? acc[monthlyTopicsIndex][currentLabel] += 1 : acc[monthlyTopicsIndex][post.likelyTopics[0].label] = 1;
    if (acc[monthlyTopicsIndex][currentLabel] > topRange) topRange = acc[monthlyTopicsIndex][currentLabel];
    return acc;
  }, [{ month: 11 }, { month: 10 }, { month: 9 }, { month: 8 }, { month: 7 }, { month: 6 }, { month: 5 }, { month: 4 }, { month: 3 }, { month: 2 }, { month: 1 }, { month: 0 }]);

  const currentMonth = new Date().getMonth();
  const indexOfCurrentMonth = monthlyPostTopics.findIndex((x: MonthlyPostTopic) => x.month === currentMonth);
  const currentYear = monthlyPostTopics.slice(0, indexOfCurrentMonth - 1);
  const lastYear = monthlyPostTopics.slice(indexOfCurrentMonth, monthlyPostTopics.length);
  const chronologicalMonths = [...lastYear, ...currentYear];


  const monthlyPostTopicsSorted = chronologicalMonths.map((monthlyTopics: Month) => {
    const sortedTopics = Object.entries(monthlyTopics).filter((x) => x[0] !== "month").sort(([, a], [, b]) => b - a);
    let topThree = sortedTopics.splice(0, 3);
    return topThree;
  });
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Community Trends</h1>
        {monthlyPostTopicsSorted.map((topMonthlyTopics: TopMonthlyTopics, index: number) =>
          <div>
            <p>{months[chronologicalMonths[index].month]}</p>
            <Graph data={topMonthlyTopics} month={index} width={800} height={100} topRange={topRange} />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
