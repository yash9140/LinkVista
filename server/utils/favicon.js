const getFavicon = require('get-website-favicon');

exports.getFavicon = async function(url) {
  try {
    const hostname = new URL(url).hostname;
    const data = await getFavicon(hostname);
    // data.icons is array of { src, sizes, type }
    if (data && data.icons && data.icons.length) {
      // prefer icons with src beginning with http
      const found = data.icons.find(i => i.src && i.src.startsWith('http')) || data.icons[0];
      return found.src;
    }
  } catch (err) {
    // ignore
  }
  return '';
};
