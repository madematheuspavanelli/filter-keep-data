import { useURLParams } from "@/hooks/use-url-params";

export function Cards() {
  const { getParam } = useURLParams();

  const rockBands = getParam("rock_bands")?.split(",") ?? [];

  return (
    <div className="w-full bg-gray-100 p-4">
      <h1 className="text-lg font-bold">Rock Bands</h1>
      <ul className="mt-4 grid grid-cols-2 gap-4">
        {rockBands.map((rockBand) => (
          <li key={rockBand} className="rounded bg-white p-4 shadow">
            {rockBand}
          </li>
        ))}
      </ul>
    </div>
  );
}
