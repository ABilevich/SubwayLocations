import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

const store = {
	id: 1,
	name: 'Subway',
	street_address: '1800 Duke St, Ste 100',
	city: 'Alexandria',
	state: {
		name: 'Virginia',
		abbreviation: 'VA',
	},
	zip_code: '22314',
	country: 'USA',
	latitude: '38.8043',
	longitude: '-77.0611',
	is_open: true,
};

const gql = '/graphql';

describe('GraphQL AppResolver (e2e) {Supertest}', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	describe(gql, () => {
		describe('stores', () => {
			it('should get the store with id 1', () => {
				return request(app.getHttpServer())
					.post(gql)
					.send({
						query: '{store (id: 1) {id,name,street_address,city,state {name,abbreviation,},zip_code,country,latitude,longitude,is_open}}',
					})
					.expect(200)
					.expect((res) => {
						expect(res.body.data.store).toEqual(store);
					});
			});
			it('should get the five stores with', () => {
				return request(app.getHttpServer())
					.post(gql)
					.send({
						query: '{stores (page: 0, perPage: 5) {id,name,street_address,city,state {name,abbreviation,},zip_code,country,latitude,longitude,is_open}}',
					})
					.expect(200)
					.expect((res) => {
						expect(res.body.data.stores).toHaveLength(5);
					});
			});
			it('should get a store in the state of Florida', () => {
				return request(app.getHttpServer())
					.post(gql)
					.send({
						query: '{findClosestStoreToLocation (lat: 25.808958, lon: -80.196953) {id,name,street_address,city,state {name,abbreviation,},zip_code,country,latitude,longitude,is_open}}',
					})
					.expect(200)
					.expect((res) => {
						expect(
							res.body.data.findClosestStoreToLocation?.state
								?.name,
						).toBe('Florida');
					});
			});
		});
	});
});
