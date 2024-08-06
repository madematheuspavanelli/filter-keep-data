import { useSearchParams } from "react-router-dom";

export function useURLParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  function getParam(param: string): string | undefined {
    return searchParams.get(param) || undefined;
  }

  function updateParam(param: string, _value: string | string[]) {
    setSearchParams((state) => {
      if (param) {
        const value = Array.isArray(_value) ? _value.sort().join(",") : _value;
        state.set(param, value);
      } else {
        state.delete(param);
      }

      return state;
    });
  }

  return {
    getParam,
    updateParam,
  };
}
