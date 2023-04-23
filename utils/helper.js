export const generateLowercaseAndKebabCasePath = (path) => {
  const lowercasePath = path.toLocaleLowerCase("en");
  return lowercasePath.replace(/ /g, "-");
};

export const convertISODateToReadableDate = (isoDate) => {
  if (!isoDate) return;
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year}`;
  return formattedDate;
};
