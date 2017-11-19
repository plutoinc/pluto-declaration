export function staticHTMLWrapper(reactDom: string, scriptPath: string, initialState: string, css: string) {
  return `
    <!doctype html>
    <html>
      <head>
        <!--for Facebook Crawler-->
        <meta charset="utf-8">
        <meta property="og:url" content="https://join.pluto.network" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="The Future of Scholarly Communication" />
        <meta property="og:description" content="Decentralized Scholarly Communication Platform" />
        <meta property="og:image" content="https://pbs.twimg.com/profile_images/879901726739808256/ry_UkEdB_400x400.jpg" />
        <meta charset="utf-8">
        <!--for Twitter Crawler-->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@nytimes">
        <meta name="twitter:creator" content="@SarahMaslinNir">
        <meta name="twitter:title" content="Parade of Fans for Houston’s Funeral">
        <meta name="twitter:description" content="NEWARK - The guest list and parade of limousines with celebrities emerging from them seemed more suited to a red carpet event in Hollywood or New York than than a gritty stretch of Sussex Avenue near the former site of the James M. Baxter Terrace public housing project here.">
        <meta name="twitter:image" content="http://graphics8.nytimes.com/images/2012/02/19/us/19whitney-span/19whitney-span-articleLarge.jpg">
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
