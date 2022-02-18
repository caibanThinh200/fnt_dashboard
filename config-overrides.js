import {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAliasaddWebpackAlias,
} from 'customize-cra';
import path from 'path';
import { ParamsClass } from './src/Constant/pageTheme';

export default override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: ParamsClass,
        },
    }),
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src'),
    })
)
