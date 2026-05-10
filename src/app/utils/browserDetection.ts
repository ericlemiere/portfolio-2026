export type BrowserType =
  | "chrome"
  | "safari"
  | "firefox"
  | "edge"
  | "ios"
  | "unknown";

export interface BrowserInfo {
  type: BrowserType;
  isMobile: boolean;
  isIOS: boolean;
}

export function detectBrowser(): BrowserInfo {
  if (typeof window === "undefined") {
    return { type: "unknown", isMobile: false, isIOS: false };
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  const isMobile =
    /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent,
    );
  const isIOS = /iphone|ipad|ipod/.test(userAgent);

  let type: BrowserType = "unknown";

  // Detect iOS Safari (including iOS Chrome/Firefox which use Safari WebKit)
  if (isIOS) {
    type = "ios";
  }
  // Detect Edge
  else if (userAgent.includes("edg/")) {
    type = "edge";
  }
  // Detect Chrome (must check before Safari since Chrome includes Safari in UA)
  else if (userAgent.includes("chrome") && !userAgent.includes("edg/")) {
    type = "chrome";
  }
  // Detect Safari (desktop)
  else if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
    type = "safari";
  }
  // Detect Firefox
  else if (userAgent.includes("firefox")) {
    type = "firefox";
  }

  return { type, isMobile, isIOS };
}

export interface BrowserPerformanceConfig {
  rotationSpeed: number;
  particleCount: number;
  useBlur: boolean;
  useSimpleRendering: boolean; // Use simpler rendering for performance
}

export function getPerformanceConfig(
  browserInfo: BrowserInfo,
): BrowserPerformanceConfig {
  const { type, isMobile } = browserInfo;

  // Base mobile config
  if (isMobile) {
    if (type === "ios") {
      return {
        rotationSpeed: 0.005,
        particleCount: 400,
        useBlur: true,
        useSimpleRendering: true,
      };
    }
    return {
      rotationSpeed: 0.003,
      particleCount: 400,
      useBlur: true,
      useSimpleRendering: true,
    };
  }

  // Desktop configs
  switch (type) {
    case "chrome":
    case "edge":
      return {
        rotationSpeed: 0.002, // Slower for Chrome (was too fast)
        particleCount: 1000,
        useBlur: false,
        useSimpleRendering: false,
      };
    case "safari":
      return {
        rotationSpeed: 0.006, // Adjusted for Safari
        particleCount: 600, // Reduced for better Safari performance
        useBlur: false,
        useSimpleRendering: true, // Use simpler rendering for Safari
      };
    case "firefox":
      return {
        rotationSpeed: 0.004,
        particleCount: 1000,
        useBlur: false,
        useSimpleRendering: false,
      };
    default:
      return {
        rotationSpeed: 0.006, // Default middle ground
        particleCount: 1000,
        useBlur: false,
        useSimpleRendering: false,
      };
  }
}
