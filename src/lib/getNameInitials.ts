export const getNameInitials = (name: string): string => {
  const splitName = name.split(" ");
  let nameBuffer = "";

  for (const word of splitName) {
    nameBuffer += word.charAt(0).toUpperCase();
  }

  return nameBuffer;
};
