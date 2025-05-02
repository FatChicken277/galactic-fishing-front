export function resetZoom() {
  const viewport = document.querySelector("meta[name=viewport]");
  if (!viewport) return;

  // Temporarily disable zoom
  viewport.setAttribute(
    "content",
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
  );

  // Restore user zoom after short delay (for accessibility)
  setTimeout(() => {
    viewport.setAttribute("content", "width=device-width, initial-scale=1");
  }, 500);
}
