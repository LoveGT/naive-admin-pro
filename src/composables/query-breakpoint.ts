export const breakpointEnum = {
  xl: 1600,
  lg: 1199,
  md: 991,
  sm: 767,
  xs: 575,
}

export const useQueryBreakpoints = () => {
  const breakpoints = reactive(useBreakpoints(breakpointEnum))
  // 手机端的
  const isMobile = breakpoints.smaller('sm')
  // pad端的
  const isPad = breakpoints.between('sm', 'md')
  // 电脑端的
  const isDesktop = breakpoints.greater('md')
  return {
    breakpoints,
    isMobile,
    isPad,
    isDesktop,
  }
}
