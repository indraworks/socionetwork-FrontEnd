//signup diexport ke signupjs
//refactor dijadikan meetode
// export const SignUpFetch = (user) => {
//   //wajib metorde kalau ada claibrate wajib di renturn
//   //${process.env.REACT_APP_API_URL};
//   return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
//     method: 'POST',
//     headers: {
//       Accepts: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(user), //btunk json user dipasing disini
//   })
//     .then((result) => {
//       return result.json();
//     })
//     .catch((err) => console.log(err));
// };

//// ini kedua signUp ////
export const SignUpFetch = (user) => {
  //ketahuan kesalahannya ada pada prcecess envnya cuk!
  //return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
  return fetch('http://localhost:8300/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/////end kedua signUp /////

//signin diexport ke signj=njs
//refactor dijadikan meetode
export const SignInFetch = (user) => {
  //wajib metorde kalau ada claibrate wajib di renturn
  return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
  // return fetch('http://localhost:8300/signin', {
    method: 'POST',
    headers: {
      Accepts: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user), //btunk json user dipasing disini
  })
    .then((result) => {
      return result.json();
    })
    .catch((err) => console.log(err));
};

/* check isauthencitacated utk check apaka autenticate
 jik aya maka sudah sign/signup --> menu signout kit amunculkan 
 jik atidak autenticate blum sign/signup  maka menu sign/singup yg it amunculkan

*/

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  } else {
    return false;
  }
};

export const signOut = (next) => {
  //bagian client side
  if (typeof window !== 'undefined') localStorage.removeItem('jwt');
  next(); //maksudnya pindah halamant jika sudah slsi logout

  //bagian server:
  return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
    method: 'GET',
  })
    .then((response) => {
      console.log('response', response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//metode authenticate handle data web token dati server
//tadi yg kita terima adalah data dari server isi token
//ini metode/function ini pasing parameternya kita
//kasih nama jwt aslinya bebas boleh data atau apapun sesuai
export const authenticate = (jwt, next) => {
  //kit acheck window rowser kita
  if (typeof Window !== 'undefined') {
    //maka kit asimpan data dari sevrer ke loal storage
    localStorage.setItem('jwt', JSON.stringify(jwt));
    next();
  }
};
