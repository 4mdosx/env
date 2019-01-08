// Object.assign(window, {
//   Raven: {
//     captureException: (e: any) => { console.warn('caught an exception by lib', e)}
//   }
// })

export default (store: any) => (next: any) => (action: any) => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    // Raven.captureException(err, {
    //   extra: {
    //     action,
    //     state: store.getState()
    //   }
    // })
    throw err
  }
}