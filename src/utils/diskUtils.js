export const getDiskColor = (size) => {
  if (size < 1) {
    throw new Error('Disk size must be greater than or equal to 1.');
  }

  const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'violet',
  ];
  return colors[(size - 1) % colors.length];
};
