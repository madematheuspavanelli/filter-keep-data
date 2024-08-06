import { FilterParams } from "@/enums/FilterParams";
import { useURLParams } from "@/hooks/use-url-params";

export function URLs() {
  const { getParam } = useURLParams();

  const countries = getParam(FilterParams.Country);
  const rock_bands = getParam(FilterParams.RockBands);

  return (
    <section className="bg-slate-200 py-5">
      <div className="container mx-auto">
        <h3 className="text-lg">URLs</h3>
        <p>Country: {countries}</p>
        <p>Rock Bands: {rock_bands}</p>
      </div>
    </section>
  );
}
