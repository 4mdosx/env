const Service = require('egg').Service

class TagService extends Service {
  async create ({name, comment}) {
    const tagId = this.ctx.service.crypto.uuid(name)
    const saveResult = await this.app.mysql.insert('tag', {
      tag_id: tagId,
      name,
      comment
    })
    let result
    if (saveResult.insertId) {
      result = await this.find(tagId)
    } else {
      result = {error: true}
    }
    return result
  }

  async update ({id, name, comment}) {
    const saveResult = await this.app.mysql.update('tag', {
      name,
      comment
    }, {
      where: {
        tag_id: id
      }
    })
    let result
    if (saveResult.affectedRows) {
      result = await this.find(id)
    } else {
      result = {error: true, saveResult}
    }
    return result
  }

  async find (query) {
    const tag = await this.app.mysql.query(
      'SELECT * FROM tag WHERE tag_id = ? OR name = ?', [query, query]
    )
    return {...tag[0], id: undefined}
  }

  async listAll () {
    const tagList = await this.app.mysql.select('tag')
    return tagList.map(tag => ({...tag, id: undefined}))
  }
}

module.exports = TagService
