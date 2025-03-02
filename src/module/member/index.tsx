import { useParams } from 'react-router';
import SignUp from './signUp';
import PageNotFound from 'PageNotFound';

const IndexComponent = () => {
  const { action } = useParams<{ action: string }>();
  switch (action) {
    case "signUp":
      return <SignUp />;
    default:
      return <PageNotFound />;
  }
};

export default IndexComponent;