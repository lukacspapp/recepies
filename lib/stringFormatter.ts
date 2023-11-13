export function serializeSlug(slug: string) {
  const slugName = slug.toLowerCase().replace(/\s/g, "-")
  const slugNameNoSpecialChar = slugName.replace(/[^a-zA-Z0-9-]/g, "");
  const serializedString = slugNameNoSpecialChar.replace(/-*$/,"")
  return serializedString.replace(/-{2,}/g, "-")
}

export function serializeSearchParam(searchParam: string) {
  const serializedString = searchParam.toLowerCase().replace(/\s/g, "_").replace(/[^a-zA-Z0-9-_]/g, "")
  return serializedString.replace(/_{2,}/g, "_").replace(/_/g, ",")
}