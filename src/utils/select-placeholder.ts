export function getPlaceholder(
  value: string | string[] | undefined,
  placeholderSelected: string | undefined,
  placeholder: string,
) {
  if (!value?.length) return placeholder;

  if (typeof value === "string") {
    return value.replace("_", " ");
  }

  if (Array.isArray(value)) {
    return `${placeholderSelected} (${value.length})`;
  }
}
