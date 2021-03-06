// 服务端
import { createApp } from './main'

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()

        // 设置服务器端 router 的位置
        router.push(context.url)

        // 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            // 匹配不到路由, 执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                reject({
                    code: 404
                })
            }
            // Promise 应该 resolve 应用程序实例，以便它可以渲染
            Promise.all(matchedComponents.map(component => {
                if (component.asyncData) {
                    return component.asyncData({ store })
                }
            }))
            .then(() => {
                context.state = store.state
                // 返回根组件
                resolve(app)
            })
        }, reject)
    })
}