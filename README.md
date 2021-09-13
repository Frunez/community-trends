# Community Trends

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.

### `yarn test`

Launches the test runner in the interactive watch mode.

## Notes

### Process

- Step one: Prepare the appliction using the simplest setup with create-react-app
- Step two: Set up the apollo client
- Step three: Use graphql interface on client url to test relevant queries
- Step four: Create Query to get all posts
- Step five: Understand basics of visx and see how to transform data for graph
- Step six: Transform the raw graphql data into an easy to use format for the graph
- Step seven: Create a graph using mock data for testing capabailities
- Step eight: Use the transformed data for graphs
- Step nine: Sort the data to match a more user friendly format
- Step ten: Do some refactor and clean up

### Design choices

Architecturally the code and splitting is fairly simple. It splits up the components and the code to comply somewhat to SRP.
There is room for improvement in terms of where to place some of the logic but the idea was to place logic where it is connected and relevant.

The reducer to transform the raw data from graphql could potentially be refactored to immediately return a 2 dimensional array,
but at the beginning the plan was to use bar graph groups which required an array with nested objects but that was needlessly complex,
the format of the data however was still valid for further transformation so it was kept that way to save some time.

The UI itself was kept fairly simple but ultimately easy to read and understand.
Mapping multiple graphs also greatly reduced the complexity of layout and labelling the axis and ultimately it is easier to read.

### Challenges

The biggest challenge was transforming the data to something that was easy to use for graphs and sorted in a way the was easy to understand,
there were multiple ways but in hindsight I do not think I went for the optimal solution at the beginning.

As mentioned before I had an idea in my head on how to use bar graph groups and started with that approach,
but I didn't fully understand the limitations and added complexities so I quickly went back to the "drawing board" as soon as I started to face difficulties.

I hadn't used VisX before so I was not totally familiar with some of the implementation, but ultimately I found it fairly easy to implement following the many examples in their docs.