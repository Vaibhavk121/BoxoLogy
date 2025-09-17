interface Props {
  fitX: number;
  fitY: number;
}

export default function TopView({ fitX, fitY }: Props) {
  return (
    <div className="card h-48">
      <h3 className="font-semibold mb-2 text-gray-700">Top View</h3>
      <div className="relative w-full h-full bg-gray-100 rounded">
        {Array.from({ length: fitX * fitY }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-400 border border-white"
            style={{
              width: `${100 / fitX}%`,
              height: `${100 / fitY}%`,
              left: `${(i % fitX) * (100 / fitX)}%`,
              top: `${Math.floor(i / fitX) * (100 / fitY)}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
