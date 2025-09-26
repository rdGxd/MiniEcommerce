export function getStarRating(value: number) {
  const maxStars = 5;
  // Round to nearest 0.5 to allow half stars
  const rounded = Math.round(value * 2) / 2;

  const starPath =
    "M12 .587l3.668 7.431 8.204 1.193-5.936 5.787 1.402 8.168L12 18.896 4.662 23.166l1.402-8.168L0.128 9.211l8.204-1.193L12 .587z";

  return (
    <div className="flex items-center gap-2 text-yellow-400" aria-hidden>
      {Array.from({ length: maxStars }).map((_, idx) => {
        const i = idx + 1;
        const diff = rounded - (i - 1);
        const id = `star-half-${i}-${Math.round(value * 10)}`; // deterministic id

        if (diff >= 1) {
          // full star
          return (
            <svg
              key={i}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-yellow-400"
              aria-hidden
            >
              <path d={starPath} />
            </svg>
          );
        }

        if (diff >= 0.5) {
          // half star: left half filled via linearGradient, right half transparent with stroke
          return (
            <svg
              key={i}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="text-yellow-400"
              aria-hidden
            >
              <defs>
                <linearGradient id={id} x1="0" x2="1">
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <path d={starPath} fill={`url(#${id})`} />
              <path
                d={starPath}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
              />
            </svg>
          );
        }

        // empty star
        return (
          <svg
            key={i}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            className="text-gray-300"
            aria-hidden
          >
            <path d={starPath} />
          </svg>
        );
      })}
      <span className="sr-only">Avaliação: {value} de 5</span>
    </div>
  );
}
