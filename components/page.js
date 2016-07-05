const liveReload = `<script>
  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>`

const Page = (content, initialState) => {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Freehold</title>
        ${ process.env.NODE === 'development' ? liveReload : '' }
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script type="text/javascript" src="bundle.js" ></script>
      </head>
      <body>
        <div id="app">${content}</div>
        <!-- Our app div will be appended here -->
      </body>
    </html>`
}

module.exports = Page
