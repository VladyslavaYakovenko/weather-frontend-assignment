interface Props {
  degree: number;
  speed: number;
}

function WindCard(props: Props) {
  return (
    <div className="w-[60%] max-w-24 aspect-square bg-sky-700 rounded-full relative flex items-center justify-center">
      <div className="flex flex-col absolute h-full w-full items-center justify-between text-xs xl:text-sm py-1">
        <p>N</p>
        <p>S</p>
      </div>

      <div className="absolute flex items-center justify-center h-full w-full">
        <img
          style={{ transform: `rotate(${props.degree + 180}deg)` }}
          className="w-[90%] h-[90%] transition-all duration-500"
          src="compass-arrow.svg"
        />
      </div>

      <div className="flex absolute h-full w-full items-center justify-between text-xs xl:text-sm px-2">
        <p>W</p>
        <p>E</p>
      </div>

      <p className="bg-inherit z-10 text-xs">{Math.round(props.speed)}km/h</p>
    </div>
  );
}

export default WindCard;
