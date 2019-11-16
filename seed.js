const db = require('./js/server/db')
// Require all models
const Plant = require('./js/server/db/models/plant');
const Garden = require('./js/server/db/models/garden')
const User = require('./js/server/db/models/user')

// Create arrays of objects for each model
const plants = [
  {
    title: 'Dog',
    source: './res/pet_dog1/Dog.obj',
    thumbnail: './res/placeholder-square.jpg',
    resources: [
      './res/pet_dog1/Dog.mtl',
      './res/pet_dog1/Diffuse.png',
      './res/pet_dog1/Specular.png'
    ],
    // position: [-0.5, 0.5, -1],
    // scale: [0.2, 0.2, 0.2],
    type: 'OBJ'
  },
  {
    title: 'Bush',
    source: './res/plant_bush1/bush.obj',
    thumbnail: './res/placeholder-square.jpg',
    resources: [
      './res/plant_bush1/bush.mtl',
      './res/plant_bush1/bush01.png',
      './res/plant_bush1/bush02.png',
      './res/plant_bush1/bush03.png'
    ],
    // position: [-0.5, 0.5, -1],
    // scale: [0.2, 0.2, 0.2],
    type: 'OBJ'
  },
  {
    title: 'Chair',
    source: './res/furniture_chair1/OBJ.obj',
    thumbnail: './res/placeholder-square.jpg',
    resources: [
      './res/furniture_chair1/Dirt.jpg',
      './res/furniture_chair1/Pillow.jpg',
      './res/furniture_chair1/Wood.jpg'
    ],
    // position: [-0.5, 0.5, -1],
    // scale: [0.2, 0.2, 0.2],
    type: 'OBJ'
  },
  {
    title: 'Smiley',
    source: './res/emoji_smile/emoji_smile.vrx',
    thumbnail: './res/placeholder-square.jpg',
    resources: [
      './res/emoji_smile/emoji_smile_diffuse.png',
      './res/emoji_smile/emoji_smile_normal.png',
      './res/emoji_smile/emoji_smile_specular.png'
    ],
    // position: [-0.5, 0.5, -1],
    // scale: [0.2, 0.2, 0.2],
    type: 'VRX'
  }
]

const gardens = [
  {
    title: 'Shaded Garden by Garage',
    userId: 1
  },
  {
    title: 'Polinator Garden',
    userId: 1
  },
  {
    title: 'Vegetable Garden',
    userId: 2
  }
]

const users = [
  {
    email: 'jane.doe@aol.com',
    password: 'bird'
  },
  {
    email: 'blah.doe@gmail.com',
    password: 'duck'
  }
]

// ONLY done during dev. The force: true should be removed for prod.
const seed = async () => {
  await db.sync({ force: true })
  console.log('db synced!')

  await Promise.all(
    plants.map(plant => {
      return Plant.create(plant);
    })
  );

  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )
  console.log(`seeded ${users.length} users`)

  await Promise.all(
    gardens.map(garden => {
      return Garden.create(garden)
    })
  )

  console.log('Seeding success!')
  db.close()
}

seed().catch(err => {
  console.error('Oh noes! Something went wrong!')
  console.error(err)
  db.close()
})
