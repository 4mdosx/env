const Service = require('egg').Service
const SQLHelper = require('../../utils/SQLHelper')
const _ = require('lodash')

class DocService extends Service {
  async create ({title, uri_name, content, summary = '', owner_uid, doctype, tag}) {
    let result
    const now = this.app.mysql.literals.now
    const docId = this.ctx.service.crypto.uuid(title)
    const saveResult = await this.app.mysql.beginTransactionScope(async conn => {
      const resultTemp = await conn.insert('document',
      {title, uri_name, content, summary, doctype, owner_uid, doc_id: docId, removed: 0, create_at: now, update_at: now})
      for (let tagItem of tag) {
        await conn.insert('document_tag', {doc_id: docId, tag_id: tagItem.tag_id})
      }
      return resultTemp
    }, this.ctx)
    if (saveResult.insertId) {
      result = await this.find(docId)
    } else {
      result = {error: true}
    }
    return result
  }

  async find (docId) {
    const doc = await this.app.mysql.get('document', {doc_id: docId})
    const tagDoc = await this.appendTag(doc)
    return tagDoc
  }

  async matchURI (uri_name) {
    const doc = await this.app.mysql.get('document', {uri_name})
    const tagDoc = await this.appendTag(doc)
    return tagDoc
  }

  async appendTag (doc, omitKey = []) {
    if (!doc) {
      return doc
    }
    const iterator = doc[Symbol.iterator] ? doc : [doc]
    const withTag = []
    for (let doc of iterator) {
      const tag = await this.app.mysql.query(
        `SELECT link.tag_id tag_id, tag.name
          FROM document_tag link INNER JOIN tag
          ON link.tag_id = tag.tag_id
          WHERE doc_id = ?`, [doc.doc_id]
      )
      withTag.push(_.omit({...doc, tag}, ['id', ...omitKey]))
    }
    return doc[Symbol.iterator] ? withTag : withTag[0]
  }

  async list ({ limit = 15, offset = 0 }) {
    const docList = await this.app.mysql.select('document', {
      where: {removed: 0},
      columns: ['title', 'doctype', 'summary', 'id', 'doc_id', 'owner_uid', 'update_at', 'create_at'],
      orders: [['update_at', 'desc'], ['id', 'desc']],
      limit,
      offset
    })
    const tagDocList = await this.appendTag(docList)
    const count = await this.app.mysql.count('document', {removed: 0})
    return { list: tagDocList, count, limit, offset }
  }
  
  async query (queryStr, { limit = 15, offset = 0 }) {
    const { where, values } = SQLHelper.makeANDWHERE({...queryStr, removed: '0'})
    const docList = await this.app.mysql.query(
      `SELECT DISTINCT doc.doc_id, doc.*
      FROM document doc LEFT JOIN document_tag link
      ON doc.doc_id = link.doc_id
      ${where}
      ORDER BY doc.update_at DESC
      LIMIT ?
      OFFSET ?
      `, [...values, limit, offset]
    )
    docList.forEach(doc => {
      delete doc.content
      delete doc.removed
    })
    const tagDocList = await this.appendTag(docList, ['tag_id'])
    const { count } = await await this.app.mysql.queryOne(
      `SELECT count(t.doc_id) count FROM 
      (SELECT DISTINCT doc.doc_id
      FROM document doc LEFT JOIN document_tag link
      ON doc.doc_id = link.doc_id
      ${where}) t
      `, values
    )
    return { list: tagDocList, count, limit, offset }
  }

  async update ({tag, doc_id, ...data}) {
    let result = {}
    const now = this.app.mysql.literals.now
    const newDoc = _.omit(data, 'create_at')
    const saveResult = await this.app.mysql.beginTransactionScope(async conn => {
      const resultTemp = await conn.update('document',
        {...newDoc, removed: 0, update_at: now},
        {where: { doc_id }}
      )
      if (tag) {
        await conn.delete('document_tag', { doc_id })
        for (let tagItem of (tag)) {
          await conn.insert('document_tag', {doc_id, tag_id: tagItem.tag_id})
        }
      }
      return resultTemp
    }, this.ctx)
    if (saveResult.changedRows) {
      result = await this.find(doc_id)
    } else {
      result = { error: 'can\'t match' }
    }
    return result
  }

  async markRemove (docId) {
    const row = {
      removed: 1,
      update_at: this.app.mysql.literals.now
    }
    const result = await this.app.mysql.update('document', row, {where: { doc_id: docId }})
    return result
  }
}

module.exports = DocService
