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
`const { generateFormatAndQuery } = require('tarr');
${requiredArgDefinition}
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
