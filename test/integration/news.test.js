const request = require('supertest');
const { app } = require('../../index');
const mysql = require('../../src/lib/mysql');

describe('POST /news', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(done);
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should create a new record in the news table', async () => {
        const new_data = {
            title: "dummy-title",
            description: 'dummy description',
            tourId: '1',
            matchId: '2'
        }
        const response = await request(server).post('/news').send(new_data);
        expect(response.status).toBe(200);
    });
});


describe('GET /api/news/matches/:matchId', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(done);
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should return news related to a specific matchId', async () => {
        await mysql.query('insert into sports (name) values (?)', ['dummy-sport-1']);
        await mysql.query('insert into tours (name, sportId) values (?, ?)', ['dummy-tour', 1]);
        await mysql.query('INSERT INTO matches (name, tourId) VALUES (?, ?)', ['Dummy Match', 1]);
        await mysql.query('INSERT INTO news (title, description, matchId) VALUES (?, ?, ?)', ['News Title', 'News Description', 1]);

        const matchId = 1;

        const response = await request(app).get(`/api/news/matches/${matchId}`);

        expect(response.status).toBe(200);
        const newsItems = response.body;
        const hasMatchId = newsItems.some((item) => item.matchId === matchId);
        expect(hasMatchId).toBe(true);
    });

    it('should return an empty array body for a non-existant matchId', async () => {

        const matchId = 109820983;
        const response = await request(app).get(`/api/news/matches/${matchId}`);
        
        expect(response.status).toBe(200);
        const newsItems = response.body;
        expect(newsItems).toHaveLength(0);
    })

});

describe('GET /api/news/tours/:tourId', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(done);
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should return news related to a specific tourId', async () => {
        await mysql.query('insert into sports (name) values (?)', ['dummy-sport-1']);
        await mysql.query('insert into tours (name, sportId) values (?, ?)', ['dummy-tour', 1]);
        await mysql.query('INSERT INTO matches (name, tourId) VALUES (?, ?)', ['Dummy Match', 1]);
        await mysql.query('INSERT INTO news (title, description, matchId) VALUES (?, ?, ?)', ['News Title', 'News Description', 1]);

        const tourId = 1;
        const response = await request(app).get(`/api/news/tours/${tourId}`);
        expect(response.status).toBe(200);
        const newsItems = response.body;
        const hasTourId = newsItems.some((item) => item.tourId === tourId);
        expect(hasTourId).toBe(true);
    });

});


describe('GET /api/news/sports/:sportId', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(done);
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should return news related to a specific sportId', async () => {
        await mysql.query('insert into sports (name) values (?)', ['dummy-sport-1']);
        await mysql.query('insert into tours (name, sportId) values (?, ?)', ['dummy-tour', 1]);
        await mysql.query('INSERT INTO matches (name, tourId) VALUES (?, ?)', ['Dummy Match', 1]);
        await mysql.query('INSERT INTO news (title, description, matchId) VALUES (?, ?, ?)', ['News Title', 'News Description', 1]);

        const sportId = 1;
        const response = await request(app).get(`/api/news/sports${sportId}`);
        expect(response.status).toBe(200);
        const newsItems = response.body;
        expect(newsItems).toHaveLength(1);
    });
})
