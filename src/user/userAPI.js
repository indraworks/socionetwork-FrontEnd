export const read = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json(); //dikmblaikan jik amau proses then slanjutnya dgn return
    })
    .catch((error) => {
      console.log(error);
    });
};

//update profile user

export const update = (userId, token, user) => {
  console.log('HELLO USER FROM DATA ', user);
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      // 'Content-type': 'application/json', gak pake karn userData
      Authorization: `Bearer ${token}`,
    },
    //krn ada body yg disend maka ditaruh disini
    // body: JSON.stringify(user),
    body: user,
  })
    .then((response) => {
      return response.json(); //dikmblaikan jik amau proses then slanjutnya dgn return
    })
    .catch((error) => {
      console.log(error);
    });
};

//copy update metode kit aganti jadi follow dan routenya juga :
//disini metode apiuser masuk sbagai passing parameter
//callApi(userId, token, this.state.user._id);
// export const follow = (userId, token, followId) => {
//   // console.log('HELLO USER FROM DATA ', user);
//   return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
//     method: 'PUT',
//     headers: {
//       Accept: 'application/json',
//       'Content-type': 'application/json', // gak pake karn userData
//       Authorization: `Bearer ${token}`,
//     },

//     body: JSON.stringify({ userId, followId }),
//   })
//     .then((response) => {
//       return response.json(); //dikmblaikan jik amau proses then slanjutnya dgn return
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

export const follow = (userId, token, followId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, followId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const Remove = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json(); //dikmblaikan jik amau proses then slanjutnya dgn return
    })
    .catch((error) => {
      console.log(error);
    });
};

//utk listUsers karn ambil semua gak perlu pakai
//headers ,hanya method saja GET
export const list = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json(); //dikmblaikan jik amau proses then slanjutnya dgn return
    })
    .catch((error) => {
      console.log(error);
    });
};

//dimaksudkan disini jik akit aedit profile user maka
//nama profile di menu jug aharus ikut ganti
//utk itu kita akan lakukan grab data di local storage dan setdata ke local storage lagi
//hasil update atau update
//parse kemblikan json jadi obkect ,strigify kmblikan json dlm bntuk string
export const updateUser = (user, next) => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('jwt')) {
      let auth = JSON.parse(localStorage.getItem('jwt'));
      auth.user = user;
      localStorage.setItem('jwt', JSON.stringify(auth));
    }
  }
};
