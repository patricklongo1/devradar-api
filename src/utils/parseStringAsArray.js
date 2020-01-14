export default function parseStringAsArray(string) {
  const theArray = string.split(',').map(item => item.trim());

  return theArray;
}
