import { newSpecPage } from '@stencil/core/testing';
import { MyComponent } from './advent-day5';

describe('advent-day5', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [MyComponent],
      html: '<advent-day5></advent-day5>',
    });
    expect(root).toEqualHtml(`
      <advent-day5>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </advent-day5>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [MyComponent],
      html: `<advent-day5 first="Stencil" last="'Don't call me a framework' JS"></advent-day5>`,
    });
    expect(root).toEqualHtml(`
      <advent-day5 first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </advent-day5>
    `);
  });
});
