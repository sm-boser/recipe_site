const prepare = require('mocha-prepare')
const mongoUnit = require('mongo-unit');
const mongoose = require('mongoose');
const {expect} = require('chai');
const testData = require('./testData.json');
const videoController = require('../controllers/videoController')

prepare(done => mongoUnit.start().then(() => {
    console.log('Fake mongo is started', mongoUnit.getUrl())
    process.env.MONGO_URL = mongoUnit.getUrl()
    done()
}))


describe('E2E', () => {
    before(()=> {
        mongoose.connect(process.env.MONGO_URL)
    })
    beforeEach(() => mongoUnit.load(testData));
    afterEach(() => mongoUnit.drop());

    it('Should return all data', () => {
        return videoController.getAllVideoFn()
        .then(res => {
            expect(res).not.equal(null);
            expect(res.length).to.equal(3)
        })
    })
})

after(() => {
    console.log('--------------stop------------------')
    mongoose.disconnect();
    return mongoUnit.stop()
})
