export const generateLowercaseAndKebabCasePath = (path) => {
  const lowercasePath = path.toLocaleLowerCase("en");
  return lowercasePath.replace(/ /g, "-");
};
