<<<<<<< HEAD
//I will change 'id' names and etc when I get handlebar files
async function logout() {
    const response = await fetch('/api/users/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#logout').addEventListener('click', logout);
  
=======
// TODO: add logic to sign out a user
// see example below

// async function logout() {
//   try {
//     const response = await axios.post('/api/users/logout');
//     if (response.ok) {
//       document.location.replace('/')
//     }
//   } catch (err) {
//     alert(response.statusText);
//   }
// }

// document.querySelector('#logout').addEventListener('click', logout);
>>>>>>> d3c69bff89681f35cf424510f2684185ea0116c2
