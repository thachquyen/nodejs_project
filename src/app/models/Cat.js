import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import slugify from 'slugify';

const Cat = new Schema({
    name: { type: String, index: true, required: true },
    color: { type: String, min: 180, default: 'white' },
    eyes: { type: String, default: 'blue' },
    description: { type: String, default: 'Cats is a friends', Maxlength: 600 },
    image: { type: String, default: '' },
    slug: { type: String, unique: true },
    video: { type: String, default: '' }

}, {timestamps: true});

Cat.pre('save', function(next) {
    if (!this.slug) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

export default mongoose.model('Cat', Cat);