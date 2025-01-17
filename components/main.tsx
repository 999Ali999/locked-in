import { Pomodoro } from "./features/pomodoro/pomodoro";
import { Todo } from "./features/todo/todo";

const Main = () => {
  return (
    <div className="mx-20">
      <Pomodoro />

      <Todo />
    </div>
  );
};

export { Main };
