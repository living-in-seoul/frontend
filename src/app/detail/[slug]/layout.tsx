interface DetailLayoutProps {
  children: React.ReactNode;
}

export default function DetailLayout({ children }: DetailLayoutProps) {
  return <section className="w-full max-w-md h-screen">{children}</section>;
}
