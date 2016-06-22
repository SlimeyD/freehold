const liveReload = `<script>
  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>`

const Page = content => {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Inu Chat</title>
        <link rel="stylesheet" href="/css/app.css" media="all">
        ${ process.env.NODE === 'development' ? liveReload : '' }
        <script type="text/javascript" src="bundle.js" ></script>
      </head>
      <body>
        <div id="app">${content}</div>
        <!-- Our app div will be appended here -->
      </body>
    </html>`
  }

  module.exports = Page
