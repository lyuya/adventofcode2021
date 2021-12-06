import { newSpecPage } from '@stencil/core/testing';
import { AdventDay1 } from '../advent-day1';

describe('advent-day1', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AdventDay1],
      html: `<advent-day1></advent-day1>`,
    });
    expect(page.root).toEqualHtml(`
      <advent-day1>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </advent-day1>
    `);
  });
});
