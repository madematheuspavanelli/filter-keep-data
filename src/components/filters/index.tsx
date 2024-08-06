import { useURLParams } from "@/hooks/use-url-params";
import { SelectOption } from "@/types/SelectOption";
import { FilterParams } from "@/enums/FilterParams";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchCountry } from "@/api/country";
import { Country } from "@/types/Country";
import { fetchBands } from "@/api/bands";
import { useEffect, useMemo, useRef } from "react";
import { Band } from "@/types/Band";
import { FiltersTemplate } from "./template.tsx";

export function Filter() {
  const { getParam, updateParam } = useURLParams();

  const selectedCountries = getParam(FilterParams.Country);
  const selectedRockBands = getParam(FilterParams.RockBands);

  const handleUpdate = useMemo(
    () => (param: string, values: SelectOption[]) => {
      updateParam(param, values.map((value) => value.id).join(","));
    },
    [updateParam],
  );

  const { data: countries = [] } = useQuery({
    queryKey: ["countries", selectedRockBands],
    queryFn: () => fetchCountry({ bandIds: selectedRockBands }),
    placeholderData: keepPreviousData,
    select: (data) =>
      data.map((country: Country) => ({
        id: country.id,
        name: country.name,
      })),
  });

  const prevCountriesRef = useRef<SelectOption[]>([]);

  useEffect(() => {
    if (prevCountriesRef.current !== countries) {
      handleUpdate(FilterParams.Country, countries);
      prevCountriesRef.current = countries;
    }
  }, [countries, handleUpdate]);

  const { data: bands = [] } = useQuery({
    queryKey: ["bands", selectedCountries],
    placeholderData: keepPreviousData,
    queryFn: () => fetchBands({ countryIds: selectedCountries }),
    select: (data) =>
      data.map((band: Band) => ({
        id: band.id,
        name: band.name,
      })),
  });

  const prevBandRef = useRef<SelectOption[]>([]);

  useEffect(() => {
    if (prevBandRef.current !== bands) {
      console.log("atuaizando bandas", bands);
      handleUpdate(FilterParams.RockBands, bands);
      prevBandRef.current = bands;
    }
  }, [bands, handleUpdate]);

  return (
    <FiltersTemplate
      bands={bands}
      countries={countries}
      handleUpdate={handleUpdate}
      selectedCountries={selectedCountries}
      selectedRockBands={selectedRockBands}
    />
  );
}
