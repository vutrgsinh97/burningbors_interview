import instancePublish from "../instancePublic";

const url = "/auth";

export const authAPI = {
  keyLogin: `POST ${url}`,
  login(data: TLoginForm) {
    return instancePublish.post<TLoginResponse>(`${url}/login`, data, {
      withCredentials: true,
    });
  },
};
