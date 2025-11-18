import instancePublish from "../instancePublic";

const url = "/carts";

export const cartAPI = {
  keyGetCartByUser: `GET ${url}/userId`,
  getCartByUser(userId: number) {
    return instancePublish.get<TCartResponse>(`${url}/user/${userId}`);
  },
};
