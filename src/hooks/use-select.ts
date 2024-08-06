import { SelectOption } from "@/types/SelectOption";
import { getPlaceholder } from "@/utils/select-placeholder";
import { useEffect, useState } from "react";

interface Params {
  options: SelectOption[];
  selectedIds: string[];
  onUpdateOptions?: (param: string, options: SelectOption[]) => void;
  onUpdateValues?: (values: SelectOption[]) => void;
}

export function useSelect({ options, selectedIds, onUpdateValues }: Params) {
  const [values, setValues] = useState<SelectOption[]>(() => {
    return options.filter((option) =>
      selectedIds.includes(option.id.toString()),
    );
  });

  function handleChange(value: SelectOption | SelectOption[]) {
    setValues(Array.isArray(value) ? value : [value]);
    if (onUpdateValues) {
      onUpdateValues(Array.isArray(value) ? value : [value]);
    }
  }

  function placeholder() {
    return getPlaceholder(
      values.map((option) => option.name),
      "Selecionados",
      "Selecione",
    );
  }

  useEffect(() => {
    setValues(
      options.filter((option) => selectedIds.includes(option.id.toString())),
    );
  }, [options, selectedIds]);

  return {
    values,
    handleChange,
    placeholder,
  };
}
