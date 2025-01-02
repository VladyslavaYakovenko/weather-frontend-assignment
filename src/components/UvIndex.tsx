interface Props {
  uvIndex: number;
}

function UvIndex(props: Props) {
  const percentage = props.uvIndex > 11 ? 100 : (props.uvIndex / 11) * 100;

  let uvIndexDescription = "";
  if (props.uvIndex < 3) {
    uvIndexDescription = "Low exposure level.";
  } else if (props.uvIndex < 6) {
    uvIndexDescription = "Moderate exposure level.";
  } else if (props.uvIndex < 8) {
    uvIndexDescription = "High exposure level.";
  } else if (props.uvIndex < 11) {
    uvIndexDescription = "Very high exposure level.";
  } else {
    uvIndexDescription = "Extreme exposure level.";
  }

  return (
    <div className="flex flex-col h-full justify-between">
      <p className="text-4xl">{Math.round(props.uvIndex)}</p>
      <div className="gradient-bar h-1 relative rounded-lg">
        <div
          className="rounded-full h-1 w-1 bg-white absolute"
          style={{ left: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-lg">{uvIndexDescription}</p>
    </div>
  );
}

export default UvIndex;
