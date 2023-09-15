import Footer from "../misc/Footer";
import Navbar from "../misc/Navbar";

interface Props {
  children: React.ReactNode | React.ReactElement;
}

export default function BaseLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <div className="pt-20">{children}</div>
      <Footer />
    </>
  );
}
