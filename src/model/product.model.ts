export type TProduct = {
  id: string;
  description: string;
  media: {
    url: string;
  }[];
  name: string;
  productLinks: {
    type: string;
    url: string;
  }[];
  tagline: string;
  thumbnail: {
    url: string;
  };
  url: string;
  votesCount: number;
};

export type TProductsContext = { items: TProduct[]; loading: boolean };
