import { newSpecPage } from '@stencil/core/testing';
import { AdventDay2 } from '../advent-day2';

describe('advent-day2', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AdventDay2],
      html: `<advent-day2></advent-day2>`,
    });
    expect(page.root).toEqualHtml(`
      <advent-day2>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </advent-day2>
    `);
  });
});
