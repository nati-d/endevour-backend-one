import _createRecommender from "./recommender/createRecommender";
import _updateRecommender from "./recommender/updateRecommender";
import _deleteRecommender from "./recommender/deleteRecommender";
import _getRecommender from "./recommender/getRecommender";
import _getRecommenders from "./recommender/getRecommenders";

import _createExclusiveJob from "./createExclusiveJob";
import _getExclusiveJob from "./getExclusiveJob";
import _getExclusiveJobs from "./getExclusiveJobs";
import _deleteExclusiveJob from "./deleteExclusiveJob";
import _updateExclusiveJob from "./updateExclusiveJob";

import _createRecommendedApplicant from "./recommended_applicants/createRecommendedApplicant";
import _getRecommendedApplicant from "./recommended_applicants/getRecommendedApplicant";
import _getRecommendedApplicants from "./recommended_applicants/getRecommendedApplicants";
import _acceptDeclineApplicant from "./recommended_applicants/acceptDeclineApplicant";
import _sendEmailForRecommenders from "./sendEmailForRecommenders";
namespace ExclusiveJob {
  export const createRecommender = _createRecommender;
  export const updateRecommender = _updateRecommender;
  export const deleteRecommender = _deleteRecommender;
  export const getRecommender = _getRecommender;
  export const getRecommenders = _getRecommenders;

  export const createExclusiveJob = _createExclusiveJob;
  export const getExclusiveJob = _getExclusiveJob;
  export const getExclusiveJobs = _getExclusiveJobs;
  export const updateExclusiveJob = _updateExclusiveJob;
  export const deleteExclusiveJob = _deleteExclusiveJob;
  export const sendEmailForRecommenders = _sendEmailForRecommenders;

  export const createRecommendedApplicant = _createRecommendedApplicant;
  export const getRecommendedApplicant = _getRecommendedApplicant;
  export const getRecommendedApplicants = _getRecommendedApplicants;
  export const acceptDeclineApplicant = _acceptDeclineApplicant;
}

export default ExclusiveJob;
