      headScripts:[
        NODE_ENV === 'production'
        ? {src: '../frontend-conf/config.js'}
        : {content:`window.config = 'https://lcas-web-be-uat.uat.homecreditcfc.cn';`}
      ],