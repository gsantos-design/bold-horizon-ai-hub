import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LanguageDifficultyHeatmap from "@/components/LanguageDifficultyHeatmap";

export default function LanguageHeatmap() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Header />
      <main className="flex-1 py-8">
        <LanguageDifficultyHeatmap />
      </main>
      <Footer />
    </div>
  );
}