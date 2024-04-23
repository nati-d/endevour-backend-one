const verificationFiltering = async (verifiedBy: number) => {
  let filtering = {};
  if (!verifiedBy) return (filtering = { verified_by: undefined });

  if (verifiedBy === 0) {
    filtering = {
      verified_by: { not: null },
    };
  } else if (verifiedBy === -1) {
    filtering = {
      verified_by: null,
    };
  } else {
    filtering = { verified_by: verifiedBy };
  }

  return filtering;
};

export default verificationFiltering;
