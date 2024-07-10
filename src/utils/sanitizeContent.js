import sanitizeHtml from "sanitize-html";
export const sanitize = (content) => {
  const sanitizedContent = sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title", "width", "height"],
    },
  });
  return sanitizedContent;
};
