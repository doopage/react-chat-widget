type ScrollOptions = ScrollIntoViewOptions & {
  y?: number;
}

export const scrollIntoView = (ctx: Element, el: Element, opts: ScrollOptions = {}) => {
  if (!opts.y) {
    return el.scrollIntoView(opts);
  }
  const r = el.getBoundingClientRect();
  const y = r.top + ctx.scrollTop + opts.y;
  ctx.scrollTo({ top: y, behavior: 'smooth' });
};
