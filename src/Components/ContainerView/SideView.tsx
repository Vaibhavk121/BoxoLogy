interface Props {
  fitX: number;
  fitZ: number;
}

export default function SideView({ fitX, fitZ }: Props) {
  return (
    <div className="card h-48">
      <h3 className="font-semibold mb-2 text-gray-700">Side View</h3>
      <div className="relative w-full h-full bg-gray-100 rounded">
        {Array.from({ length: fitX * fitZ }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-green-400 border border-white"
            style={{
              width: `${100 / fitX}%`,
              height: `${100 / fitZ}%`,
              left: `${(i % fitX) * (100 / fitX)}%`,
              top: `${Math.floor(i / fitX) * (100 / fitZ)}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
