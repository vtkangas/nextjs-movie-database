'use client';

import { useEffect, useRef, useState } from "react";

interface Props {
  description: string;
}

export default function MovieDescriptionBox({ description }: Props) {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const container = descriptionRef.current;

    const checkOverflow = () => {
      if (container) {
        const hasVerticalOverflow = container.scrollHeight > container.clientHeight;
        setHasOverflow(hasVerticalOverflow);
      }
    };

    // Check overflow on mount and on window resize
    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };

  }, []);

  return (
    <>
      <div ref={descriptionRef} className="relative h-24 mt-3 overflow-hidden">
        <p>{description}</p>

        {hasOverflow && (
          <div className="absolute w-full py-6 px-4 bottom-0 inset-x-0 bg-gradient-to-t from-violet-50 dark:from-gray-900"></div>
        )}
      </div>

      {hasOverflow && (
        <div className="text-right">
          <label
            htmlFor="descriptionModal"
            className="cursor-pointer text-blue-600 underline"
          >
            Lue lisää...
          </label>
        </div>
      )}

      {/* Full description in modal */}
      <input type="checkbox" id="descriptionModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-violet-50 dark:bg-neutral-900">
          <div className="py-4">
            <p>{description}</p>
          </div>

          <div className="modal-action">
            <label htmlFor="descriptionModal" className="btn">
              Takaisin
            </label>
          </div>
        </div>
      </div>
      {/* modal ends */}
    </>
  );
}
