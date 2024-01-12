export const formatPeerId = (peerId) => {
  const length = peerId.length;
  const firstThree = peerId.substring(0, 3);
  const lastThree = peerId.substring(length - 3, length);
  return `${firstThree}.......${lastThree}`;
};
