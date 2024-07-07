document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const sections = gsap.utils.toArray(".page-section");
  const numSections = sections.length;

  function updateNavigation(index) {
    const section = sections[index];
    const color = getComputedStyle(section).backgroundColor;
    gsap.to("#svg-navigation", { backgroundColor: color, duration: 0.3 });

    const progress = (index / (numSections - 1)) * 820;
    gsap.to("#Opaque_Ring", {
      strokeDasharray: `${progress}, 1000`,
      duration: 0.3,
    });

    gsap.utils.toArray(".dots-nav").forEach((dot, i) => {
      gsap.to(dot.querySelector("path"), {
        fill: i <= index ? "rgb(0, 146, 255)" : "rgb(173, 182, 189)",
        duration: 0.3,
      });
    });
  }

  function handleScrollTrigger() {
    gsap.utils.toArray(".page-section").forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => updateNavigation(i),
        onEnterBack: () => updateNavigation(i),
        onLeave: () => updateNavigation(i - 1),
        onLeaveBack: () => updateNavigation(i + 1),
      });
    });
  }

  handleScrollTrigger();
});
