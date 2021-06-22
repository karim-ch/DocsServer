import * as jwt from 'jsonwebtoken';

function decodeToken(token): any {
  return jwt.decode(token);
}

export default decodeToken;
