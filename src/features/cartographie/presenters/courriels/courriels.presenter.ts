export const toCourrielsWithCC = (courriels: string[] = []) => {
  if (courriels == null || courriels.length < 1) return null;
  const [mainCourriel, ...ccCourriels] = courriels;
  return ccCourriels.length === 0 ? mainCourriel : `${mainCourriel}?cc=${ccCourriels.join(',')}`;
};
