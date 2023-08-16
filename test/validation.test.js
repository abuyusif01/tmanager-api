const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const app = require('../index');

chai.use(chaiHttp);

describe('Validation Middleware', () => {
    it('should return 400 for missing title during task creation', async () => {
        const taskData = {
            description: 'Test Description',
            completed: false,
        };

        const response = await chai.request(app)
            .post('/api/tasks')
            .send(taskData);

        expect(response).to.have.status(400);
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.be.an('array');
        expect(response.body.errors[0]).to.have.property('msg', 'Title is required');
    });

    it('should return 400 for missing description during task creation', async () => {
        const taskData = {
            title: 'Test Title',
            completed: false,
        };

        const response = await chai.request(app)
            .post('/api/tasks')
            .send(taskData);

        expect(response).to.have.status(400);
        expect(response.body).to.have.property('errors');
        expect(response.body.errors).to.be.an('array');
        expect(response.body.errors[0]).to.have.property('msg', 'Description is required');
    });
});