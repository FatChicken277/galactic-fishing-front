// Returns a random character using ascii ranges
export const getRandomChar = (): string => {
  const ranges = [
    [48, 57], // 0-9
    [65, 90], // A-Z
    [97, 122], // a-z
  ];

  const [start, end] = ranges[Math.floor(Math.random() * ranges.length)];

  return String.fromCharCode(
    start + Math.floor(Math.random() * (end - start + 1))
  );
};
