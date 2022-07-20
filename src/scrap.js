const cheerio = require('cheerio');
const fetch = require('node-fetch');

function getData(html) {
  const items = [];
  const $ = cheerio.load(html);

  $('.contenu_annonce', html).each(function () {
    const item = {
      title: $(this).children('h3').text(),
      company: $(this).children('h4').text(),
      contract: $(this).children('h5').text(),
      description: $(this).children('a.description').text().trim()
    };
    items.push(item);
  });
  return items;
}

async function fetchData(url) {
  const response = await fetch(url);
  const pagehtml = await response.text();
  const data = await getData(pagehtml);
  // console.log(data);
  return data;
}

module.exports = fetchData;
