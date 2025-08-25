// Debug utility to help diagnose routing issues on different domains
export function debugRouterInfo() {
  const info = {
    currentUrl: window.location.href,
    pathname: window.location.pathname,
    hash: window.location.hash,
    search: window.location.search,
    host: window.location.host,
    origin: window.location.origin,
    baseURI: document.baseURI,
    userAgent: navigator.userAgent,
    historySupported: !!(window.history && window.history.pushState),
    timestamp: new Date().toISOString()
  };
  
  console.log('🔧 Router Debug Info:', info);
  return info;
}

// Call this on app load to help diagnose beta domain issues
if (typeof window !== 'undefined') {
  debugRouterInfo();
}