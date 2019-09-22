/* eslint-env jest */
import app from '../src/config/server'
import request from 'supertest'
import { Database } from '../src/utils'
import UserFactory from './factory/user-factory'
import JobFactory from './factory/job-factory'

let server
let user
let job
const knex = new Database()

describe('TEST JOBS', () => {
  beforeEach(async () => {
    await knex.create()
    server = app.listen()
    user   = await UserFactory()
    job    = await JobFactory()
  })

  afterEach(async () => {
    await knex.destroy()
    server.close()
  })

  describe('POST /v1/jobs', () => {
    test('should create a new job', async () => {
      const response = await request(server)
        .post('/v1/jobs')
        .send({ description: 'Test Job' })
        .set('Authorization', user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'description'])
      )
    })
  })

  describe('GET /v1/jobs', () => {
    test('should return a list of jobs', async () => {
      const response = await request(server)
        .get('/v1/jobs')
        .set('Authorization', user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body[0])).toEqual(
        expect.arrayContaining(['id', 'description'])
      )
    })
  })

  describe('GET /v1/jobs/:id', () => {
    test('should return a job', async () => {
      const response = await request(server)
        .get(`/v1/jobs/${job.id}`)
        .set('Authorization', user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'description'])
      )
    })
  })

  describe('PUT /v1/jobs/:id', () => {
    test('should update a job', async () => {
      const response = await request(server)
        .put(`/v1/jobs/${job.id}`)
        .set('Authorization', user.token)
        .send({ description: 'Update Test Job' })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'description'])
      )
    })
  })

  describe('DELETE /v1/jobs/:id', async () => {
    test('should delete a job', async () => {
      const response = await request(server)
        .delete(`/v1/jobs/${job.id}`)
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
