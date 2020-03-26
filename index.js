// eslint:disable-next-line
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsNode =  require('ts-node');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsConfigPaths =  require('tsconfig-paths');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsConfig = require('./tsconfig.json');
tsConfigPaths.register({
  baseUrl: '.',
  paths: tsConfig.compilerOptions.paths
});
tsNode.register(tsConfig);

require('./index.ts');
