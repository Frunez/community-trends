import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";

const BAR_COLOR = '#517DF4';
const LABEL_COLOR = '#FFFFFF';

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export type TopMonthlyTopics = [string, number][];

type GraphProps = {
  data: TopMonthlyTopics,
  month: number,
  width: number,
  height: number;
  topRange: number;
};

export default function Graph({ data, month, width, height, topRange }: GraphProps) {
  const margin = { top: 0, right: 24, bottom: 24, left: 100 };
  const maxWidth = width - margin.left - margin.right;
  const maxHeight = height - margin.top - margin.bottom;

  const xScale = scaleBand<string>({
    range: [0, maxHeight],
    round: true,
    domain: data.map(x => x[0]),
    padding: 0.1,
  });

  const yScale = scaleLinear<number>({
    range: [0, maxWidth],
    round: true,
    domain: [0, topRange]
  });

  return <svg width={width} height={height}>
    <Group left={margin.left}>
      {data.map((bar) => {
        const barWidth = xScale.bandwidth();
        const barHeight = (yScale(bar[1]) ?? 0);
        const barX = xScale(bar[0]);
        const barY = 0;
        return <Bar
          key={`bar-${months[month]}-${bar[0]}-${bar[1]}`}
          x={barY}
          y={barX}
          width={barHeight}
          height={barWidth}
          fill={BAR_COLOR}
          rx={4}
        />;
      }
      )}
      <AxisLeft
        left={0}
        scale={xScale}
        stroke={LABEL_COLOR}
        tickStroke={LABEL_COLOR}
        hideTicks
        tickLabelProps={() => ({
          fill: LABEL_COLOR,
          fontSize: 11,
          textAnchor: "end"
        })}
      />
      <AxisBottom
        top={maxHeight}
        scale={yScale}
        stroke={LABEL_COLOR}
        tickStroke={LABEL_COLOR}
        hideAxisLine
        tickLabelProps={() => ({
          fill: LABEL_COLOR,
          fontSize: 8,
          textAnchor: "end"
        })}
      />
    </Group>
  </svg>;
}