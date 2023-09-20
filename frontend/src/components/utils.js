// Helper function to capitalize the first letter of a string //
export function capitalizeFirstLetter(string) {
  const words = string.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
}
// ---------------------------------------------------------------------- //
export function formatSavingThrow(attributeTitle) {
  if (attributeTitle.startsWith('saving_throw_')) {
    const savingThrow = attributeTitle.replace('saving_throw_', ''); // Remove the prefix
    return `${capitalizeFirstLetter(savingThrow)} saving throw`;
  }
  // Handle other cases if needed
  return attributeTitle; // Default behavior
}