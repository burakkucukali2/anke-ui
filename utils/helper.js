export const generateLowercaseAndKebabCasePath = (path) => {
  const lowercasePath = path.toLocaleLowerCase("en");
  return lowercasePath.replace(/ /g, "-");
};

export const splitDateAccordingToMinusSignAndReverse = (date) => {
  if (!date) return "";
  const dateArray = date.split("-");
  return dateArray.reverse().join("/");
};
