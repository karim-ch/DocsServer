import generateToken from './generateToken';

const secret = '123456789';

export default function geTokens(payload) {
  return generateToken([
    {
      name: 'token',
      options: {
        payload,
        secret,
        options: { expiresIn: 1 },
      },
    },
  ]);
}
