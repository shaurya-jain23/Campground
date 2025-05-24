const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random()* array.length)]

const seedDB = async ()=>{
    await Campground.deleteMany({});
    for(let i= 0; i<50; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = await new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            author: '682e1213881a4530a150329c',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, voluptatem. Nesciunt, voluptates. Quos, quod. Quisquam quidem, iure, quos, voluptates, doloremque nesciunt quas voluptatem tempora quibusdam autem. Quisquam, quos. Quisquam, quos.',
            price,
            images: [
                        {
                            url: 'https://res.cloudinary.com/doykrr6zz/image/upload/v1748064660/YelpCamp/llqx7w1uod6gfzdqxn5h.jpg',
                            filename: 'YelpCamp/llqx7w1uod6gfzdqxn5h',
                        },
                        {
                            url: 'https://res.cloudinary.com/doykrr6zz/image/upload/v1748064661/YelpCamp/fqqov5xjawymoyrwe8ic.jpg',
                            filename: 'YelpCamp/fqqov5xjawymoyrwe8ic',
                        },
                        {
                            url: 'https://res.cloudinary.com/doykrr6zz/image/upload/v1748064661/YelpCamp/wm0etgplg0qmxfrq3o8k.jpg',
                            filename: 'YelpCamp/wm0etgplg0qmxfrq3o8k',
                        }
                    ]
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    db.close();
})