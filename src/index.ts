import express from 'express';
import { chromium } from 'playwright';

const app = express();

app.get('/scrape', async (req, res) => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://shop.asfinag.at/en/vehicle-type-selection/?source=Vignette');
    const title = await page.title();
    await browser.close();

    res.json({ title });
  } catch (err: any) {
    await browser.close();
    res.status(500).json({ error: err.message });
  }
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
