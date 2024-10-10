import { useParams } from 'react-router-dom';

export const ViewPost = () => {
  const { id } = useParams();

  return <div>Viewing Post {id}</div>;
};
