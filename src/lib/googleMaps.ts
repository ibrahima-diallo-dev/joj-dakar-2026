let loaded = false
let loading = false
const callbacks: (() => void)[] = []

export function loadGoogleMaps(callback: () => void) {
  if (loaded) return callback()
  callbacks.push(callback)
  if (loading) return
  loading = true

  const script = document.createElement("script")
  script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_KEY || ''}`
  script.async = true
  script.defer = true
  script.onload = () => {
    loaded = true
    callbacks.forEach((cb) => cb())
  }
  document.head.appendChild(script)
}
