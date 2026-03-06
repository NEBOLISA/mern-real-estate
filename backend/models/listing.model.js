import moongose from 'mongoose';

const listingSchema = new moongose.Schema(
  {
    user: {
      type: moongose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: { type: String, required: true },
    description: { type: String },
    address: { type: String, required: true },
    sellOrRent: { type: String, enum: ['sell', 'rent'], default: 'rent' },
    furnished: { type: Boolean, default: false },
    parkingSpot: { type: Boolean, default: false },
    offer: { type: Boolean, default: false },
    beds: { type: Number, default: 1 },
    baths: { type: Number, default: 1 },
    regularPrice: { type: Number, required: true },
    discountedPrice: { type: Number, default: 0 },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true }
  },
  { timestamps: true }
)

const Listing = moongose.model("Listing", listingSchema)
export default Listing