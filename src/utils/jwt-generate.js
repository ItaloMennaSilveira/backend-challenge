import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env'

const generateJWT = (user = {}) => {
  const { id, username, role } = user
  return {
    ...user,
    token: jwt.sign({ sub: { id, username, roleName: role.name } }, JWT_SECRET, { expiresIn: '4h' })
  }
}

export default generateJWT
