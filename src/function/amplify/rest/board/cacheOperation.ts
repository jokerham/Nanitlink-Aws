import { get } from 'aws-amplify/api';

interface IIncrementViewsProps {
  operation: string, key: string, value?: string
}

const headers = {
  'Content-Type': 'application/json',
}

export const cacheOperation = async (body: IIncrementViewsProps) => {
  const apiName = 'PostRestApi';
  const path = `/cache`;
  const options = { headers, body: JSON.stringify(body) };
  const response = await get({ apiName, path, options });
  return response;
}
