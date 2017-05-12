import { MbedfrontPage } from './app.po';

describe('mbedfront App', function() {
  let page: MbedfrontPage;

  beforeEach(() => {
    page = new MbedfrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
