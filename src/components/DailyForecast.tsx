import dayjs from "dayjs";
import { DayForecast } from "../types";
import Temperature from "./Temperature";

interface Props {
  data: DayForecast;
  min: number;
  max: number;
}

function DailyForecast(props: Props) {
  const date = dayjs(props.data.date);
  const dayName = date.format("ddd");
  const icon = props.data.day.condition.icon;
  const minTemp = props.data.day.mintemp_c;
  const maxTemp = props.data.day.maxtemp_c;

  const normalize = (val: number) =>
    (val - props.min) / (props.max - props.min);

  const normalizedMin = normalize(minTemp);
  const normalizedMax = normalize(maxTemp);

  const leftPercentage = `${normalizedMin * 100}%`;
  const rightPercentage = `${(1 - normalizedMax) * 100}%`;

  return (
    <div data-testid="daily-forecast" className="flex items-center gap-2">
      <p className="flex-[0.5] max-w-12">{dayName}</p>
      <img className="w-12" src={icon} alt="" />
      <div className="flex flex-1 items-center gap-3">
        <Temperature className="flex" value={minTemp}></Temperature>
        <div className="rounded-lg overflow-hidden flex-1 relative bg-sky-950 h-1">
          <div
            className="rounded-[inherit] absolute h-full top-0 bg-sky-400 transition-all duration-500"
            style={{
              left: leftPercentage,
              right: rightPercentage,
            }}
          ></div>
        </div>
        <Temperature className="mr-2" value={maxTemp}></Temperature>
      </div>
    </div>
  );
}
export default DailyForecast;
