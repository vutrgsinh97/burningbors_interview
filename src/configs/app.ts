export const appConfig = {
  name: "interview_burningbors",
  ACCESS_TOKEN_KEY: "accessToken",
  REFRESH_TOKEN_KEY: "refreshToken",
};

export const apiConfig = {
  endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT ?? "",
  ACCESS_TOKEN_KEY: appConfig.ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY: appConfig.REFRESH_TOKEN_KEY,
};

export const staticURL = {
  login: "/login",
  product: "/product?limit=20&q=",
  cart: "/cart",
  checkout: "/checkout",
  afterCheckout: "/afterCheckout"
};
