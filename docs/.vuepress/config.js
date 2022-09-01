module.exports = {
  title: '记录的地方',
  // title: '陈赞记录的地方',
  description: '记录个人的一些读书笔记、感悟和总结',
  head: [
    ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `/favicon.ico` }]
  ],
  host: 'localhost',
  // host: '0.0.0.0',
  port: 8080,
  dest: '.vuepress/dist',
  plugins: [
    ['vuepress-plugin-container',
      {
        type: 'right',
        defaultTitle: ''
      }
    ],
    ['vuepress-plugin-container',
      {
        type: 'center',
        defaultTitle: ''
      }
    ],
    ['vuepress-plugin-container',
      {
        type: 'quote',
        before: info => `<div class="quote"><p class="title">${info}</p>`,
        after: '</div>'
      },
    ],
    ['vuepress-plugin-container',
      {
        type: 'not-print',
        defaultTitle: ''
      },
    ],
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-162170924-1'
      }
    ],
    ['@vuepress/back-to-top'],
  ],
  markdown: {
    anchor: { permalink: false },
    toc: { includeLevel: [2, 3] },
    extendMarkdown: md => {
      md.use(require('markdown-it-mermaid').default);
      md.use(require('markdown-it-sub'));
      md.use(require('markdown-it-sup'));
      md.use(require('markdown-it-abbr'));
      md.use(require('markdown-it-ins'));
      md.use(require('markdown-it-figure'));
      md.use(require('markdown-it-smartarrows'));
      md.use(require('markdown-it-fontawesome'));
    }
  },
  themeConfig: {
    logo: '/images/logo-color.png',
    lastUpdated: '最后更新',
    smoothScroll: true,
    editLinks: true,
    editLinkText: '在GitHub中编辑',
    sidebar: [
      {
        title: '目录',
        collapsable: false,
        path: '/SUMMARY.md'
      }, {
        title: 'java并发编程实践',
        collapsable: false,
        children: [
          {
            title: '第7章',
            collapsable: false,
            path: '/java_concurrency_in_practice/',
            children: [
              '/java_concurrency_in_practice/7.1任务的取消.md',
              '/java_concurrency_in_practice/7.2停止一个基于线程的服务.md',
              '/java_concurrency_in_practice/7.3 线程异常终止的处理.md',
              '/java_concurrency_in_practice/7.4关闭java虚拟机.md',
            ]
          }]
      },   {
        title: '随笔文章',
        collapsable: false,
        children: [
          {
            title: '2020年',
            collapsable: false,
            children: [
              {
                title: 'Graal VM',
                collapsable: false,
                path: '/tricks/2020/graalvm/',
                children: [
                  '/tricks/2020/graalvm/graal-compiler',
                  '/tricks/2020/graalvm/substratevm',
                  '/tricks/2020/graalvm/graalvm-native',
                  '/tricks/2020/graalvm/spring-over-graal',
                ]
              },
            ]
          },
          {
            title: '2021年',
            collapsable: false,
            children: [
              '/tricks/2021/openjdk-for-dummies/',
              '/tricks/2021/geekbang.md',
              '/tricks/2021/fenix-cli/',
              '/tricks/2021/arch/',
            ]
          },
        ]
      }
    ]
  }
};


