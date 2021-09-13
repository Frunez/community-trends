import { useQuery } from "@apollo/client";
import { ReactChild } from "react";
import ErrorMessage from "../../common/ErrorMessage";
import Loading from "../../common/Loading";
import { TopMonthlyTopics } from "../../Graph/Graph";
import GET_ALL_POSTS from "./getAllPosts";

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

function sortTopicsChronologically(monthlyPostTopics: MonthlyPostTopic[]) {
  const currentMonth = new Date().getMonth();
  const indexOfCurrentMonth = monthlyPostTopics.findIndex((x: MonthlyPostTopic) => x.month === currentMonth);
  const currentYear = monthlyPostTopics.slice(0, indexOfCurrentMonth);
  const lastYear = monthlyPostTopics.slice(indexOfCurrentMonth, monthlyPostTopics.length);
  return [...lastYear, ...currentYear];
}

function prepareDataForGraph(monthlyPostTopicsSorted: MonthlyPostTopic[]) {
  return monthlyPostTopicsSorted.map((monthlyTopics: Month) => {
    const monthlyTopicsToArray = Object.entries(monthlyTopics).filter((x) => x[0] !== "month");
    const sortedTopicsByCount = monthlyTopicsToArray.sort(([, a], [, b]) => b - a);
    let topThree = sortedTopicsByCount.splice(0, 3);
    return topThree;
  });
}

export default function AllPostsQueryWrapper(
  { children }:
    {
      children: (
        monthlyPostTopicGraphData: TopMonthlyTopics[],
        onthlyPostTopicsSorted: MonthlyPostTopic[],
        topRange: number
      ) => ReactChild;
    }
) {
  const { loading, error, data } = useQuery(GET_ALL_POSTS, { variables: { count: 3000 } });
  let topRange = 1;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  const monthlyPostTopics = data.allPosts.reduce((acc: MonthlyPostTopic[], post: Post): Month[] => {
    const epochCreatedDate = Number(post.createdAt);
    const createdDate = new Date(Number(post.createdAt));
    const isCurrentYear = epochCreatedDate < (epochCreatedDate - YEAR_IN_EPOCH);

    if (isCurrentYear) { return acc; }

    const monthOfPost = createdDate.getMonth();
    const monthlyTopicsIndex = acc.findIndex((x) => x.month === monthOfPost);
    const currentTopicLabel = post.likelyTopics[0].label;

    acc[monthlyTopicsIndex][currentTopicLabel] ? acc[monthlyTopicsIndex][currentTopicLabel] += 1 : acc[monthlyTopicsIndex][post.likelyTopics[0].label] = 1;
    
    const currentTopicCount = acc[monthlyTopicsIndex][currentTopicLabel];

    if (currentTopicCount > topRange) { topRange = acc[monthlyTopicsIndex][currentTopicLabel]; }

    return acc;
  }, [
    { month: 11 },
    { month: 10 },
    { month: 9 },
    { month: 8 },
    { month: 7 },
    { month: 6 },
    { month: 5 },
    { month: 4 },
    { month: 3 },
    { month: 2 },
    { month: 1 },
    { month: 0 }
  ]);

  const monthlyPostTopicsSorted = sortTopicsChronologically(monthlyPostTopics);
  const monthlyPostTopicGraphData = prepareDataForGraph(monthlyPostTopicsSorted);

  return <>{children(monthlyPostTopicGraphData, monthlyPostTopicsSorted, topRange)}</>;
}