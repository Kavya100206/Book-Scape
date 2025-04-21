// components/ReviewModal.jsx
import { useState } from 'react';

const ReviewModal = ({ book, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');

  // const handleSubmit = () => {
  //   if (rating && description.trim()) {
  //     const review = {
  //       bookId: book.id,
  //       title: book.volumeInfo?.title || '',
  //       rating,
  //       description,
  //       timestamp: new Date().toISOString()
  //     };
  //     onSubmit(review);
  //     onClose();
  //   }
  // };

  const handleSubmit = () => {
    const review = {
      bookId: book.id,
      rating,
      description,
    };

    onSubmit(review);
    onClose(); // This is crucial to close the modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-4">Review: {book.volumeInfo?.title}</h2>
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          className="w-full border border-gray-300 p-2 rounded mb-4"
          rows={3}
          placeholder="Write your thoughts..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
