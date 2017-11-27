export const delay = (num?: number) => new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, num || 16)
})
