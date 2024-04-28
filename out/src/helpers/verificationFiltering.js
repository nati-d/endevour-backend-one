"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verificationFiltering = (verifiedBy) => {
    let filtering = {};
    if (!verifiedBy)
        return (filtering = { verified_by: undefined });
    if (verifiedBy == 0) {
        filtering = {
            verified_by: { not: null },
        };
    }
    else if (verifiedBy == -1) {
        filtering = {
            verified_by: null,
        };
    }
    else {
        filtering = { verified_by: verifiedBy };
    }
    return filtering;
};
exports.default = verificationFiltering;
