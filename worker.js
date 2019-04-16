addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

const constructResponse = (response, body, headers = {}) =>
  new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: Object.assign({}, response.headers, headers),
  })

const bucketName = "gatsby-workers"
const baseUrl = `http://storage.googleapis.com/${bucketName}`

async function handleRequest(request) {
  const parsedUrl = new URL(request.url)
  let path = parsedUrl.pathname

  if (path.endsWith("/")) {
    path = "/index.html"
  }

  const response = await fetch(`${baseUrl}${path}`)

  if (path.endsWith("html")) {
    return constructResponse(response, response.body, {
      "Content-Type": "text/html",
    })
  } else {
    return response
  }
}
