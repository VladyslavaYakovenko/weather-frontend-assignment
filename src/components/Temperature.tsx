interface Props {
  value: number;
  className?: string;
}

function Temperature(props: Props) {
  return (
    <p
      className={`relative inline-block after:content-["°"] after:top-0 after:absolute after:block after:right-0 after:translate-x-full ${props.className}`}
    >
      {Math.round(props.value)}
    </p>
  );
}

export default Temperature;
