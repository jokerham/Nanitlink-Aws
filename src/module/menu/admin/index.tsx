import { useParams } from 'react-router-dom';
import PageNotFound from '@/PageNotFound';
import Edit from './edit';

const IndexComponent = () => {
  const { action } = useParams<{ action: string }>();
  switch (action) {
    case "edit":
      return <Edit />
    default:
      return <PageNotFound />;
  }
};

export default IndexComponent;