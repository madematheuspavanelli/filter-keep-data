import { SelectOption } from "@/types/SelectOption";
import { getPlaceholder } from "@/utils/select-placeholder";
import { useState } from "react";

interface Params {
  options: SelectOption[];
  selectedIds: string[];
  onUpdate?: (values: SelectOption[]) => void;
}

export function useSelect({ options, selectedIds, onUpdate }: Params) {
  const [values, setValues] = useState<SelectOption[]>(() => {
    return options.filter((option) =>
      selectedIds.includes(option.id.toString()),
    );
  });

  function handleChange(value: SelectOption | SelectOption[]) {
    setValues(Array.isArray(value) ? value : [value]);
    if (onUpdate) {
      onUpdate(Array.isArray(value) ? value : [value]);
    }
  }

  function placeholder() {
    return getPlaceholder(
      values.map((option) => option.name),
      "Selecionados",
      "Selecione",
    );
  }

  return {
    values,
    handleChange,
    placeholder,
  };
}
