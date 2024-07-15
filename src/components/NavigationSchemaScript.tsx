import React from "react";
import Script from "next/script";
import { navigationSchemaItems } from '@/constants';


const navigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: navigationSchemaItems,
};

const NavigationSchemaScript = () => {
  return (
    <Script
      id="navigation-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
    />
  );
};

export default NavigationSchemaScript;
