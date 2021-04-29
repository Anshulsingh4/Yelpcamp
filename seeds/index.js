const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '608690b536a290460349f783',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images:
                [{
                    url:
                        'https://res.cloudinary.com/anshulsingh4/image/upload/v1619587035/YelpCamp/ayym4lhbbixhhndjoycx.png',
                    filename: 'YelpCamp/ayym4lhbbixhhndjoycx'
                },
                {
                    url:
                        'https://res.cloudinary.com/anshulsingh4/image/upload/v1619587038/YelpCamp/pkaypefy57rjfal81azj.png',
                    filename: 'YelpCamp/pkaypefy57rjfal81azj'
                },
                {
                    url:
                        'https://res.cloudinary.com/anshulsingh4/image/upload/v1619587043/YelpCamp/fit2bxbuazezyarvjta9.png',
                    filename: 'YelpCamp/fit2bxbuazezyarvjta9'
                }],

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})