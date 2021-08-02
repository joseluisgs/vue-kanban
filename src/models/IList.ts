import Task from './ITask';

interface IList{
  id: string;
  name: string;
  createdAt?: number;
  board: string;
  tasks: Task[];
}

export default IList;
