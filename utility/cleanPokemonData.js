// Used initially to clean the Pokemon data imported into MongoDB to get rid of extra properties
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/Pokemon', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to Pokemon server');

  const db = client.db('Pokemon');

  db.collection('pokemon').updateMany(
    {},
    // {
    // $unset: {national_id: '', __v: '', types: '', evolutions: ''}
    // },
    {
      $rename:{"pkdx_id": "id"}
    }
  );

  // client.close();
});