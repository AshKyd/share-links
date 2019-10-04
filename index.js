const providers = {
  Facebook: "https://www.facebook.com/sharer.php?u={url}",
  Twitter:
    "https://twitter.com/intent/tweet?text={title}%20{url}&via={twitter}",
  Tumblr:
    "https://www.tumblr.com/share/link?url={url}&name={title}&description={description}",
  LinkedIn:
    "https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={description}",
  Reddit: "https://www.reddit.com/submit?url={url}&title={title}",
  StumbleUpon: "https://www.stumbleupon.com/submit?url={url}&title={title}",
  Digg:
    "https://digg.com/tools/diggthis/confirm?url={url}&title={title}&related=true&style=true",
  WhatsApp: function() {
    return global.innerWidth > 1024
      ? "https://web.whatsapp.com/send?text={title}%20{url}"
      : "whatsapp://send?text={title}%20{url}";
  },

  Email: "mailto:?subject={title}&body={title}:%20{url}",
  Pocket: "https://getpocket.com/edit?url={url}",
  Instapaper: "https://www.instapaper.com/text?u={url}",
  Evernote: "https://www.evernote.com/clip.action?url={url}&title={title}"
};

module.exports = function(provider, options) {
  const templateSrc = providers[provider];
  const template =
    typeof templateSrc === "function" ? templateSrc() : templateSrc;
  if (!template) throw new Error("Provider " + provider + " not supported");

  // Get some default keys
  const stringsToReplace = {
    title: global.title,
    url: String(global.location)
  };

  // Apply the specified options
  Object.keys(options || {}).forEach(function(key) {
    stringsToReplace[key] = options[key];
  });

  return template.replace(/\{(\w+)\}/g, function(match, key) {
    return encodeURIComponent(stringsToReplace[key] || "");
  });
};
