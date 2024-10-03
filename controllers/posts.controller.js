const { postsService } = require("../services/services");
const apiResponse = require("../utils/apiResponse");

const getListDataPosts = async (req, res) => {
  try {
    const listDataPost = await postsService.getListPost();

    return apiResponse.successResponseWithData(
      res,
      "Successfully",
      listDataPost
    );
  } catch (e) {
    return apiResponse.errorResponse(res, e.message);
  }
};

module.exports = {
  getListDataPosts,
};
