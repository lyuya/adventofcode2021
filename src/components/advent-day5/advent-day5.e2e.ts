import { newE2EPage } from '@stencil/core/testing';

describe('advent-day5', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<advent-day5></advent-day5>');
    const element = await page.find('advent-day5');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<advent-day5></advent-day5>');
    const component = await page.find('advent-day5');
    const element = await page.find('advent-day5 >>> div');
    expect(element.textContent).toEqual(`Hello, World! I'm `);

    component.setProperty('first', 'James');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James`);

    component.setProperty('last', 'Quincy');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    component.setProperty('middle', 'Earl');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
