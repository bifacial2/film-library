export function lazyLoad(targets) {
  const options = {
    rootMargin: '100px',
  };
  const onEntry = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target;
        const src = image.dataset.lazy;
        image.src = src;
        observer.unobserve(image);
      }
    });
  };
  const io = new IntersectionObserver(onEntry, options);
  targets.forEach(target => io.observe(target));
}
