import "@/app/globals.css";
import Watchlist from "@/components/Watchlist";

export default async function WatchlistPage() {
  return (
    <div className="page">
      <div className="header-container">
        <div className="header-content">
          <h2 className="text-4xl">Katselulista</h2>
        </div>
      </div>

      <Watchlist />
    </div>
  );
}
