interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="bg-white border-b px-6 py-4">
      {title ? (
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      ) : (
        <h1 className="text-xl text-black font-bold">Bizscan</h1>
      )}
    </header>
  );
}
