async function pin () {
  const input = document.getElementById('host-input')
  const host = input.value
  await chrome.storage.sync.set({ host }).then(() => {
    console.log("Value is set", host)
  })

  const tabs = await chrome.tabs.query({ currentWindow: true })
  let pinned = false
  tabs.forEach(tab => {
    if (tab.url.startsWith(host)) {
      pinned = true
    }
  })

  if (!pinned) {
    chrome.tabs.create({url: host, pinned: true})
  }
}

function init () {
  chrome.storage.sync.get(['host']).then((result) => {
    const input = document.getElementById('host-input')
    input.value = result.host
  })
}

document.getElementById('pin-btn').addEventListener('click', pin)
init()
