export function serializeSlug(slug: string) {
  const slugName = slug.toLowerCase().replace(/\s/g, "-")
  const slugNameNoSpecialChar = slugName.replace(/[^a-zA-Z0-9-]/g, "");
  const serializedString = slugNameNoSpecialChar.replace(/-*$/,"")
  return serializedString.replace(/-{2,}/g, "-")
}
