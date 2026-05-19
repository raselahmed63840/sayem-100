import { useEffect } from "react";

const SEO = ({
  title = "Nurnobi Bamboo Craft | Eco-Friendly Handmade Bamboo Products",
  description = "Nurnobi Bamboo Craft is a Bangladesh-based eco-friendly handmade bamboo craft brand, manufacturer, exporter, wholesaler and supplier.",
}) => {
  useEffect(() => {
    document.title = title;

    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }

    metaDescription.content = description;
  }, [title, description]);

  return null;
};

export default SEO;
