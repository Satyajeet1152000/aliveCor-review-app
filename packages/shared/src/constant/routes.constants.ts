export enum Routes {
  HOME = "/",
  PRODUCTS = "/products",
}

export const HEADER_NAV_ITEMS: { href: string; label: string }[] = [
  { href: Routes.HOME, label: "Reviews" },
  { href: Routes.PRODUCTS, label: "Products" },
];
