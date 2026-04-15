function normalizeArticleUrl(href) {
  if (!href) {
    return null;
  }

  const absoluteUrl = new URL(href, "https://www.bbc.co.uk").href;
  const url = new URL(absoluteUrl);

  if (!url.href.includes("/sport/") || !url.href.includes("/articles/")) {
    return null;
  }

  url.hash = "";
  return url.href;
}

// async function findArticleWithComments(page) {
//   await page.goto("https://www.bbc.co.uk/sport", {
//     waitUntil: "domcontentloaded"
//   });
//   await page.waitForLoadState("networkidle");

//   const allArticleHrefs = await page.$$eval("a[href]", (anchors) => {
//     const normalized = anchors
//       .map((anchor) => anchor.getAttribute("href"))
//       .filter(Boolean)
//       .map((href) => {
//         try {
//           const absoluteUrl = new URL(href, "https://www.bbc.co.uk").href;
//           const url = new URL(absoluteUrl);

//           if (!url.href.includes("/sport/") || !url.href.includes("/articles/")) {
//             return null;
//           }

//           url.hash = "";
//           return url.href;
//         } catch (error) {
//           return null;
//         }
//       })
//       .filter(Boolean);

//     return [...new Set(normalized)];
//   });

//   if (!allArticleHrefs.length) {
//     throw new Error("No BBC Sport article links containing '/sport/' and '/articles/' were found.");
//   }

//   const articleUrl = allArticleHrefs[Math.floor(Math.random() * allArticleHrefs.length)];
//   console.log(`[findArticleWithComments] selected articleUrl: ${articleUrl}`);

//   const matchingHrefs = await page.$$eval(
//     "a[href]",
//     (anchors, selectedArticleUrl) => {
//       const hrefs = anchors
//         .map((anchor) => anchor.getAttribute("href"))
//         .filter(Boolean)
//         .map((href) => {
//           try {
//             return new URL(href, "https://www.bbc.co.uk").href;
//           } catch (error) {
//             return null;
//           }
//         })
//         .filter(Boolean)
//         .filter((href) => href === selectedArticleUrl || href.startsWith(`${selectedArticleUrl}#`));

//       return [...new Set(hrefs)];
//     },
//     articleUrl
//   );

//   console.log(`[findArticleWithComments] number of matching hrefs: ${matchingHrefs.length}`);

//   if (matchingHrefs.length > 1) {
//     const commentsUrl = matchingHrefs.find((href) => href.includes("#comments")) || null;
//     const hasComments = Boolean(commentsUrl);

//     console.log(`[findArticleWithComments] comments found: ${hasComments}`);

//     return {
//       articleUrl,
//       hasComments,
//       commentsUrl
//     };
//   }

//   console.log("[findArticleWithComments] comments found: false");

//   return {
//     articleUrl,
//     hasComments: false,
//     commentsUrl: null
//   };
// }

async function findArticleWithComments(page) {
    await page.goto("https://www.bbc.com", {
    waitUntil: "domcontentloaded"
  });

  await page.waitForTimeout(3000);
  
  await page.goto("https://www.bbc.com/sport", {
    waitUntil: "domcontentloaded"
  });

  await page.waitForSelector('a[href*="/sport/"][href*="/articles/"]');
  await page.waitForTimeout(3000);

  const links = page.locator('a[href*="/sport/"][href*="/articles/"]');
  const count = await links.count();
  console.log(`Article without comments found: ${count}`);
  const hrefs = [];
  var articleUrlWithComments = null;

  for (let i = 0; i < count; i++) {
    try {
      const href = await links.nth(i).getAttribute("href");

      if (!href) {
        continue;
      }

      const absoluteHref = new URL(href, "https://www.bbc.co.uk").href;

      if (
        absoluteHref.includes("/sport/") &&
        absoluteHref.includes("/articles/")
      ) {
        hrefs.push(absoluteHref);
      }
    } catch {
      // Ignore links removed during BBC page re-render
    }
  }

  const uniqueHrefs = [...new Set(hrefs)];

  for (const href of uniqueHrefs) {
    // Ignore the "#comments" anchor itself
    if (href.endsWith("#comments")) {
      continue;
    }

    // Article has comments if both versions exist:
    // /article/xyz
    // /article/xyz#comments
    const relatedLinks = uniqueHrefs.filter(
      currentHref =>
        currentHref === href ||
        currentHref === `${href}#comments`
    );

    // If only one version exists, then this article has no comments
    if (relatedLinks.length > 1) {
      console.log(`Article with comments found: ${href}`);
      articleUrlWithComments = href;
      break;
    }
  }

  if (articleUrlWithComments) {
    return articleUrlWithComments;
  }

  throw new Error("No article with comments found.");
}

async function findArticleWithoutComments(page) {
    await page.goto("https://www.bbc.co.uk", {
    waitUntil: "domcontentloaded"
  });

  await page.waitForTimeout(3000);
  
  await page.goto("https://www.bbc.co.uk/sport", {
    waitUntil: "domcontentloaded"
  });

  await page.waitForSelector('a[href*="/sport/"][href*="/articles/"]');
  await page.waitForTimeout(3000);

  const links = page.locator('a[href*="/sport/"][href*="/articles/"]');
  const count = await links.count();
  console.log(`Article without comments found: ${count}`);
  const hrefs = [];
  var articleUrlWithoutComments = null;

  for (let i = 0; i < count; i++) {
    try {
      const href = await links.nth(i).getAttribute("href");

      if (!href) {
        continue;
      }

      const absoluteHref = new URL(href, "https://www.bbc.co.uk").href;

      if (
        absoluteHref.includes("/sport/") &&
        absoluteHref.includes("/articles/")
      ) {
        hrefs.push(absoluteHref);
      }
    } catch {
      // Ignore links removed during BBC page re-render
    }
  }

  const uniqueHrefs = [...new Set(hrefs)];

  for (const href of uniqueHrefs) {
    // Ignore the "#comments" anchor itself
    if (href.endsWith("#comments")) {
      continue;
    }

    // Article has comments if both versions exist:
    // /article/xyz
    // /article/xyz#comments
    const relatedLinks = uniqueHrefs.filter(
      currentHref =>
        currentHref === href ||
        currentHref === `${href}#comments`
    );

    // If only one version exists, then this article has no comments
    if (relatedLinks.length === 1) {
      console.log(`Article without comments found: ${href}`);
      articleUrlWithoutComments = href;
      break;
    }
  }

  if (articleUrlWithoutComments) {
    return articleUrlWithoutComments;
  }

  throw new Error("No article without comments found.");
}

async function findArticleByCommentSupport(page, expectedHasComments, maxAttempts = 12) {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const result = await findArticleWithComments(page);
    console.log(
      `[findArticleWithComments] attempt ${attempt}/${maxAttempts} -> hasComments=${result.hasComments}`
    );

    if (result.hasComments === expectedHasComments) {
      return result;
    }

    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
  }

  throw new Error(
    `Could not find a BBC Sport article where hasComments=${expectedHasComments} after ${maxAttempts} attempts.`
  );
}

module.exports = {
  findArticleWithComments,
  findArticleWithoutComments,
  findArticleByCommentSupport,
  normalizeArticleUrl
};
