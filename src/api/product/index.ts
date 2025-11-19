import queryString from "query-string";
import instancePublish from "../instancePublic";

const url = "/products";
const selectStr = "title,category,rating,reviews,description,price,discountPercentage,thumbnail"

export const productAPI = {
  keyGetList: `GET ${url}`,
  getList(params: TBaseParam) {
    return instancePublish.get<TProductsResponse>(`${url}?${queryString.stringify(params)}&select=${selectStr}`);
  },

  keySearch: `GET ${url}`,
  getBySearch(params: TBaseParam) {
    return instancePublish.get<TProductsResponse>(`${url}/search?${queryString.stringify(params)}&select=${selectStr}`);
  },
};
