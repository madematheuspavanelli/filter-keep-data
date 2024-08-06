import { api } from "@/libs/axios";
import { Country } from "@/types/Country";

interface Params {
  bandIds?: string | string[];
}

export const fetchCountry = async ({ bandIds }: Params) => {
  bandIds = Array.isArray(bandIds) ? bandIds.join(",") : bandIds;

  const { data } = await api.get<Country[]>(`/countries/`, {
    params: {
      bandIds,
    },
  });
  return data;
};
