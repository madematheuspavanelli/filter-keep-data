import { api } from "@/libs/axios";
import { Band } from "@/types/Band";

interface Params {
  countryIds?: string | string[];
}

export const fetchBands = async ({ countryIds }: Params) => {
  countryIds = Array.isArray(countryIds) ? countryIds.join(",") : countryIds;

  const { data } = await api.get<Band[]>(`/bands/details`, {
    params: {
      countryIds,
    },
  });
  return data;
};
