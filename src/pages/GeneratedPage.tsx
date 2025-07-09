import { useLocation, useNavigate } from 'react-router-dom';

const GeneratedPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const content = state?.content;

  if (!content) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-700 mb-6">No content found. Please generate content first.</p>
        <button onClick={() => navigate('/')} className="text-blue-600 underline">
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Generated Content</h1>
      <div className="bg-gray-50 p-6 rounded-lg shadow-md whitespace-pre-wrap text-gray-800">
        {content}
      </div>
      <div className="mt-6 text-right">
        <button onClick={() => navigate('/')} className="text-purple-600 underline">
          Generate Another
        </button>
      </div>
    </div>
  );
};

export default GeneratedPage;
