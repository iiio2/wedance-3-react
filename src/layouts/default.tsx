import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <main className="p-4 text-justify text-neutral-950 leading-8 text-lg h-screen">
      {children}
    </main>
  );
};

export default DefaultLayout;
