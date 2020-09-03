import * as ivm from "isolated-vm";

export { ivm };

export type IvmCallback = ivm.Reference<() => void>;

export function dispatchError(cb: IvmCallback, err: string | Error) {
  // @ts-ignore comment
  cb.applyIgnored(null, [(err && err.toString()) || "unknown error"]);
}
