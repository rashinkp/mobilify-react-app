import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

const ProductReviewForm = ({ order }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [formData, setFormData] = useState({
    rating: 0,
    title: "",
    description: "",
  });

  // Simulating form validation without react-hook-form for demo
  const isReviewValid =
    formData.rating > 0 &&
    formData.title.trim().length > 0 &&
    formData.description.trim().length > 0;

  useEffect(() => {
    // For new reviews, consider the form changed if any field has a value
    if (!review) {
      setIsFormChanged(
        formData.rating > 0 ||
          formData.title.trim().length > 0 ||
          formData.description.trim().length > 0
      );
      return;
    }

    // For existing reviews, compare with previous values
    const hasChanged =
      formData.rating !== review.rating ||
      formData.title !== review.title ||
      formData.description !== review.description;

    setIsFormChanged(hasChanged);
  }, [formData, review]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getButtonText = () => {
    if (!formData.rating) return "Please Add Rating";
    if (!formData.title?.trim()) return "Please Add Review Title";
    if (!formData.description?.trim()) return "Please Add Review Description";
    if (!isFormChanged) return "No Changes Made";
    return "Submit Review";
  };

  return (
    <div className="mx-auto p-6 bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {review ? "Update Review" : "Write a Review"}
      </h2>

      <form className="space-y-6">
        {/* Star Rating */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none"
                onClick={() => handleInputChange("rating", star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || formData.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Review Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Review Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Summarize your review"
          />
        </div>

        {/* Review Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Review Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Write your detailed review here..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!isFormChanged || !isReviewValid}
        >
          {getButtonText()}
        </button>
      </form>
    </div>
  );
};

export default ProductReviewForm;
