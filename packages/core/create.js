import { mixins } from "./mixins";
import bemCss from "./bem";
import { KEY_COMPONENT_NAME } from "./variable";
export default function(sfc) {
  sfc.name = KEY_COMPONENT_NAME + sfc.name;
  sfc.mixins = sfc.mixins || [];
  sfc.mixins.push(mixins);
  sfc.mixins.push(bemCss);
  return sfc;
}
