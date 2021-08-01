import db from '../firebase';

export const firebaseSetUser = (auth0User) => {
  const user = {
    user: { ...auth0User },
    day_columns: [
      {
        id: 'monday',
        tasks: [],
      },
      {
        id: 'tuesday',
        tasks: [],
      },
      {
        id: 'wednesday',
        tasks: [],
      },
      {
        id: 'thursday',
        tasks: [],
      },
      {
        id: 'friday',
        tasks: [],
      },
      {
        id: 'saturday',
        tasks: [],
      },
      {
        id: 'sunday',
        tasks: [],
      },
    ],
    block_interval: 30,
    block_size: 200,
    time_range: [9, 17],
    table_title: 'TASKS',
    current_time_on_top: false,
  };
  db.collection('users')
    .doc(auth0User.nickname)
    .set({
      user,
    })
    .then(() => {
      console.log('Document written with ID: ', auth0User.nickname);
    })
    .catch((e) => {
      console.error('Error adding document: ', e);
    });
    return user.user;
};

export const firebaseGetTableSettings = async (username) => {
  const docRef = db.collection('users').doc(username);
  const result = docRef
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        const data = await doc.data();
        return data;
      } else {
        console.log('No such document!');
      }
    })
    .then((data) => {
      const {
        block_interval,
        block_size,
        current_time_on_top,
        day_columns,
        table_title,
        time_range,
      } = data.user;
      const result = {
        block_interval: block_interval,
        block_size: block_size,
        current_time_on_top: current_time_on_top,
        day_columns: day_columns,
        table_title: table_title,
        time_range: time_range,
      };
      return result;
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
  return result;
};
