import { resolve } from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({tsconfigPath: './tsconfig.json'}),
  ],
  build: {
    lib: {
      //ライブラリのエントリーポイント
      entry: resolve('src/index.ts'),
      name: 'MyUiLibrary',
      //出力ファイル名
      fileName: 'my-ui-library',
    },
    rollupOptions:{
      //パッケージに含めない外部ライブラリを指定
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // UMDビルドで、これらの外部ライブラリを変数として利用する
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
});
