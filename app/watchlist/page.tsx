import "@/app/globals.css";
import Watchlist from "@/components/Watchlist";

export default async function WatchlistPage() {
  return (
    <div className="page">
      <h2 className="text-3xl">Watchlist</h2>

      <Watchlist />
    </div>
  );
}
