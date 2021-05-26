export const checkOnlineStatus: () => Promise<boolean> = async () => {
  try {
    const resp = await fetch(
      "https://baconipsum.com/api/?type=all-meat&sentences=1"
    )
    return resp.status >= 200 && resp.status < 300
  } catch (err) {
    return false
  }
}
