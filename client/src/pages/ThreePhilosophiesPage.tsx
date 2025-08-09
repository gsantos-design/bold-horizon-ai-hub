import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThreePhilosophies from "@/components/ThreePhilosophies";

export default function ThreePhilosophiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20">
        <ThreePhilosophies />
      </main>
      <Footer />
    </div>
  );
}