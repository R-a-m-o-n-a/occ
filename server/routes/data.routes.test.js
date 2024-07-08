import supertest from 'supertest';
import { getServer, stopServer } from '../server';
import { cityDataMatcher } from '../util/expectMatchers.js';

describe('getCityData function', () => {
  let server, agent;

  beforeEach(() => {
    server = getServer();
    agent = supertest.agent(server);
  });

  afterEach(async () => {
    await stopServer();
  });

  test('should get city data', async () => {
    const response = await agent.get('/data/cities');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(cityDataMatcher);
  });
});
