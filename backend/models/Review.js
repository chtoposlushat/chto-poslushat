import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { 
    type: String, 
    required: true,
    enum: ['рок', 'электроника', 'фолк', 'поп', 'инди', 'хип-хоп', 'андеграунд']
  },
  coverImage: { type: String },
  yandexMusicLink: { type: String },
  constructiveScore: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Review', reviewSchema);
