const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const KoaStatic = require('koa-static')
const app = new Koa()
const LRU = require('lru-cache') // component-level caching

const resolve = file => path.resolve(__dirname, file)
// 开放 dist 目录
app.use(KoaStatic(resolve('./dist'))) 

const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(bundle,{
    runInNewContext: false,
    cache: LRU({
        max: 10000,
        maxAge: 1000 * 60 * 60
    }),
    template: fs.readFileSync(resolve('./src/index.temp.html'), 'utf-8'),
    clientManifest: clientManifest
})

function renderToString(context) {
    return new Promise((resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
            err ? reject(err) : resolve(html)
        })
    })
}

app.use(async (ctx, next) => {
    const context = {
        title: "ssr test",
        url: ctx.url
    }
    // 将 context 数据渲染为 HTML
    const html = await renderToString(context)
    ctx.body = html
})

const port = 3000
app.listen(port, function() {
    console.log(`server started at localhost:${port}`)
})
