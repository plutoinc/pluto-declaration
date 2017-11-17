export function staticHTMLWrapper(reactDom: string, scriptPath: string, initialState: string, css: string) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta property="og:url" content="https://join.pluto.network" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="The Future of Scholarly Communication" />
        <meta property="og:description" content="Decentralized Scholarly Communication Platform" />
        <meta property="og:image" content="https://pbs.twimg.com/profile_images/879901726739808256/ry_UkEdB_400x400.jpg" />
        <meta charset="utf-8">
        <title>Join Decentralized Scholarly Communication Platform!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <link rel="shortcut icon" href="https://dd2gn9pwu61vr.cloudfront.net/favicon.png" />
        <style type="text/css">${css}</style>
      </head>
      <body>
        <script>window.__INITIAL_STATE__=${initialState}</script>
        <div id="react-app">
          ${reactDom}
        </div>
        <script src="${scriptPath}"></script>
      </body>
    </html>
  `;
}
