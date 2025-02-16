import PageNotFound from 'PageNotFound';
import { useParams } from 'react-router';

const IndexComponent = () => {
  const { action } = useParams<{ action: string }>();
  switch (action) {
    default:
      return <PageNotFound />;
  }
};

export default IndexComponent;