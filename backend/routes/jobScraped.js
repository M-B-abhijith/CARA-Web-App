const express = require("express");
const puppeteer = require("puppeteer");

const router = express.Router();

router.get("/timesjobs-jobs", async (req, res) => {
    console.log("TimesJobs-jobs route hit!");
    let browser;
    try {
        const searchQuery = req.query.q || "Application Developer";
        const url = `https://m.timesjobs.com/mobile/jobs-search-result.html?txtKeywords=${encodeURIComponent(searchQuery)}&cboWorkExp1=-1&txtLocation=`;
        console.log("Fetching URL:", url);

        // Launch browser with anti-detection
        browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-blink-features=AutomationControlled"],
        });
        const page = await browser.newPage();

        // Spoof User-Agent and disable WebDriver detection
        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
        );
        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, "webdriver", { get: () => false });
        });
        await page.setViewport({ width: 1280, height: 800 });

        // Navigate to page
        await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
        console.log("Page loaded");

        // Wait for job listings
        try {
            await page.waitForSelector("div.srp-listing", { timeout: 10000 });
        } catch (e) {
            console.log("Selector `div.srp-listing` not found. Dumping page content for debugging...");
            const html = await page.content();
            console.log(html.substring(0, 500));
            throw new Error("Job listings selector not found. Check TimesJobs' current HTML structure.");
        }

        // Extract jobs
        const jobs = await page.evaluate(() => {
            const jobListings = [];
            document.querySelectorAll("div.srp-listing").forEach((element) => {
                const title = element.querySelector("h3 a.ui-link")?.innerText.trim() || "N/A";
                const company = element.querySelector("span.srp-comp-name")?.innerText.trim() || "N/A";
                const location = element.querySelector("div.srp-loc")?.innerText.trim() || "N/A";
                const salary = element.querySelector("div.srp-sal")?.innerText.trim() || "";
                const date = element.querySelector("span.posting-time")?.innerText.trim() || "N/A";
                const link = element.querySelector("h3 a.ui-link")?.href || "#";
                const experience = element.querySelector("div.srp-exp")?.innerText.trim() || "N/A";

                if (title !== "N/A") {
                    jobListings.push({ title, company, location, salary, date, link, experience });
                }
            });
            return jobListings;
        });
        console.log("Jobs found:", jobs.length);

        res.json({ jobs });
    } catch (error) {
        console.error("Scraping error:", error.message);
        res.status(500).json({ error: "Failed to fetch jobs", details: error.message });
    } finally {
        if (browser) await browser.close();
    }
});

module.exports = router;