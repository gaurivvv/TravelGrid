import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const FeedbackReviews = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Load existing feedbacks from localStorage on component mount
  useEffect(() => {
    const storedFeedbacks = localStorage.getItem('travelGridFeedbacks');
    if (storedFeedbacks) {
      setSubmittedFeedbacks(JSON.parse(storedFeedbacks));
    }
  }, []);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 4000);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.feedback.trim()) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    // Create new feedback object
    const newFeedback = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      feedback: formData.feedback.trim(),
      timestamp: new Date().toLocaleDateString(),
      avatarColor: `bg-${['pink', 'purple', 'blue', 'green', 'yellow', 'indigo'][Math.floor(Math.random() * 6)]}-500`
    };

    // Update state and localStorage
    const updatedFeedbacks = [newFeedback, ...submittedFeedbacks];
    setSubmittedFeedbacks(updatedFeedbacks);
    localStorage.setItem('travelGridFeedbacks', JSON.stringify(updatedFeedbacks));

    // Reset form
    setFormData({ name: '', email: '', feedback: '' });
    showToast('Thank you for your feedback! 🎉', 'success');
  };

  // Handle form cancel
  const handleCancel = () => {
    setFormData({ name: '', email: '', feedback: '' });
    showToast('Form cleared', 'success');
  };

  return (
    <>
      <section className="relative py-16 px-4 transition-all duration-300">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ec4899%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        
        <div className="relative z-10 container mx-auto max-w-2xl">
          {/* Section Title */}
          <div className="text-center mb-8">
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent'
            }`}>
              Feedback & Reviews
            </h2>
            <p className={`text-base ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We value your experience! Leave your feedback or review about our website below.
            </p>
          </div>

          {/* Feedback Form */}
          <div className={`rounded-xl shadow-lg p-6 mb-10 backdrop-blur-md ${
            isDarkMode 
              ? 'bg-black/20 border border-white/20 hover:border-white/40' 
              : 'bg-white/20 border border-gray-200/50 hover:border-gray-300/70'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className={`w-full px-3 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm ${
                      isDarkMode 
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                        : 'bg-white/30 border-gray-200/50 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className={`w-full px-3 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm ${
                      isDarkMode 
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                        : 'bg-white/30 border-gray-200/50 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
              </div>

              {/* Feedback Textarea */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Feedback
                </label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleInputChange}
                  placeholder="Share your thoughts..."
                  rows={3}
                  className={`w-full px-3 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 resize-none backdrop-blur-sm ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                      : 'bg-white/30 border-gray-200/50 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Submit</span>
                </button>
              </div>
            </form>
          </div>

          {/* Submitted Feedbacks - Hidden but still saved locally */}
          {/* Reviews are saved to localStorage but not displayed on the website */}
        </div>
      </section>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
          <div
            className={`max-w-sm w-full rounded-lg shadow-xl border-l-4 p-4 flex items-center space-x-3 transition-all duration-300 ${
              isDarkMode
                ? 'bg-slate-800 text-white border-slate-600'
                : 'bg-white text-gray-900 border-gray-200'
            } ${toast.type === 'success' ? 'border-green-500' : 'border-red-500'}`}
          >
            <div className="flex-shrink-0">
              {toast.type === 'success' ? (
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${toast.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => setToast({ show: false, message: '', type: '' })}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackReviews;
