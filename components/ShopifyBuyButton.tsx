"use client";
import { useEffect, useRef } from "react";
import Script from "next/script";

// ── Minimal global types for the Shopify Buy Button SDK ───────────────
declare global {
  interface Window {
    ShopifyBuy?: {
      buildClient(config: { domain: string; storefrontAccessToken: string }): unknown;
      UI: {
        onReady(client: unknown): Promise<{
          createComponent(type: string, options: Record<string, unknown>): void;
        }>;
      };
    };
  }
}

const NODE_ID = "product-component-1778606539598";

const SHOPIFY_OPTIONS: Record<string, unknown> = {
  product: {
    styles: {
      product: {
        "@media (min-width: 601px)": {
          "max-width": "calc(25% - 20px)",
          "margin-left": "20px",
          "margin-bottom": "50px",
        },
      },
      button: {
        ":hover": { "background-color": "#e50000" },
        "background-color": "#fe0000",
        ":focus": { "background-color": "#e50000" },
        "border-radius": "6px",
        "padding-left": "26px",
        "padding-right": "26px",
      },
    },
    text: { button: "Ajouter au panier" },
  },
  productSet: {
    styles: {
      products: {
        "@media (min-width: 601px)": { "margin-left": "-20px" },
      },
    },
  },
  modalProduct: {
    contents: { img: false, imgWithCarousel: true, button: false, buttonWithQuantity: true },
    styles: {
      product: {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0px",
          "margin-bottom": "0px",
        },
      },
      button: {
        ":hover": { "background-color": "#e50000" },
        "background-color": "#fe0000",
        ":focus": { "background-color": "#e50000" },
        "border-radius": "6px",
        "padding-left": "26px",
        "padding-right": "26px",
      },
    },
    text: { button: "Add to cart" },
  },
  option: {},
  cart: {
    styles: {
      button: {
        ":hover": { "background-color": "#e50000" },
        "background-color": "#fe0000",
        ":focus": { "background-color": "#e50000" },
        "border-radius": "6px",
      },
    },
    text: { total: "Subtotal", button: "Checkout" },
  },
  toggle: {
    styles: {
      toggle: {
        "background-color": "#fe0000",
        ":hover": { "background-color": "#e50000" },
        ":focus": { "background-color": "#e50000" },
      },
    },
  },
};

export default function ShopifyBuyButton() {
  const initialized = useRef(false);

  function tryInit() {
    if (initialized.current || !window.ShopifyBuy?.UI) return;
    initialized.current = true;

    const client = window.ShopifyBuy.buildClient({
      domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
      storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
    });

    window.ShopifyBuy.UI.onReady(client).then((ui) => {
      const node = document.getElementById(NODE_ID);
      if (!node) return;
      ui.createComponent("product", {
        id: "15477297283447",
        node,
        moneyFormat: "%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D",
        options: SHOPIFY_OPTIONS,
      });
    });
  }

  useEffect(() => {
    // Script may already be cached and loaded — try immediately
    tryInit();
    return () => {
      // Reset on unmount so Strict Mode double-mount re-initialises cleanly
      initialized.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Script
        src="https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js"
        strategy="afterInteractive"
        onLoad={tryInit}
      />
      <div id={NODE_ID} />
    </>
  );
}
