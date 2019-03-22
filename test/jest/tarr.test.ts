import { requireRoute } from './helpers';

const usersRoute = requireRoute('user', 'users');
const userRoute = requireRoute('user', 'user');
const documentsRoute = requireRoute('document', 'documents');
const documentVersionRoute = requireRoute('document', 'document_version');

describe('tarr', () => {
  test('should generate simple routes', () => {
    expect(usersRoute()).toEqual('/users');
    expect(documentsRoute()).toEqual('/documents');
  });

  test('should generate routes with parameters', () => {
    expect(userRoute(7)).toEqual('/users/7');
    expect(documentVersionRoute(11, 5)).toEqual('/documents/11/versions/5');
  });

  test('should support arbitrary formats', () => {
    expect(usersRoute('json')).toEqual('/users.json');
    expect(documentVersionRoute(11, 5, 'xml'))
      .toEqual('/documents/11/versions/5.xml');
  });

  test('should support arbitrary query strings', () => {
    expect(usersRoute({ foo: 5, bar: 'baz' }))
      .toEqual('/users?foo=5&bar=baz');
    expect(documentVersionRoute(11, 5, { steve: 'rip' }))
      .toEqual('/documents/11/versions/5?steve=rip');
  });

  test('should support format and query string', () => {
    expect(usersRoute('json', { foo: 5, bar: 'baz' }))
      .toEqual('/users.json?foo=5&bar=baz');
    expect(documentVersionRoute(11, 5, 'xml', { steve: 'rip' }))
      .toEqual('/documents/11/versions/5.xml?steve=rip');
  });

  test('should ignore null or undefined format or query', () => {
    expect(usersRoute(null))
      .toEqual('/users');
    expect(usersRoute(undefined, null))
      .toEqual('/users');
    expect(usersRoute('json', null))
      .toEqual('/users.json');

    expect(documentVersionRoute(11, 5, null))
      .toEqual('/documents/11/versions/5');
    expect(documentVersionRoute(11, 5, undefined, null))
      .toEqual('/documents/11/versions/5');
    expect(documentVersionRoute(11, 5, 'xml', null))
      .toEqual('/documents/11/versions/5.xml');
  });
});
