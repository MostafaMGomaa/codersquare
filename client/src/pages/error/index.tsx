import { useNavigate } from 'react-router-dom';
import { ErrorPageProps } from '../../types';

export const ErrorPage = (props: ErrorPageProps) => {
  const { errorDetails, errorMessage, statusCode, icon } = props;
  const navigate = useNavigate();

  return (
    <div className="error-page flex flex-col items-center justify-center h-screen2 p-10">
      <div className="flex flex-col items-center gap-y-4">
        {icon}
        <p className="font-extrabold text-orange-700 text-6xl">{statusCode}</p>
      </div>
      <div className="error-details text-center mt-8">
        <h1 className="font-semibold text-gray-800 text-3xl">{errorMessage}</h1>
        <p className="text-gray-500 text-lg mt-2">{errorDetails}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-6 py-2 text-white bg-orange-700 hover:bg-orange-800 rounded-lg shadow-md transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};
