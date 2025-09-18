import { siFacebook, siGithub, siInstagram, siX } from "simple-icons";

export function Footer() {
  return (
    <footer className="mt-20 flex w-full flex-col border-t bg-gray-200 px-4 py-10 text-sm">
      <p className="text-left text-4xl font-extrabold">SHOP.CO</p>
      <p className="mt-2 max-w-2xl text-lg text-gray-600 sm:text-2xl">
        We have clothes that suits your style and which you’re proud to wear.
        From women to men.
      </p>
      <div className="mt-6 flex gap-4 text-gray-600 [&_svg]:size-6">
        <svg>
          <title>X</title>
          <path d={siX.path} />
        </svg>
        <svg>
          <title>Facebook</title>
          <path d={siFacebook.path} />
        </svg>
        <svg>
          <title>Instagram</title>
          <path d={siInstagram.path} />
        </svg>

        <svg>
          <title>GitHub</title>
          <path d={siGithub.path} />
        </svg>
      </div>
    </footer>
  );
}
