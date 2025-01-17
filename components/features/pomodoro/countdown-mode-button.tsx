import { Button } from "../../ui/button";

type VariantType =
  | "secondary"
  | "default"
  | "destructive"
  | "outline"
  | "ghost"
  | "link"
  | "ghostSelected"
  | null
  | undefined;

type CountDownModeButtonProps = {
  title: string;

  variant: VariantType;
  onClick: () => void;
};

const CountDownModeButton = ({
  title,
  variant,
  onClick,
}: CountDownModeButtonProps) => {
  return (
    <Button onClick={onClick} size="sm" variant={variant} className="font-bold">
      {title}
    </Button>
  );
};

export { CountDownModeButton };
