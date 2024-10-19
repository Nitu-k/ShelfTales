import request from 'supertest';
import { Client } from 'pg';
import dotenv from 'dotenv';
import app from '../index.js'; // Adjust the path according to your folder structure

dotenv.config();

let db;

beforeAll(async () => {
    // Setup the database connection
    db = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    await db.connect();
});

afterAll(async () => {
    // Close the database connection
    await db.end();
});

describe('Books App API Endpoints', () => {

    it('should return books sorted by rating', async () => {
        const res = await request(app).get('/rating');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain("Sorted by rating");
    });

    it('should return books sorted alphabetically', async () => {
        const res = await request(app).get('/alphabetically');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain("Sorted lexicographycally");
    });

    it('should return books of genre fiction', async () => {
        const res = await request(app).get('/fiction');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain("FICTION");
    });

    it('should return books of genre non-fiction', async () => {
        const res = await request(app).get('/nonfiction');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain("NON-FICTION");
    });


    
});
