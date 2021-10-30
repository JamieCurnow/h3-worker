const METHOD_WITH_BODY_RE = /post|put|patch/i
const JSON_MIME_RE = /application\/json/

export function requestHasBody(request: Request): boolean {
  return METHOD_WITH_BODY_RE.test(request.method)
}

export async function useRequestBody(request: Request): Promise<any> {
  const contentType = request.headers.get('content-type') || ''
  if (contentType.includes('form')) {
    const formData = await request.formData()
    const body = Object.create(null)
    for (const entry of formData.entries()) {
      body[entry[0]] = entry[1]
    }
    return body
  } else if (JSON_MIME_RE.test(contentType)) {
    return request.json()
  } else if (contentType.includes('text')) {
    return request.text()
  } else {
    return request.blob()
  }
}
