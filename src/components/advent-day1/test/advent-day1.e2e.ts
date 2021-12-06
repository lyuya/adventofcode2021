import { newE2EPage } from '@stencil/core/testing';

describe('advent-day1', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<advent-day1></advent-day1>');

    const element = await page.find('advent-day1');
    expect(element).toHaveClass('hydrated');
  });
});
