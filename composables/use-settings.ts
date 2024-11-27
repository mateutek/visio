import { useStorage } from "@vueuse/core";
import type { Settings } from "~/utils/constants";
import { defaultSettings } from "~/utils/constants";

// It will be available as useFoo() (camelCase of file name without extension)
export default function () {
  return useStorage<Settings>("visio-settings", defaultSettings, localStorage, {
    mergeDefaults: true,
  });
}
