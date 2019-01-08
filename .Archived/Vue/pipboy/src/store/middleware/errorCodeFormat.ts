export default (store: any) => (next: any) => (action: any) => {
  // console.log('hey man, we need beautiful error Code')
  return next(action)
}