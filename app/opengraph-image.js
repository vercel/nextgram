import { ImageResponse } from "next/server";

export default async function og() {
  return new ImageResponse(
    (
      <div
        style={{ fontFamily: "Inter Bold" }}
        tw="flex flex-col w-full h-full items-center justify-center bg-white"
      >
        <div tw="flex flex-col w-full">
          <div tw="flex h-1/5 items-center justify-center pt-10">
            <h2 tw="text-4xl">NextGram</h2>
          </div>
          <div tw="flex h-4/5">
            <div tw="relative flex flex-col w-full px-10 pt-10 pb-10">
              <div tw="flex flex-1 items-stretch relative">
                <div tw="flex flex-1 flex-col justify-around">
                  <img
                    tw="w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                    src="https://nextgram.vercel.app/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FFGz_t1wXIAIFyT-%3Fformat%3Djpg&w=1080&q=75"
                  />
                </div>

                <div tw="flex flex-1 flex-col justify-around px-6">
                  <img
                    tw="w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                    src="https://nextgram.vercel.app/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FFFDOtLkWYAsWjTM%3Fformat%3Djpg&w=1080&q=75"
                  />
                </div>

                <div tw="flex flex-1 flex-col justify-around">
                  <img
                    tw="w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                    src="https://nextgram.vercel.app/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FEpIR281XIAMUrEM%3Fformat%3Djpg&w=1080&q=75"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 800,
      height: 418,
    }
  );
}
