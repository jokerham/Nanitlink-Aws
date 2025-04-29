import { useParams } from 'react-router-dom';
import PageNotFound from '@/PageNotFound';

const IndexComponent = () => {
  const { action } = useParams<{ action: string }>();
  switch (action) {
    default:
      return <PageNotFound />;
  }
};

export default IndexComponent;