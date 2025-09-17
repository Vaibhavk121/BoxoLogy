interface Props {
  fitY: number;
  fitZ: number;
}

export default function FrontView({ fitY, fitZ }: Props) {
  return (
    <div className="card h-48 col-span-2">
      <h3 className="font-semibold mb-2 text-gray-700">Front View</h3>
      <div className="relative w-full h-full bg-gray-100 rounded">
        {Array.from({ length: fitY * fitZ }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-purple-400 border border-white"
            style={{
              width: `${100 / fitY}%`,
              height: `${100 / fitZ}%`,
              left: `${(i % fitY) * (100 / fitY)}%`,
              top: `${Math.floor(i / fitY) * (100 / fitZ)}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
