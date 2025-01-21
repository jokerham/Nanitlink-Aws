import React from 'react';
import { useParams } from 'react-router-dom';
import List from './List';
import PageNotFound from 'PageNotFound';

interface Props {
}

const IndexComponent: React.FC<Props> = () => {
  const { action } = useParams<{ action: string }>();
  switch (action) {
    case 'list':
      return <List />;
    default:
      return <PageNotFound />;
  }
};

export default IndexComponent;