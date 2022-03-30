async function logout() {
  const response = await fetch('/api/user/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
  })

  if (response.ok) {
    document.location.replace('/')
  } else {
    console.log(response.statusText)
  }
}

document.querySelector('#logout').addEventListener('click', logout)