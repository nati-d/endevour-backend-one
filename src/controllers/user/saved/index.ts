import _saveJob from "./job/add";
import _deleteJob from "./job/remove";
import _getJob from "./job/get";

import _saveNews from "./news/add";
import _deleteNews from "./news/remove";
import _getNews from "./news/get";

import _saveBlog from "./blog/add";
import _deleteBlog from "./blog/remove";
import _getBlog from "./blog/get";

import _saveGrant from "./grant/add";
import _deleteGrant from "./grant/remove";
import _getGrant from "./grant/get";

import _saveTender from "./tender/add";
import _deleteTender from "./tender/remove";
import _getTender from "./tender/get";

import _saveOrganization from "./organization/add";
import _deleteOrganization from "./organization/remove";
import _getOrganization from "./organization/get";

import _saveServiceProvider from "./service_provider/add";
import _deleteServiceProvider from "./service_provider/remove";
import _getServiceProvider from "./service_provider/get";

namespace Saved {
    export const saveJob = _saveJob;

    export const deleteJob = _deleteJob;

    export const getJob = _getJob;

// -- -- news -- -- //
    export const saveNews = _saveNews;

    export const deleteNews = _deleteNews;

    export const getNews = _getNews;

// -- -- blog -- -- //
    export const saveBlog = _saveBlog;

    export const deleteBlog = _deleteBlog;

    export const getBlog = _getBlog;

// -- -- grant -- -- //
    export const saveGrant = _saveGrant;

    export const deleteGrant = _deleteGrant;

    export const getGrant = _getGrant;

// -- -- Tender -- -- //
    export const saveTender = _saveTender;

    export const deleteTender = _deleteTender;

    export const getTender = _getTender;

// -- -- Organization -- -- //
    export const saveOrganization = _saveOrganization;

    export const deleteOrganization = _deleteOrganization;

    export const getOrganization = _getOrganization;

// -- -- Service Provider -- -- //
    export const saveServiceProvider = _saveServiceProvider;

    export const deleteServiceProvider = _deleteServiceProvider;

    export const getServiceProvider = _getServiceProvider;
}

export default Saved;
