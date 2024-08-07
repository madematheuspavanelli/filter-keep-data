import { Select } from "@/components/select";
import { FilterParams } from "@/enums/FilterParams";
import { Band } from "@/types/Band";
import { Country } from "@/types/Country";
import { SelectOption } from "@/types/SelectOption";

interface Props {
  selectedCountries?: string | string[];
  selectedRockBands?: string | string[];
  countries: Country[];
  bands: Omit<Band, "countryId">[];
  handleUpdate: (param: string, values: SelectOption[]) => void;
}

export function FiltersTemplate({
  bands,
  countries,
  handleUpdate,
  selectedCountries,
  selectedRockBands,
}: Props) {
  return (
    <div className="flex gap-4">
      <Select
        options={countries}
        selectedIds={
          Array.isArray(selectedCountries)
            ? selectedCountries
            : (selectedCountries?.split(",") ?? [])
        }
        onUpdateValues={(values) => handleUpdate(FilterParams.Country, values)}
        key="country"
      />
      <Select
        options={bands}
        selectedIds={
          Array.isArray(selectedRockBands)
            ? selectedRockBands
            : (selectedRockBands?.split(",") ?? [])
        }
        onUpdateValues={(values) =>
          handleUpdate(FilterParams.RockBands, values)
        }
        key="rock_bands"
      />
    </div>
  );
}
