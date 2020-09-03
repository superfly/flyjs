import { registerBridge } from "./";

import { ivm } from "../";
import { Runtime } from "../runtime";

registerBridge("getHeapStatistics", (rt: Runtime) => {
  return (cb: ivm.Reference<() => void>) => {
    rt.isolate
      .getHeapStatistics()
      .then((heap) => {
        // @ts-ignore comment
        cb.applyIgnored(null, [null, new ivm.ExternalCopy(heap).copyInto()]);
      })
      .catch((err) => {
        // @ts-ignore comment
        cb.applyIgnored(null, [err.toString()]);
      });
  };
});
