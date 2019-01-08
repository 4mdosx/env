// import { normalize, schema } from 'normalizr';
import { schema } from 'normalizr'
// import * as fetch from 'isomorphic-fetch'

export interface PostLit {
  doc_id: string,
  title: string,
  summary: string,
  doctype: 'plain' | 'markdown',
  update_at: Date | string
}

export interface UserInterface {
  id: string,
  name: string,
  email: string
}

const AgentSetting = new schema.Entity('AgentSetting', {}, {
  idAttribute: (user: UserInterface) => user.name.toLowerCase()
})

// const postSchema = new schema.Entity('post', {
//   author: userSchema
// }, {
//   idAttribute: (repo: any) => repo.fullName.toLowerCase()
// })

export const Schemas = {
  AgentSetting
}