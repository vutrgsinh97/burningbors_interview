import instancePrivacy from "../instancePrivacy";

const url = "/users";

export const userAPI = {
  keyGetDetail: `GET ${url}`,
  getDetail(userId: number) {
    return instancePrivacy.get<TUserDetail>(`${url}/${userId}`);
  },
};
