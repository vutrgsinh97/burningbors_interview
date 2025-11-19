import instancePrivacy from "../instancePrivacy";


const url = "/carts";

export const cartAPI = {
  keyGetCartByUser: `GET ${url}/userId`,
  getCartByUser(userId: number) {
    return instancePrivacy.get<TCartResponse>(`${url}/user/${userId}`);
  },
};
