import queryString from "query-string";
import instancePublish from "../instancePublic";

const url = "/products";

export const productAPI = {
  keyGetList: `GET ${url}`,
  getList(params: TBaseParam) {
    return instancePublish.get<ProductsResponse>(`${url}?${queryString.stringify(params)}`);
  },

  keySearch: `GET ${url}`,
  getBySearch(params: TBaseParam) {
    return instancePublish.get<ProductsResponse>(`${url}/search?${queryString.stringify(params)}`);
  },
};
