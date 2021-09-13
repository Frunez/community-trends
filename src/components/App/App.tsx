import Graph, { months, TopMonthlyTopics } from '../Graph/Graph';
import AllPostsQueryWrapper from './graphql/AllPostsQueryWrapper';
import './App.css';

function App() {


  return (
    <AllPostsQueryWrapper>
      {(monthlyPostTopicGraphData, monthlyPostTopicsSorted, topRange) =>
        <div className="App">
          <header className="App-header">
            <h1>Community Trends</h1>
            {monthlyPostTopicGraphData.map((topMonthlyTopicsData: TopMonthlyTopics, index: number) =>
              <div>
                <p>{months[monthlyPostTopicsSorted[index].month]}</p>
                <Graph
                  data={topMonthlyTopicsData}
                  month={index}
                  width={800}
                  height={100}
                  topRange={topRange}
                />
              </div>
            )}
          </header>
        </div>
      }
    </AllPostsQueryWrapper>
  );
}

export default App;
