import { useURLParams } from "@/hooks/use-url-params";
import { SelectOption } from "@/types/SelectOption";
import { FilterParams } from "@/enums/FilterParams";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchCountry } from "@/api/country";
import { Country } from "@/types/Country";
import { fetchBands } from "@/api/bands";
import { useMemo, useEffect } from "react";
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

  useEffect(() => {
    if (selectedCountries) {
      const countryIds = countries.map((country) => country.id);
      const selectedCountryIds = selectedCountries.split(",");

      const missingCountryIds = selectedCountryIds.filter(
        (id) => !countryIds.includes(parseInt(id)),
      );

      if (missingCountryIds.length > 0) {
        const filteredCountries = selectedCountryIds
          .filter((id) => countryIds.includes(parseInt(id)))
          .join(",");
        updateParam(FilterParams.Country, filteredCountries);
      }
    }
  }, [selectedCountries, countries, updateParam]);

  useEffect(() => {
    if (selectedRockBands) {
      const bandIds = bands.map((band) => band.id);
      const selectedBandIds = selectedRockBands.split(",");

      const missingBandIds = selectedBandIds.filter(
        (id) => !bandIds.includes(parseInt(id)),
      );

      if (missingBandIds.length > 0) {
        const filteredBands = selectedBandIds
          .filter((id) => bandIds.includes(parseInt(id)))
          .join(",");
        updateParam(FilterParams.RockBands, filteredBands);
      }
    }
  }, [selectedRockBands, bands, updateParam]);

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
