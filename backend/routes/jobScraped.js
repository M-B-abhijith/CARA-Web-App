const express = require("express");
const puppeteer = require("puppeteer");

const router = express.Router();

router.get("/google-jobs", async (req, res) => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        await page.goto("https://www.google.com/search?q=software+developer+jobs");

        const jobs = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".BjJfJf")).map(job => ({
                title: job.querySelector(".BjJfJf")?.innerText || "N/A",
                company: job.querySelector(".vNEEBe")?.innerText || "N/A",
                location: job.querySelector(".Qk80Jf")?.innerText || "N/A",
                link: job.querySelector("a")?.href || "N/A"
            }));
        });

        await browser.close();
        res.json({ jobs });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch Google Jobs" });
    }
});

// Export
module.exports = router;
