import express from "express";
import fs from "fs";
import path from "path";
import xml2js from "xml2js";

// Initialize an Express application
const app = express();

// Use env variable, otherwise 3000
const port = process.env.PORT || 3000;

// Read feeds.json and return the feed URLs
function getFeeds(){

  // Resolve the path to feeds.json relative to current directory
  const feedsPath = path.resolve("feeds.json");     

  // Read the contents of file as UTF-8 encoded
  const data = fs.readFileSync(feedsPath, "utf8");

  // Parse string into a Javascript object
  const feeds = JSON.parse(data);

  // Returns the array of feed URLs
  return feeds.feeds;
}

// Fetch and parse the RSS feeds
async function rssFeed(){

  // Get array of feed URLs
  const feeds = getFeeds();

  // Initialize an XML parser to parse the RSS feeds
  const parser = new xml2js.Parser();

  // Create an array of Promises, each fetching and parsing an RSS feed URL
  const fetchPromises = feeds.map(async (url) => {

    // Fetch the content of the RSS feed from the URL
    const response = await fetch(url);

    // Convert response to a text string
    const text = await response.text();

    // Parse the XML text string into a javascript object
    const result = await parser.parseStringPromise(text);

    // Return the array of items (articles) from the parsed RSS feed
    return result.rss.channel[0].item;
    });


  // Wait for all the Promises to resolve, feeds fetched and parsed
  const results = await Promise.all(fetchPromises);

  // Flatten the results (array of arrays) into a single array
  const allItems = results.flat();

  // Create a map to track unique items
  const uniqueArticles = new Map();

  allItems.forEach((item) => {
    const uniqueKey = item.title[0];

    // If uniqueKey does not already exist in map, add it
    if (uniqueKey && !uniqueArticles.has(uniqueKey)) {

      // Remove all but title, link
      const newItem = {
        "title": item.title[0],
        "link": item.link[0]
      }

      uniqueArticles.set(uniqueKey, newItem);
    }
  })

  // Convert the map back to an array of items
  const uniqueItems = Array.from(uniqueArticles.values());

  // Sort all items by publication dat in desc order
  uniqueItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));



  // return the 10 latest articles
  return uniqueItems.slice(0, 10);
}

app.get("/", async (req, res) => {
  const latestFeeds = await rssFeed();
  res.json(latestFeeds);
});

app.listen(port, () => {

  console.log(`App listening on port ${port}`);
});


