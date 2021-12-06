import { newE2EPage } from '@stencil/core/testing';

describe('advent-day2', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<advent-day2></advent-day2>');

    const element = await page.find('advent-day2');
    expect(element).toHaveClass('hydrated');
  });
});
