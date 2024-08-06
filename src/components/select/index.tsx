import { useSelect } from "@/hooks/use-select";
import { SelectOption } from "@/types/SelectOption";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

interface Props {
  options: SelectOption[];
  selectedIds: string[];
  onUpdateOptions?: (param: string, options: SelectOption[]) => void;
  onUpdateValues?: (values: SelectOption[]) => void;
}

export function Select({
  options,
  selectedIds,
  onUpdateOptions,
  onUpdateValues,
}: Props) {
  const { handleChange, placeholder, values } = useSelect({
    options,
    selectedIds,
    onUpdateValues,
    onUpdateOptions,
  });

  return (
    <div className="z-10 flex flex-col gap-1">
      <Listbox value={values} onChange={handleChange} multiple>
        <ListboxButton className="h-8 w-52 rounded border border-gray-500 px-3 py-1 text-sm text-gray-700 outline-none ring-gray-400 ring-offset-2 focus:ring-2">
          {placeholder()}
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className="mt-2 w-52 rounded border border-gray-300 bg-white shadow outline-none"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className="px-2 py-1 text-sm text-gray-700 outline-none data-[focus]:bg-gray-300"
            >
              {({ selected }) => {
                return (
                  <div className="flex items-center gap-1">
                    <input type="checkbox" checked={selected} readOnly />
                    {option.name}
                  </div>
                );
              }}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
