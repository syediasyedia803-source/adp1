import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Star, Sparkles, Check } from 'lucide-react';

export const ReviewModal: React.FC = () => {
  const { reviewingItem, setReviewingItem, addReview, customer, showToast } = useStore();

  const [rating, setRating] = useState(5);
  const [qualityRating, setQualityRating] = useState(5);
  const [fitRating, setFitRating] = useState(5);
  const [comfortRating, setComfortRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  if (!reviewingItem) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !comment) {
      showToast('Please provide a review title and comment', 'error');
      return;
    }

    addReview({
      productId: reviewingItem.productId,
      productTitle: reviewingItem.productTitle,
      customerId: customer?.id || 'cust-user',
      customerName: customer?.name || 'Verified Patron',
      orderId: reviewingItem.orderId,
      rating,
      qualityRating,
      fitRating,
      comfortRating,
      title,
      comment,
      verifiedPurchase: true
    });

    setReviewingItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#092328]/70 backdrop-blur-xs transition-opacity"
        onClick={() => setReviewingItem(null)}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#092328]/10 overflow-hidden">
          <div className="p-6 bg-[#092328] text-white flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#8BBB92] font-semibold">
                Verified Customer Feedback
              </span>
              <h3 className="font-serif-luxury text-xl font-normal text-white mt-0.5">
                Review Your Garment
              </h3>
            </div>
            <button
              onClick={() => setReviewingItem(null)}
              className="p-1 text-white/60 hover:text-white rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#092328]/10">
              <span className="text-[11px] text-[#092328]/50 uppercase font-medium">Garment Title</span>
              <p className="font-semibold text-xs text-[#092328]">{reviewingItem.productTitle}</p>
            </div>

            {/* Overall Rating */}
            <div>
              <label className="block text-xs font-semibold text-[#092328] uppercase mb-1.5">
                Overall Experience ({rating}/5 Stars)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? 'fill-current' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Granular Ratings */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-[#092328]/70 mb-1">
                  Fabric Quality
                </label>
                <select
                  value={qualityRating}
                  onChange={(e) => setQualityRating(Number(e.target.value))}
                  className="w-full p-2 bg-[#FAF8F5] border border-[#092328]/15 rounded-lg"
                >
                  <option value={5}>5 - Exceptional</option>
                  <option value={4}>4 - High Quality</option>
                  <option value={3}>3 - Average</option>
                  <option value={2}>2 - Below Expectation</option>
                  <option value={1}>1 - Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#092328]/70 mb-1">
                  Fit & Sizing
                </label>
                <select
                  value={fitRating}
                  onChange={(e) => setFitRating(Number(e.target.value))}
                  className="w-full p-2 bg-[#FAF8F5] border border-[#092328]/15 rounded-lg"
                >
                  <option value={5}>5 - True to Size</option>
                  <option value={4}>4 - Slightly Large</option>
                  <option value={3}>3 - Slightly Small</option>
                  <option value={2}>2 - Very Large</option>
                  <option value={1}>1 - Very Small</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#092328]/70 mb-1">
                  Comfort Rating
                </label>
                <select
                  value={comfortRating}
                  onChange={(e) => setComfortRating(Number(e.target.value))}
                  className="w-full p-2 bg-[#FAF8F5] border border-[#092328]/15 rounded-lg"
                >
                  <option value={5}>5 - Luxurious</option>
                  <option value={4}>4 - Very Comfortable</option>
                  <option value={3}>3 - Moderate</option>
                  <option value={2}>2 - Stiff Lining</option>
                  <option value={1}>1 - Uncomfortable</option>
                </select>
              </div>
            </div>

            {/* Review Title */}
            <div>
              <label className="block text-xs font-semibold text-[#092328] uppercase mb-1">
                Headline / Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Majestic velvet and stunning fit!"
                className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
              />
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-semibold text-[#092328] uppercase mb-1">
                Detailed Review *
              </label>
              <textarea
                rows={4}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Describe the fabric feel, drape, compliments received, or tailoring details..."
                className="w-full p-2.5 bg-[#FAF8F5] border border-[#092328]/20 rounded-xl focus:outline-none focus:border-[#12544F]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setReviewingItem(null)}
                className="px-4 py-2 border border-[#092328]/20 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#12544F] text-white font-semibold rounded-xl hover:bg-[#092328] cursor-pointer shadow-md"
              >
                Publish Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
