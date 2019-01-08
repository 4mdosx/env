const Service = require('egg').Service

const validWrite = new Set([2, 3, 6, 7])

class permission extends Service {
  async w (moduleName) {
    let result = false
    let permission
    let userWithAuth
    if (this.ctx.isAuthenticated()) {
      const { u_id } = this.ctx.auth
      const user = await this.ctx.service.user.find(u_id)
      permission = await this.app.mysql.get('role', {id: user.role})
      if (permission && validWrite.has(permission[moduleName])) {
        result = true
      }
    }
    if (result) {
      return true
    } else {
      throw new Error('Not Permission, now user\'s permission is: ' + JSON.stringify(permission))
    }
  }
  r () { return false }
  x () { return false }
  async getRoleName (id) {
    const role = await this.app.mysql.get('role', {id})
    return role ? role.alias : 'no exist'
  }
}

module.exports = permission
