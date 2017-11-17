import * as ReactGA from "react-ga";
import EnvChecker from "./envChecker";

export function trackAndOpenLink(url: string, from: string) {
  if (!EnvChecker.isServer()) {
    ReactGA.event({
      category: "link-click",
      action: `click-from-${from}`,
      label: url,
    });
    window.open(url, "_blank");
  }
}
