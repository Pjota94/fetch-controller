import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";

interface IUser {
  name: {
    first: string;
    last: string;
  };
}

interface IPropsFetch {
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const Component = ({ setLoading }: IPropsFetch) => {
  const [data, setData] = useState<IUser[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    const handleFetch = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://randomuser.me/api/?results=20",
          {
            signal: controller.signal,
          }
        );
        setLoading(false);
        setData(response.data.results);
      } catch (err) {
        console.log(err);
      }
    };

    handleFetch();

    return () => {
      setLoading(false);
      controller.abort();
    };
  }, []);

  return (
    <ul>
      {data.map((user) => (
        <li key={user.name.first}>{user.name.first}</li>
      ))}
    </ul>
  );
};

export const Fetch = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <h1>Users</h1>
      <button onClick={() => setIsVisible(!isVisible)}>Show</button>
      {loading && <div>Carregando...</div>}
      {isVisible && <Component setLoading={setLoading} />}
    </>
  );
};
