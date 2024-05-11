const verificationFiltering = (verifiedBy: number): any => {
  let verified_by: any;
  if (!verifiedBy) return (verified_by = undefined);

  if (verifiedBy == 0) {
    verified_by = { not: null };
  } else if (verifiedBy == -1) {
    verified_by = null;
  } else {
    verified_by = verifiedBy;
  }

  return verified_by;
};

export default verificationFiltering;
