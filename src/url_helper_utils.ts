import { stringify } from 'qs';

export function generateFormatAndQuery(
    formatOrQuery?: string | object, query?: object
): { formatString: string, queryString: string } {
  let q = {};
  let f: string | undefined = '';

  if (query) {
    q = query;
    f = formatOrQuery as string | undefined;
  } else if (typeof formatOrQuery === 'string') {
    f = formatOrQuery;
  } else if (typeof formatOrQuery === 'object' && formatOrQuery !== null) {
    q = formatOrQuery;
  }

  return {
    formatString: f ? `.${f}` : '',
    queryString: stringify(q, { addQueryPrefix: true, arrayFormat: 'brackets' }),
  };
}
