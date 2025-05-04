import mongoose from 'mongoose';

async function connect(){
   await mongoose.connect('mongodb://localhost:27017/orange_cat_db')
       .then(() => console.log('Connect successfully!'))
       .catch((err) => console.log('Connect failed with error: !'));
}

export default { connect };