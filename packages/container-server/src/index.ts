import { Server, LocalFileStore, BridgeOptions, RedisCacheStore } from "@fly/core"
import { ContainerAppStore } from "./container_app_store"

console.log(process.argv)
const bundleDir = process.argv[process.argv.length - 1] || process.cwd()

console.log("starting fly container server at", bundleDir)

let port = 3000
if (process.env.PORT) {
  port = parseInt(process.env.PORT, 10)
}
const env = process.env.FLY_ENV || "production"

const appStore = new ContainerAppStore({
  dir: bundleDir,
  env
})

const bridgeOptions: BridgeOptions = {
  fileStore: new LocalFileStore(bundleDir)
}

if (process.env.FLY_REDIS_CACHE_URL) {
  bridgeOptions.cacheStore = new RedisCacheStore(process.env.FLY_REDIS_CACHE_URL)
}

let memoryLimit = 128
if (process.env.FLY_MEMORY_LIMIT) {
  memoryLimit = parseInt(process.env.FLY_MEMORY_LIMIT, 10)
}

const server = new Server({
  appStore,
  env,
  inspect: false,
  bridgeOptions,
  memoryLimit,
  monitorFrequency: 30000
})

server.listen(port)
