import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";

export default function FAQPage() {
  return (
    <main>
      <Header />
      <div style={{ paddingTop: "60px" }}>
        <FAQ />
      </div>
      <Footer />
    </main>
  );
}
