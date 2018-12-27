export default (path: string, requiredArguments: string[]) => {
    const paramString = requiredArguments.map(arg => `${arg}: RequiredArg, `).join('');
    path = path.replace('(.:format)', '');
    requiredArguments.forEach((arg) => {
        path = path.replace(`:${arg}`, `\${${arg}}`);
    });

    return (
`import { generateFormatAndQuery, RequiredArg } from '../common';

function route(${paramString}formatOrQuery?: string | object, query?: object) {
  let { formatString, queryString } = generateFormatAndQuery(formatOrQuery, query);
  return \`${path}\${formatString}\${queryString}\`;
}

export default route;
`);
};