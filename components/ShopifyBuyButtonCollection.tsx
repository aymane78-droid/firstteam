"use client";
import { useEffect, useId, useRef } from "react";
import Script from "next/script";

const SCRIPT_SRC =
  "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

const OPTIONS: Record<string, unknown> = {
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
    layout: "horizontal",
  },
  productSet: {
    styles: {
      products: {
        "@media (min-width: 601px)": { "margin-left": "-20px" },
      },
    },
  },
  cart: {
    styles: {
      button: {
        ":hover": { "background-color": "#e50000" },
        "background-color": "#fe0000",
        ":focus": { "background-color": "#e50000" },
        "border-radius": "6px",
      },
    },
    text: {
      total: "Sous-total",
      button: "Commander",
      notice: "Frais de port calculés à la commande.",
    },
    popup: false,
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

interface Props {
  collectionId: string;
  componentId?: string;
}

export default function ShopifyBuyButtonCollection({ collectionId, componentId }: Props) {
  const reactId = useId();
  const nodeId = componentId ?? `shopify-col-${reactId.replace(/:/g, "")}`;
  const initialized = useRef(false);

  function tryInit() {
    if (initialized.current || !window.ShopifyBuy?.UI) return;
    const node = document.getElementById(nodeId);
    if (!node) return;
    initialized.current = true;

    const client = window.ShopifyBuy.buildClient({
      domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
      storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
    });

    window.ShopifyBuy.UI.onReady(client).then((ui) => {
      ui.createComponent("collection", {
        id: collectionId,
        node,
        moneyFormat: "%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D",
        options: OPTIONS,
      });
    });
  }

  useEffect(() => {
    tryInit();
    return () => {
      initialized.current = false;
      const node = document.getElementById(nodeId);
      if (node) node.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionId, nodeId]);

  return (
    <>
      <Script src={SCRIPT_SRC} strategy="afterInteractive" onLoad={tryInit} />
      <div id={nodeId} />
    </>
  );
}
