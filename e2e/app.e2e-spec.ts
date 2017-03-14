import { Angular2FabrikaPage } from './app.po';

describe('angular2-fabrika App', () => {
  let page: Angular2FabrikaPage;

  beforeEach(() => {
    page = new Angular2FabrikaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
