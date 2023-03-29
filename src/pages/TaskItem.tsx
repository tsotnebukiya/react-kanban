import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

export interface TaskItemPageProps {}

const TaskItemPage: React.FC<TaskItemPageProps> = (props) => {
  const loaderData = useLoaderData() as TaskItem;

  return <div>{loaderData.id}</div>;
};

export default TaskItemPage;

export interface TaskItem {
  id: string;
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  console.log(params);
  return { id: params.taskId };
}
