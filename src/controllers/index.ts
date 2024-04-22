import _addAdmin from "./admin/addAdmin";
import _adminLogin from "./admin/adminLogin";
import _getAdmins from "./admin/getAdmins";
import _confirmPassword from "./admin/confirmPassword";
import _adminProfileImgUpload from "./admin/uploadProfileImg";

import _userSignup from "./user/signup";
import _userSignin from "./user/signin";

import _insertJobPost from "./job/createJobPost";
import _getJobPost from "./job/getJobPost";
import _getJobPostById from "./job/getJobPostById";
import _updateJobPost from "./job/updateJobPost";
import _deleteJobPost from "./job/deleteJobPost";

import _insertJobCategory from "./job/catagory/createJobCategory";
import _getJobCategory from "./job/catagory/getJobCategory";
import _getJobCategoryById from "./job/catagory/getJobCategoryById";
import _updateJobCategory from "./job/catagory/updateJobCategory";
import _deleteJobCategory from "./job/catagory/deleteJobCategory";

import _createNews from "./news/createNews";
import _getNews from "./news/getNews";
import _getNewsById from "./news/getNewsById";
import _updateNews from "./news/updateNews";
import _deleteNews from "./news/deleteNews";

import _getPostUrl from "./common/getPostUrl";
import _createGrant from "./grant/createGrant";
import _getGrant from "./grant/getGrant";
import _getGrantById from "./grant/getGrantById";
import _updateGrant from "./grant/updateGrant";
import _deleteGrant from "./grant/deleteGrant";

import _createBlog from "./blog/createBlog";
import _getBlog from "./blog/getBlog";
import _getBlogById from "./blog/getBlogById";
import _updateBlog from "./blog/updateBlog";
import _deleteBlog from "./blog/deleteBlog";

import _createSp from "./service_provider/createSp";
// import _getSp from "./service_provider/getSp";
// import _udpateSp from "./service_provider/udpateSp";
// import _deleteSp from "./service_provider/deleteSp";

namespace Controller {
    export const addAdmin = _addAdmin;

    export const adminLogin = _adminLogin;

    export const getAdmins = _getAdmins;

    export const confirmPassword = _confirmPassword;

    export const adminProfileImgUpload = _adminProfileImgUpload;

    // -- User -- //
    export const userSignup = _userSignup;

    export const userSignin = _userSignin;

    // -- Job post -- //
    export const insertJobPost = _insertJobPost;

    export const getJobPost = _getJobPost;

    export const getJobPostById = _getJobPostById;

    export const updateJobPost = _updateJobPost;

    export const deleteJobPost = _deleteJobPost;

    // -- Job category -- //
    export const insertJobCategory = _insertJobCategory;

    export const getJobCategory = _getJobCategory;

    export const getJobCategoryById = _getJobCategoryById;

    export const updateJobCategory = _updateJobCategory;

    export const deleteJobCategory = _deleteJobCategory;
    // -- News -- //
    export const createNews = _createNews;

    export const getNews = _getNews;

    export const getNewsById = _getNewsById;

    export const updateNews = _updateNews;

    export const deleteNews = _deleteNews;

    // -- Grant -- //
    export const createGrant = _createGrant;

    export const getGrant = _getGrant;

    export const getGrantById = _getGrantById;

    export const updateGrant = _updateGrant;

    export const deleteGrant = _deleteGrant;

    // -- Blog -- //
    export const createBlog = _createBlog;

    export const getBlog = _getBlog;

    export const getBlogById = _getBlogById;

    export const updateBlog = _updateBlog;

    export const deleteBlog = _deleteBlog;

    // -- Service Provider -- //

    export const createSp = _createSp;
}

export default Controller;
// get all super admins
// get all admins
// update admin profile
// delete admin
// upload admin profile image, delete it and edit it
// verirfy password
