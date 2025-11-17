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


// Response for Product
type ProductsResponse = TRestApiCommon<"products", TProduct[]>;
