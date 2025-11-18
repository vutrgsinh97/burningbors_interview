type TRestApiCommon<K extends string, T> = {
  [P in K]: T;
} & {
  total: number;
  skip: number;
  limit: number;
};

type TBaseParam = {
  limit: number;
  skip: number;
  q?: string;
};

type TDummyJWT = {
  iat: number;
  exp: number;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata": string;
};

// Response for Product
type TProductsResponse = TRestApiCommon<"products", TProduct[]>;
type TLoginResponse = TUser & {
  accessToken?: string;
  refreshToken?: string;
};
type TCartResponse = TRestApiCommon<"carts", TCart[]>;