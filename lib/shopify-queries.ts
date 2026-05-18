import { storefront } from './shopify-client';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  selectedOptions: ShopifySelectedOption[];
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  images: { nodes: ShopifyImage[] };
  variants: { nodes: ShopifyVariant[] };
  collections: { nodes: ShopifyCollection[] };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    selectedOptions: ShopifySelectedOption[];
    product: {
      title: string;
      images: { nodes: ShopifyImage[] };
    };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: { nodes: CartLine[] };
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
}

export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
}

// ─── Fragments ────────────────────────────────────────────────────────────────

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  productType
  tags
  priceRange {
    minVariantPrice { amount currencyCode }
  }
  images(first: 5) {
    nodes { url altText }
  }
  variants(first: 10) {
    nodes {
      id
      title
      availableForSale
      price { amount currencyCode }
      selectedOptions { name value }
    }
  }
  collections(first: 3) {
    nodes { id title handle }
  }
`;

const CART_FIELDS = `
  id
  checkoutUrl
  lines(first: 50) {
    nodes {
      id
      quantity
      merchandise {
        ... on ProductVariant {
          id
          title
          price { amount currencyCode }
          selectedOptions { name value }
          product {
            title
            images(first: 1) { nodes { url altText } }
          }
        }
      }
    }
  }
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
`;

// ─── Queries ──────────────────────────────────────────────────────────────────

const GET_ALL_PRODUCTS = `
  query GetAllProducts($first: Int!) {
    products(first: $first) {
      nodes { ${PRODUCT_FIELDS} }
    }
  }
`;

const GET_PRODUCTS_BY_COLLECTION = `
  query GetProductsByCollection($id: ID!, $first: Int!) {
    collection(id: $id) {
      products(first: $first) {
        nodes { ${PRODUCT_FIELDS} }
      }
    }
  }
`;

const GET_CART = `
  query GetCart($id: ID!) {
    cart(id: $id) { ${CART_FIELDS} }
  }
`;

// ─── Mutations ────────────────────────────────────────────────────────────────

const CREATE_CART = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

const ADD_LINES_TO_CART = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

const REMOVE_LINES_FROM_CART = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

const UPDATE_CART_LINES = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

// ─── Functions ────────────────────────────────────────────────────────────────

function assertNoErrors(errors: { message?: string } | undefined) {
  if (errors?.message) throw new Error(errors.message);
}

export async function getAllProducts(): Promise<ShopifyProduct[]> {
  const { data, errors } = await storefront.request<{
    products: { nodes: ShopifyProduct[] };
  }>(GET_ALL_PRODUCTS, { variables: { first: 50 } });
  assertNoErrors(errors);
  return data?.products.nodes ?? [];
}

export async function getProductsByCollection(collectionId: string): Promise<ShopifyProduct[]> {
  const { data, errors } = await storefront.request<{
    collection: { products: { nodes: ShopifyProduct[] } } | null;
  }>(GET_PRODUCTS_BY_COLLECTION, { variables: { id: collectionId, first: 50 } });
  assertNoErrors(errors);
  return data?.collection?.products.nodes ?? [];
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const { data, errors } = await storefront.request<{
    cart: Cart | null;
  }>(GET_CART, { variables: { id: cartId } });
  assertNoErrors(errors);
  return data?.cart ?? null;
}

export async function createCart(lines: CartLineInput[]): Promise<Cart> {
  const { data, errors } = await storefront.request<{
    cartCreate: { cart: Cart; userErrors: { field: string; message: string }[] };
  }>(CREATE_CART, { variables: { input: { lines } } });
  assertNoErrors(errors);
  if (data?.cartCreate.userErrors.length) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }
  return data!.cartCreate.cart;
}

export async function addLinesToCart(cartId: string, lines: CartLineInput[]): Promise<Cart> {
  const { data, errors } = await storefront.request<{
    cartLinesAdd: { cart: Cart; userErrors: { field: string; message: string }[] };
  }>(ADD_LINES_TO_CART, { variables: { cartId, lines } });
  assertNoErrors(errors);
  if (data?.cartLinesAdd.userErrors.length) {
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  }
  return data!.cartLinesAdd.cart;
}

export async function removeLinesFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const { data, errors } = await storefront.request<{
    cartLinesRemove: { cart: Cart; userErrors: { field: string; message: string }[] };
  }>(REMOVE_LINES_FROM_CART, { variables: { cartId, lineIds } });
  assertNoErrors(errors);
  if (data?.cartLinesRemove.userErrors.length) {
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  }
  return data!.cartLinesRemove.cart;
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart> {
  const { data, errors } = await storefront.request<{
    cartLinesUpdate: { cart: Cart; userErrors: { field: string; message: string }[] };
  }>(UPDATE_CART_LINES, { variables: { cartId, lines } });
  assertNoErrors(errors);
  if (data?.cartLinesUpdate.userErrors.length) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message);
  }
  return data!.cartLinesUpdate.cart;
}
