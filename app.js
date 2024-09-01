import express from "express";
import rssLinks from './feeds.json' assert { type: 'json' };

const app = express();
const port = process.env.PORT || 3000;

// Returns 10 latest RSS feeds
function rssFeed(){
  console.log("hello");
  console.log(rssLinks);
}

app.get("/", (req, res) => {
  res.send("rss-app!");
});

app.listen(port, () => {
  rssFeed();

  console.log(`BN dev assessment app listening on port ${port}`);
});
