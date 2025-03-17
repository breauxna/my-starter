type ButtonProps = {
  onClick?: () => void;
}

export function Button({ onClick, children }: React.PropsWithChildren<ButtonProps>) {
  return (
    <button className="bg-violet-600 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded-full" onClick={onClick}>
      {children}
    </button>
  );
}