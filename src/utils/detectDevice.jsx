export function detectDevice(userAgent) {
  const isMobile = /Android|iPhone|iPod|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android 3.0|Xoom|SCH-I800|Tablet/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;

  if (isMobile) return "mobile";
  if (isTablet) return "tablet";
  if (isDesktop) return "desktop";
}
