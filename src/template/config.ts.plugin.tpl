      headScripts:[
        NODE_ENV === 'production'
        ? {src: '../frontend-conf/config.js'}
        : {content:`window.config = 'https://www.baidu.com';`}
      ],