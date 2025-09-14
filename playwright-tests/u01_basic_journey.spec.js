const { test, expect } = require('@playwright/test')

test('UAT: basic browse-add-checkout journey', async ({ page }) => {
  // Adjust base URL if needed; expects frontend dev server at http://localhost:5173
  const base = process.env.FRONTEND_BASE || 'http://localhost:5173'
  await page.goto(base)
  await expect(page).toHaveTitle(/Home|Shop|Solemate/i)

  // Search (if search bar present)
  const search = await page.$('input[placeholder="Search"]')
  if (search) {
    await search.fill('shoe')
    await page.keyboard.press('Enter')
    await page.waitForTimeout(500)
  }

  // Click first product card if present
  const prod = await page.$('main .product-card, .ProductCard, .product')
  if (prod) {
    await prod.click()
    await page.waitForTimeout(300)
  }

  // Add to cart (best-effort selectors)
  const add = await page.$('button:has-text("Add to cart"), button.add-to-cart')
  if (add) await add.click()

  // Go to cart and attempt checkout
  await page.goto(`${base}/cart`)
  await page.waitForTimeout(300)
  const checkout = await page.$('a:has-text("Checkout"), button:has-text("Checkout")')
  if (checkout) await checkout.click()

  // We expect to land on a checkout page (URL contains checkout)
  await expect(page).toHaveURL(/checkout/)
})
