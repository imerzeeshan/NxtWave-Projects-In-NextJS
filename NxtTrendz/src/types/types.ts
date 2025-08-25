export type Product = {
  title: string;
  brand: string;
  price: number;
  _id: string;
  image: { url: string; thumbnailUrl: string; fileId: string };
  rating: string;
  category: string;
};
