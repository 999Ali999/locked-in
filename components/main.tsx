import { Pomodoro } from "./features/pomodoro/pomodoro";
import { Tasks } from "./features/todo/tasks";

const Main = () => {
  return (
    <div className="mx-20">
      <Pomodoro />

      <Tasks />
    </div>
  );
};

export { Main };
