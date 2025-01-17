import { Pomodoro } from "./features/pomodoro/pomodoro";
import { Tasks } from "./features/todo/tasks";

const Main = () => {
  return (
    <div className="w-[480px] flex flex-col">
      <Pomodoro />
      <Tasks />
    </div>
  );
};

export { Main };
