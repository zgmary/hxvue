import { mixins } from "./mixins";
import { KEY_COMPONENT_NAME } from "./variable";
export default function(sfc) {
  sfc.name = KEY_COMPONENT_NAME + sfc.name;
  sfc.mixins = sfc.mixins || [];
  sfc.mixins.push(mixins);
  return sfc;
}
