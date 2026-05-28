// Mock utility for handling contact form submissions
// This simulates backend behavior until real API is integrated

export const handleContactSubmit = async (formData) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Validate form data
  if (!formData.name || !formData.email || !formData.message) {
    return {
      success: false,
      error: 'All fields are required'
    };
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return {
      success: false,
      error: 'Invalid email format'
    };
  }
  
  // Store in localStorage for demonstration
  const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
  const newSubmission = {
    ...formData,
    id: Date.now(),
    timestamp: new Date().toISOString()
  };
  submissions.push(newSubmission);
  localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
  
  console.log('📧 Contact Form Submission (MOCK):', newSubmission);
  
  // Simulate successful submission
  return {
    success: true,
    data: newSubmission
  };
};

// Utility to retrieve all submissions (for testing)
export const getContactSubmissions = () => {
  return JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
};
