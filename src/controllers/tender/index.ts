import _createTenderCategory from "./category/createTenderCategory";
import _updateTenderCategory from "./category/updateTenderCategory";
import _deleteTenderCategory from "./category/deleteTenderCategory";
import _getTenderCategory from "./category/getTenderCategory";
import _getAllTenderCategories from "./category/getAllTenderCategories";
import _deleteTender from "./deleteTender";
import _createTender from "./createTender";
import _updateTender from "./updateTender";
import _getTender from "./getTender";
import _getTenders from "./getTenders";
import _searchTenderByKeyWord from "./searchByKeyWord";
import _saveTender from "./saveTender";
import _getSavedTenders from "./getSavedTenders";
namespace Tender {
  // -- Tender category --//
  export const createTenderCategory = _createTenderCategory;

  export const updateTenderCategory = _updateTenderCategory;

  export const deleteTenderCategory = _deleteTenderCategory;

  export const getTenderCategory = _getTenderCategory;

  export const getAllTenderCategories = _getAllTenderCategories;

  // -- Tender --//

  export const createTender = _createTender;

  export const updateTender = _updateTender;

  export const getTender = _getTender;

  export const getTenders = _getTenders;

  export const deleteTender = _deleteTender;

  export const saveTender = _saveTender;

  export const getSavedTenders = _getSavedTenders;

  // -- Seach for keywords --
  export const searchTenderByKeyWord = _searchTenderByKeyWord;
}

export default Tender;
