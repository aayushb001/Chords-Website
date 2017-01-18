import { Lab5projPage } from './app.po';

describe('lab5proj App', function() {
  let page: Lab5projPage;

  beforeEach(() => {
    page = new Lab5projPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
