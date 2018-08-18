const Service = require('egg').Service
const manualConfig = require('../../config/manual')

class UserService extends Service {
  async signIn (payload) {
    const { email, password } = payload
    const now = this.app.mysql.literals.now
    const uid = this.service.crypto.uuid(email)
    const saveResult = await this.app.mysql.insert('user',
      {
        ...payload,
        u_id: uid,
        password: this.service.crypto.md5(password),
        role: manualConfig.register.defaultRole || 0,
        removed: 0,
        create_at: now,
        update_at: now
      }
    )
    let result
    if (saveResult.insertId) {
      result = await this.find(uid)
    } else {
      result = {error: true}
    }
    return result
  }

  async find (uid) {
    const user = await this.app.mysql.get(
      'user',
      {u_id: uid, removed: 0},
      {columns: ['u_id', 'role', 'email', 'name', 'create_at', 'update_at']}
    )
    if (user) {
      user.roleName = await this.service.permission.getRoleName(user.role)
    }
    return user
  }

  async findByAuth ({email, password}) {
    const user = await this.app.mysql.get(
      'user',
      {email, password: this.service.crypto.md5(password), removed: 0},
      {columns: ['u_id', 'email', 'role', 'name', 'create_at', 'update_at']}
    )
    if (user) {
      user.roleName = await this.service.permission.getRoleName(user.role)
    }
    return user
  }
}

module.exports = UserService
