import * as ReactGA from "react-ga";

export function trackAndOpenLink(from: string) {
  ReactGA.outboundLink(
    {
      label: from,
    },
    () => {},
  );
}

export function trackAction(action: string, path: string) {
  ReactGA.event({
    category: "User Action",
    action: `${action}`,
    label: path,
  });
}
