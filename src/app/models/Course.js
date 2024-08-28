const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema;

// Utility function to generate slugs
const generateSlug = async function(name) {
    let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let count = await mongoose.models.Course.countDocuments({ slug: new RegExp(`^${slug}(-[0-9]*)?$`) });

    if (count > 0) slug = `${slug}-${count + 1}`;
    return slug;
};

const Course = new Schema({
    name: { type: String, required: true },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, required: true },
    level: { type: String, maxLength: 255 },
    slug: { type: String, unique: true },
}, {
    timestamps: true,
}
);

// Middleware to generate slug before saving
Course.pre('save', async function(next) {
    if (!this.slug) {
        this.slug = await generateSlug(this.name);
    }
    next();
});

module.exports = mongoose.model('Course', Course);
