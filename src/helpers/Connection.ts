export const checkOnlineStatus: () => Promise<boolean> = async () => {
  try {
    const resp = await fetch("https://www.randomtext.me/#/lorem/h1/1-1")
    return resp.status >= 200 && resp.status < 300
  } catch (err) {
    return false
  }
}
