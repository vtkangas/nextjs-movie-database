"use client";

import "@/app/globals.css";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Props {
  path: string;
  order?: string;
}

export default function SortList({ path, order }: Props) {
  const [labelTitle, setLabelTitle] = useState<string>("Uusin lisäys ensin");

  useEffect(() => {
    if (order) {
      setLabelTitle(getLabelTitle(order));
    }
  }, [order]);

  const getLabelTitle = (selectedOrder: string) => {
    if (selectedOrder === "date-asc") {
      return "Vanhin lisäys ensin";
    } else if (selectedOrder === "name-desc") {
      return "Järjestä nimellä (Ö-A)";
    } else if (selectedOrder === "name-asc") {
      return "Järjestä nimellä (A-Ö)";
    } else {
      return "Uusin lisäys ensin";
    }
  };

  return (
    <div className="w-fit">
      <div className="dropdown dropdown-bottom">
        <label tabIndex={0} className="btn w-fit">
          {labelTitle}
          {/*chevron-down -icon*/}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </label>
        <div
          tabIndex={0}
          className="dropdown-content text-white bg-gray-700 menu rounded-lg p-2 shadow w-52"
        >
          <ul>
            <li className="list-item">
              <Link href={`${path}/name-asc`}>Järjestä nimellä (A-Ö)</Link>
            </li>
            <li className="list-item">
              <Link href={`${path}/name-desc`}>Järjestä nimellä (Ö-A)</Link>
            </li>
            <li className="list-item">
              <Link href={`${path}/date-desc`}>Uusin lisäys ensin</Link>
            </li>
            <li className="list-item">
              <Link href={`${path}/date-asc`}>Vanhin lisäys ensin</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
