"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verificationFiltering = (verifiedBy) => {
    let verified_by;
    if (!verifiedBy)
        return (verified_by = undefined);
    if (verifiedBy == 0) {
        verified_by = { not: null };
    }
    else if (verifiedBy == -1) {
        verified_by = null;
    }
    else {
        verified_by = verifiedBy;
    }
    return verified_by;
};
exports.default = verificationFiltering;
