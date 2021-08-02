import db from '../firebase';

export const firebaseSetUser = (
  auth0User,
  blockInterval,
  blockSize,
  timeRange,
  tableTitle,
  currentTimeOnTop,
  dayColumns
) => {
  
  const docRef = db.collection('users').doc(auth0User.name);
  
  const user = docRef.get().then(async (doc) => {
    if (doc.exists) {
      const data = await doc.data();
      return data.user.user;
    } else {
      const user = {
        user: { ...auth0User },
        block_interval: blockInterval,
        block_size: blockSize,
        time_range: timeRange,
        table_title: tableTitle,
        current_time_on_top: currentTimeOnTop,
        day_columns: dayColumns,
      };
      db.collection('users')
        .doc(auth0User.name)
        .set({
          user,
        })
        .then(() => {
          console.log('Document written with ID: ', auth0User.name);
        })
        .catch((e) => {
          console.error('Error adding document: ', e);
        });
      return user.user;
    }
  });
  return user;
};

/**
 * Fetch table settings from Firbase by username
 * @param {string} username
 * @returns Table settings as an object
 */
export const firebaseGetTableData = async (username) => {
  const docRef = db.collection('users').doc(username);
  const result = docRef
    .get()
    .then(async (doc) => {
      const data = await doc.data();
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

export const firebaseUpdateDayColumn = (dayColumn, username) => {
  const docRef = db.collection('users').doc(username);
  docRef.update({
    'user.day_columns': dayColumn,
  });
};

export const firebaseUpdateTableSettings = (setting, value, username) => {
  const docRef = db.collection('users').doc(username);
  switch (setting) {
    case 'block_interval':
      docRef.update({
        'user.block_interval': value,
      });
      break;
    case 'block_size':
      docRef.update({
        'user.block_size': value,
      });
      break;
    case 'current_time_on_top':
      docRef.update({
        'user.current_time_on_top': value,
      });
      break;
    case 'time_range':
      docRef.update({
        'user.time_range': value,
      });
      break;
    case 'table_title':
      docRef.update({
        'user.table_title': value,
      });
      break;
    default:
      console.error('No matching setting');
  }
};
