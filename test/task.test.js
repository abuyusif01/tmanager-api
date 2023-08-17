const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const app = require('../index');
const { Task } = require('../server/models');
const createStatsCollector = require('mocha/lib/stats-collector');

chai.use(chaiHttp);


describe('Task API Tests', () => {
    before(async () => {
        // Ensure the database is in a clean state before running tests
        await Task.destroy({ where: {}, truncate: true });
    });

    /**
     * by default sequelize adds createdAt and updatedAt fields to all models
     * this function removes them from the object so we can compare the rest of the fields
     * @param  {...any} props
     * @returns {Object}
     */
    Object.prototype.exclude = function (...props) {
        const clone = { ...this };
        for (const prop of props) {
            delete clone[prop];
        }
        return clone;
    }

    describe('GET /api/tasks', () => {
        it('should get all tasks', async () => {
            const response = await chai.request(app).get('/api/tasks');
            expect(response).to.have.status(200);
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.equal(0);
        });
    });

    describe('POST /api/task', () => {
        it('should create a new task', async () => {
            const newTaskData = {
                title: 'Test Task',
                description: 'Test Description',
                completed: false,
            };

            const response = await chai.request(app)
                .post('/api/task')
                .send(newTaskData);

            expect(response).to.have.status(201);
            expect(response.body).to.have.property('title', newTaskData.title);
            expect(response.body).to.have.property('description', newTaskData.description);
            expect(response.body).to.have.property('completed', newTaskData.completed);
        });
    });

    describe('GET /api/tasks/:id', () => {
        let createdTask;

        before(async () => {
            const newTaskData = {
                title: 'Task to Get',
                description: 'Description to Get',
                completed: true,
            };

            const response = await chai.request(app)
                .post('/api/task')
                .send(newTaskData);

            createdTask = response.body;
        });

        it('should get a task by ID', async () => {
            const response = await chai.request(app).get(`/api/tasks/${createdTask.id}`);
            expect(response).to.have.status(200);
            expect(response.body.exclude('createdAt', 'updatedAt')).to.deep.equal(createdTask.exclude('createdAt', 'updatedAt'));
        });

        it('should return 404 for non-existing task', async () => {
            const nonExistingTaskId = createdTask.id + 1;
            const response = await chai.request(app).get(`/api/tasks/${nonExistingTaskId}`);
            expect(response).to.have.status(404);
        });
    });

    describe('PATCH /api/tasks/:id', () => {
        let createdTask;

        before(async () => {
            const newTaskData = {
                title: 'Task to Update',
                description: 'Description to Update',
                completed: false,

            };

            const response = await chai.request(app)
                .post('/api/task')
                .send(newTaskData);

            createdTask = response.body;
            createdTask = createdTask.exclude('createdAt', 'updatedAt');
        });

        it('should update a task by ID', async () => {
            let updatedData = {
                title: 'Updated Task',
                description: 'Updated Description',
                completed: true,
            };

            const response = await chai.request(app)
                .patch(`/api/tasks/${createdTask.id}`)
                .send(updatedData);

            
            expect(response).to.have.status(200);
            expect(response.body.exclude('createdAt', 'updatedAt')).to.deep.equal({ ...createdTask, ...updatedData });
        });

        it('should return 404 for non-existing task', async () => {
            const nonExistingTaskId = createdTask.id + 1;
            const updatedData = {
                title: 'Updated Task',
                description: 'Updated Description',
                completed: true,
            };

            const response = await chai.request(app)
                .patch(`/api/tasks/${nonExistingTaskId}`)
                .send(updatedData);

            expect(response).to.have.status(404);
        });
    });

    describe('DELETE /api/tasks/:id', () => {
        let createdTask;

        before(async () => {
            const newTaskData = {
                title: 'Task to Delete',
                description: 'Description to Delete',
                completed: false,
            };

            const response = await chai.request(app)
                .post('/api/task')
                .send(newTaskData);

            createdTask = response.body;
        });

        it('should delete a task by ID', async () => {
            const response = await chai.request(app).delete(`/api/tasks/${createdTask.id}`);
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('message', 'Task deleted successfully');
        });

        it('should return 404 for non-existing task', async () => {
            const nonExistingTaskId = createdTask.id + 1;
            const response = await chai.request(app).delete(`/api/tasks/${nonExistingTaskId}`);
            expect(response).to.have.status(404);
        });
    });
});
