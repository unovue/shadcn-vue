// msw only intercepts the global `fetch`, so keep the developer's proxy
// settings from routing registry requests through undici's own `fetch`.
for (const key of ['https_proxy', 'HTTPS_PROXY', 'http_proxy', 'HTTP_PROXY', 'no_proxy', 'NO_PROXY'])
  delete process.env[key]
