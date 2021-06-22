import * as jwt from 'jsonwebtoken';

export default function generateToken(args) {
  return args.reduce((acc, { name, options: { payload, secret, options } }) => {
    return { ...acc, [name]: jwt.sign(payload, secret, options) };
  }, {});
}
