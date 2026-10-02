import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Star, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

export const AdminReviews: React.FC = () => {
  const { reviews, updateReviewStatus } = useStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif-luxury text-3xl font-semibold text-[#092328]">
          Review Moderation & Trust Center
        </h1>
        <p className="text-xs text-[#092328]/60 mt-0.5">
          Curate verified customer experiences, inspect fit ratings, and approve published feedback.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#092328]/10 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-[#092328]/10 flex justify-between items-center text-xs">
          <span className="font-semibold text-[#092328]">
            Total Reviews: {reviews.length} (
            {reviews.filter((r) => r.status === 'pending').length} Pending Moderation)
          </span>
        </div>

        <div className="divide-y divide-[#092328]/10">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-6 space-y-3 hover:bg-[#FAF8F5]/50 transition-colors">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-xs text-[#092328]">{rev.customerName}</h4>
                    {rev.verifiedPurchase && (
                      <span className="text-[10px] bg-[#8BBB92]/20 text-[#12544F] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-[#2A835F]" /> Verified Order {rev.orderId}
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        rev.status === 'approved'
                          ? 'bg-[#2A835F]/20 text-[#2A835F]'
                          : rev.status === 'rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {rev.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#092328]/60 mt-0.5">
                    Garment: <strong className="text-[#092328]">{rev.productTitle}</strong> · {new Date(rev.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Rating Stars & Actions */}
                <div className="flex items-center gap-4">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {rev.status !== 'approved' && (
                      <button
                        onClick={() => updateReviewStatus(rev.id, 'approved')}
                        className="px-3 py-1 bg-[#2A835F] text-white rounded-lg text-xs font-semibold hover:bg-[#12544F] transition-colors cursor-pointer"
                      >
                        Approve
                      </button>
                    )}
                    {rev.status !== 'rejected' && (
                      <button
                        onClick={() => updateReviewStatus(rev.id, 'rejected')}
                        className="px-3 py-1 bg-white border border-rose-300 text-rose-700 rounded-lg text-xs font-semibold hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold text-[#092328]">{rev.title}</h5>
                <p className="text-xs text-[#092328]/70 leading-relaxed mt-1">{rev.comment}</p>
              </div>

              <div className="flex gap-4 text-[11px] text-[#092328]/50 pt-1">
                <span>Fabric Quality: {rev.qualityRating}/5</span>
                <span>·</span>
                <span>Fit Accuracy: {rev.fitRating}/5</span>
                <span>·</span>
                <span>Comfort Rating: {rev.comfortRating}/5</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
