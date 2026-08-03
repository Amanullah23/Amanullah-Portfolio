export function scrollToSection(
  e: React.MouseEvent<HTMLAnchorElement>,
  id: string,
) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function setScrollTarget(id: string) {
  sessionStorage.setItem("scrollTarget", id);
}

export function consumeScrollTarget(): string | null {
  const id = sessionStorage.getItem("scrollTarget");
  if (id) sessionStorage.removeItem("scrollTarget");
  return id;
}
