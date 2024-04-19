import _createRecommender from "./recommender/createRecommender";
import _updateRecommender from "./recommender/updateRecommender";
import _deleteRecommender from "./recommender/deleteRecommender";
import _getRecommender from "./recommender/getRecommender";
import _getRecommenders from "./recommender/getRecommenders";

import _createExclusiveJob from "./createExclusiveJob";

import _createRecommendedApplicant from "./recommended_applicants/createRecommendedApplicant";
import _getRecommendedApplicant from "./recommended_applicants/getRecommendedApplicant";
namespace ExclusiveJob {
  export const createRecommender = _createRecommender;
  export const updateRecommender = _updateRecommender;
  export const deleteRecommender = _deleteRecommender;
  export const getRecommender = _getRecommender;
  export const getRecommenders = _getRecommenders;

  export const createExclusiveJob = _createExclusiveJob;

  export const createRecommendedApplicant = _createRecommendedApplicant;
  export const getRecommendedApplicant = _getRecommendedApplicant;
}

export default ExclusiveJob;
