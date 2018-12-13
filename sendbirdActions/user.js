import SendBird from 'sendbird';

const APP_ID = 'DB1DDFB5-2EA6-44D1-AEAA-74E33BB11119';

export const sbConnect = userId => {
  return new Promise((resolve, reject) => {
    const sb = new SendBird({ appId: APP_ID });
    sb.connect(
      userId,
      (user, error) => {
        if (error) {
          reject('SendBird Login Failed.');
        } else {
          resolve(user);
        }
      }
    );
  });
};
