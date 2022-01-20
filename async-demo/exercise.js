
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

notifiCustomer(1);

async function notifiCustomer(id)
{
  try{
    const customer = await getCustomer(1);
    console.log('customer: ', customer);
    if (customer.isGold)
    {
      const movies = await getTopMovies();
      console.log('Top Movies: ', movies);
      await sendEmail(customer.email, movies);
    }
  }
  catch(err)
  {
    console.log(err);
  }
}

function getCustomer(id) {
  return new Promise((resolved, reject) => {
    setTimeout(() => {
      resolved({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);  
  });
}

function getTopMovies() {
  return new Promise((resolved, reject) => {
    setTimeout(() => {
      resolved(['movie1', 'movie2'])
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolved, reject) => {
    setTimeout(() => {
      console.log('Email sent...')
    }, 4000);
  });
}