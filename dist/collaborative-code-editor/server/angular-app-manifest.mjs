
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-QRRBNU3Y.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-M2HX6I4I.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TB6DGR4R.js"
    ],
    "route": "/register"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2EVS6NUX.js"
    ],
    "route": "/project"
  },
  {
    "renderMode": 1,
    "route": "/project/*"
  },
  {
    "renderMode": 1,
    "route": "/project/share/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 31722, hash: 'f211eff8f4c6fd475f4ae3d580977f02c1f20a2a6b50525a5724ae4db842d876', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 19106, hash: '0b68d7c1416bbafbbbfa3d745aa94c9aebf3fa4351e23f1ca6a54cfeea3a631a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 37324, hash: '8889603debe5f1d8fd1f078a96e41bb181e77778c205d283dc204236cc7a4c74', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'index.html': {size: 37772, hash: '2cd388ef0ccfe4d3bc476364ee737bc411dc62e496474325abb7abd86a8bf756', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'project/index.html': {size: 37772, hash: '24923058d223ef44bad3f5ad21ccfad79b4e859cda0a743b90007b826c073406', text: () => import('./assets-chunks/project_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 37864, hash: '9d7413ee14de4a7b38d731ce9ecedbbf5a7a4469665c59b6f1f80693531fc7de', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'styles-XJEVZBUQ.css': {size: 22605, hash: '7VjgZVDka7g', text: () => import('./assets-chunks/styles-XJEVZBUQ_css.mjs').then(m => m.default)}
  },
};
