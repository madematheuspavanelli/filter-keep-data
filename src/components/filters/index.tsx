import { useURLParams } from "@/hooks/use-url-params";
import { SelectOption } from "@/types/SelectOption";
import { Select } from "@/components/select";
import { FilterParams } from "@/enums/FilterParams";
import { useQuery } from "@tanstack/react-query";
import { fetchCountry } from "@/api/country";
import { Country } from "@/types/Country";
import { fetchBands } from "@/api/bands";

export function Filter() {
  const { getParam, updateParam } = useURLParams();

  const countries = getParam(FilterParams.Country);
  const rockBands = getParam(FilterParams.RockBands);

  const { data: country_data } = useQuery({
    queryKey: ["countries", rockBands],
    queryFn: () => fetchCountry({ bandIds: rockBands }),
    select: (data) =>
      data.map((country: Country) => ({
        id: country.id,
        name: country.name,
      })),
  });

  const { data: band_options } = useQuery({
    queryKey: ["bands", countries],
    queryFn: () => fetchBands({ countryIds: countries }),
    select: (data) =>
      data.map((country: Country) => ({
        id: country.id,
        name: country.name,
      })),
  });

  function handleUpdate(param: string, values: SelectOption[]) {
    updateParam(param, values.map((value) => value.id).join(","));
  }

  return (
    <div className="flex gap-4">
      <Select
        options={country_data || []}
        selectedIds={getParam(FilterParams.Country)?.split(",") ?? []}
        onUpdate={(values) => handleUpdate(FilterParams.Country, values)}
        key="country"
      />

      <Select
        options={band_options || []}
        selectedIds={getParam(FilterParams.RockBands)?.split(",") ?? []}
        onUpdate={(values) => handleUpdate(FilterParams.RockBands, values)}
        key="rock_bands"
      />
    </div>
  );
}
