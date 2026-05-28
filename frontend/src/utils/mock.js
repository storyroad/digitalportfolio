import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const handleContactSubmit = async (formData) => {
  try {
    const response = await fetch(`${API}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }

    const data = await response.json();
    
    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('Contact submission error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Utility to retrieve all submissions (for admin dashboard)
export const getContactSubmissions = async () => {
  try {
    const response = await fetch(`${API}/contact`);
    if (!response.ok) {
      throw new Error('Failed to fetch submissions');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return [];
  }
};

// Update submission status
export const updateSubmissionStatus = async (submissionId, status) => {
  try {
    const response = await fetch(`${API}/contact/${submissionId}/status?status=${status}`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      throw new Error('Failed to update status');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating status:', error);
    return { success: false };
  }
};

// Delete submission
export const deleteSubmission = async (submissionId) => {
  try {
    const response = await fetch(`${API}/contact/${submissionId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete submission');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting submission:', error);
    return { success: false };
  }
};
