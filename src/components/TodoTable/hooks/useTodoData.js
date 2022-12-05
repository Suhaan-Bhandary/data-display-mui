import axios from "axios";
import { useEffect, useState } from "react";

const useTodoData = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const url = 'https://jsonplaceholder.typicode.com/todos';
        const response = await axios.get(url);

        setIsLoading(false);
        setTodoList(response.data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    };

    getData();
  }, []);

  return [todoList, isLoading, isError];
}

export default useTodoData;