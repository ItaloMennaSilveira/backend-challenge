/* eslint-env jest */
import app from '../src/config/server'
import request from 'supertest'
import UserFactory from './factory/user-factory'
import JobFactory from './factory/job-factory'
import ApplicationFactory from './factory/application-factory'
import {
  hashPassword,
  stringGenerator,
  emailGenerator,
  Database
} from '../src/utils'

let server
let user
let role
let job
let candidateToApply
let application
const knex = new Database()

describe('TEST APPLICATIONS', () => {
  beforeEach(async () => {
    await knex.create()
    server = app.listen()
    job = await JobFactory()
    user = await UserFactory()
    candidateToApply = await UserFactory('candidate')
    application = await ApplicationFactory()
  })

  afterEach(async () => {
    await knex.destroy()
    server.close()
  })

  describe('POST /v1/applications', () => {
    test('should create a new application', async () => {
      const response = await request(server)
        .post('/v1/applications')
        .send({ 
          commentary: 'Commentary Test',
          user_id: candidateToApply.id,
          job_id: job.id
        })
        .set('Authorization', user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'commentary'])
      )
    })
  })

  describe('GET /v1/applications', () => {
    test('should return a list of application', async () => {
      const response = await request(server)
        .get('/v1/applications')
        .set('Authorization', user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body[0])).toEqual(
        expect.arrayContaining(['id', 'commentary'])
      )
    })
  })

  describe('GET /v1/applications/:id', () => {
    test('should return a application', async () => {
      const response = await request(server)
        .get(`/v1/applications/${application.id}`)
        .set('Authorization', user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'commentary'])
      )
    })
  })

  describe('PUT /v1/applications/:id', () => {
    test('should update a application', async () => {
      const response = await request(server)
        .put(`/v1/applications/${application.id}`)
        .set('Authorization', user.token)
        .send({ commentary: 'Update Test application' })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'commentary'])
      )
    })
  })

  describe('DELETE /v1/applications/:id', async () => {
    test('should delete a application', async () => {
      const response = await request(server)
        .delete(`/v1/applications/${application.id}`)
        .set('Authorization', user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining([
          'id'
        ])
      )
    })
  })
})
