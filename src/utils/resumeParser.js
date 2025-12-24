const API_URL = 'http://localhost:5000/api/resume';

export const parseResume = async (file) => {
    const formData = new FormData();
    formData.append('resume', file);

    try {
        const response = await fetch(`${API_URL}/parse`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to parse resume');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error parsing resume:', error);
        throw error;
    }
};
