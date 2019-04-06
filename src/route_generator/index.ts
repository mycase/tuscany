export default (path: string, requiredArguments: string[]) => {
    const paramString = requiredArguments.map(arg => `${arg}: RequiredArg`).join(', ');
    path = path.replace('(.:format)', '');
    requiredArguments.forEach((arg) => {
        path = path.replace(`:${arg}`, `\${${arg}}`);
    });

    let requiredArgDefinition =
      (requiredArguments.length > 0)
        ? '\ntype RequiredArg = string | number;\n'
        : '';

    const requiredParamSeparator = paramString ? ', ' : '';

    return (
`import { stringify } from 'qs';
${requiredArgDefinition}
function generateFormatAndQuery(
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
}

function route(${paramString}): string;
function route(${paramString}${requiredParamSeparator}format: string): string;
function route(${paramString}${requiredParamSeparator}query: object): string;
function route(${paramString}${requiredParamSeparator}format: string, query: object): string;
function route(${paramString}${requiredParamSeparator}formatOrQuery?: string | object, query?: object) {
  let { formatString, queryString } = generateFormatAndQuery(formatOrQuery, query);
  return \`${path}\${formatString}\${queryString}\`;
}

export default route;
`);
};
