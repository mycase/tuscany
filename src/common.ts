export default (
`import { stringify } from 'qs';

export type RequiredArg = string | number;

export function generateFormatAndQuery(
    formatOrQuery?: string | object, query?: object
): { formatString: string, queryString: string } {
  let queryString = '';
  let formatString = '';
  if (query) {
    queryString = \`?\${stringify(query)}\`;
    formatString = formatOrQuery ? \`.\${formatOrQuery}\` : '';
  } else if (typeof formatOrQuery === 'string') {
    formatString = formatOrQuery ? \`.\${formatOrQuery}\` : '';
  } else if (typeof formatOrQuery === 'object' && formatOrQuery !== null) {
    queryString = \`?\${stringify(formatOrQuery)}\`;
  }
  return { formatString, queryString };
}`);