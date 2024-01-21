"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Props {
  movieId: string;
  image: string;
  name: string;
  genre: string[];
  year: number;
}

export default function WatchlistButtonMini({
  movieId,
  image,
  name,
  genre,
  year,
}: Props) {
  const [inWatchlist, setInWatchlist] = useState<boolean>(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkWatchlist = async () => {
      const userId = (await supabase.auth.getSession()).data.session?.user.id;

      const { data, error } = await supabase
        .from("watchlist")
        .select()
        .eq("user_id", userId)
        .eq("movie_id", movieId);

      if (data && data.length > 0) {
        setInWatchlist(true);
      }
    };

    checkWatchlist();
  }, [movieId, supabase]);

  const addToWatchlist = async () => {
    const userId = (await supabase.auth.getSession()).data.session?.user.id;

    const { data, error } = await supabase
      .from("watchlist")
      .insert([
        {
          movie_id: movieId,
          image: image,
          name: name,
          genre: genre,
          year: year,
          user_id: userId,
        },
      ])
      .select();

    if (!error) {
      setInWatchlist(true);
    } else console.log(error);
  };

  const removeFromWatchlist = async () => {
    const userId = (await supabase.auth.getSession()).data.session?.user.id;

    const { data, error } = await supabase
      .from("watchlist")
      .delete()
      .eq("user_id", userId)
      .eq("movie_id", movieId);

    if (!error) {
      setInWatchlist(false);
    } else {
      console.log(error);
    }
  };

  return (
    <div>
      {inWatchlist === false ? (
        <button
          className="btn btn-circle btn-ghost text-white hover:bg-emerald-400 border-0"
          onClick={addToWatchlist}
        >
          {/*plus-circle icon*/}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      ) : (
        <button
          className="btn btn-circle btn-ghost text-white hover:bg-rose-500 border-0"
          onClick={removeFromWatchlist}
        >
          {/*minus-circle icon*/}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
