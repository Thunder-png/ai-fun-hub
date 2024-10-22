import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://arfyldrm0606:ij87XCKbk7ss5Q82@cluster0.1eexh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Bağlantı başarısızsa uygulamayı kapat
  }
};

export default connectDB;
