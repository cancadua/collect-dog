function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function handleBreedName(string) {
  return string.split("/")[4]
    .replaceAll("-", " ")
    .split(" ")
    .reverse()
    .join(" ");
}

module.exports = {
  capitalizeFirstLetter,
  handleBreedName
}