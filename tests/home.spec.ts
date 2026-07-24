import { test, expect } from '@playwright/test';

test.describe('homepage', () => {
  test('loads with the right document metadata', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Keegan Jones/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /keegs\.co/
    );
  });

  test('renders the hero identity', async ({ page }) => {
    await page.goto('/');
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Keegan');
    await expect(h1).toContainText('Jones');
  });

  test('has working primary navigation', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation');
    await expect(nav.getByRole('link', { name: 'Work' })).toHaveAttribute(
      'href',
      '#work'
    );
    await expect(nav.getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '#contact'
    );
  });

  test('lists the curated projects, matching the printed count', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: 'Selected Work' })
    ).toBeVisible();

    const rows = page.getByTestId('project-row');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);

    // The "[ NN ]" marker must agree with the number of rows actually rendered.
    const printed = await page
      .getByTestId('project-count')
      .getAttribute('data-count');
    expect(Number(printed)).toBe(rowCount);
  });

  test('every project row that links out has a valid, safe href', async ({
    page,
  }) => {
    await page.goto('/');
    const links = page.locator('a[data-testid="project-row"]');
    const count = await links.count();

    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const href = await link.getAttribute('href');
      expect(href, 'project link should have an href').toBeTruthy();
      expect(href).toMatch(/^https?:\/\//);
      // External links must not leak the referrer or opener.
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
    }
  });

  test('exposes real contact links', async ({ page }) => {
    await page.goto('/');
    const contact = page.locator('#contact');
    await expect(contact).toBeVisible();

    // At least one email link and one GitHub link.
    await expect(contact.locator('a[href^="mailto:"]')).toHaveCount(1);
    await expect(
      contact.locator('a[href*="github.com"]')
    ).not.toHaveCount(0);
  });

  test('loads without console errors or failed requests', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('requestfailed', (req) => {
      errors.push(`${req.failure()?.errorText} ${req.url()}`);
    });

    await page.goto('/', { waitUntil: 'networkidle' });
    expect(errors, `unexpected page errors:\n${errors.join('\n')}`).toEqual([]);
  });

  test('has exactly one h1 and a sensible heading outline', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    // Section headings should exist below the h1.
    expect(
      await page.getByRole('heading', { level: 2 }).count()
    ).toBeGreaterThan(0);
  });
});
