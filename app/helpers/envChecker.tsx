const IP_REGEX = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

const STAGE_SERVER_HOST_NAME = "join-stage.pluto.network";

const STAGE_LAMBDA_HOST = "https://pd95c40pz6.execute-api.us-east-1.amazonaws.com/stage";
const PROD_LAMBDA_HOST = "https://uunwh2xzgg.execute-api.us-east-1.amazonaws.com/production";

export default class EnvChecker {
  public static isDev(): boolean {
    if (!EnvChecker.isServer()) {
      return (
        window.location.hostname &&
        (window.location.hostname.includes("localhost") ||
          window.location.hostname.includes("lvh.me") ||
          IP_REGEX.test(window.location.hostname))
      );
    }
    return false;
  }

  public static isServer(): boolean {
    return typeof window === "undefined";
  }

  public static isStage(): boolean {
    if (!EnvChecker.isServer()) {
      return window.location.hostname && window.location.hostname.includes(STAGE_SERVER_HOST_NAME);
    }
    return false;
  }

  public static getHost(): string {
    if (EnvChecker.isDev() || EnvChecker.isStage()) {
      return "https://join-stage.pluto.network";
    } else {
      return "https://join.pluto.network";
    }
  }

  public static getLambdaHost(): string {
    if (EnvChecker.isDev() || EnvChecker.isStage()) {
      return STAGE_LAMBDA_HOST;
    } else {
      return PROD_LAMBDA_HOST;
    }
  }
}
