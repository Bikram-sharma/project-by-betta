"use client";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <div className="w-full h-180">
        <Carousel />
      </div> */}
      <div className="flex p-6">
        <div className=" w-1/2 p-2  relative">
          <div className="absolute inset-0 text-white flex flex-col justify-center p-5">
            <h1 className=" font-sans font-bold text-4xl text-center">
              About Us
            </h1>
            <p className="text-xl text-justify px-10 py-5">
              BETTA empowers individuals with high-demand skills to deliver
              top-tier professional services by connecting them with clients who
              value quality, reliability, and professionalism. Our platform
              serves as a trusted bridge between skilled service providers and
              businesses or individuals seeking exceptional results. Whether
              it’s technical expertise, creative solutions, or specialized
              support, BETTA ensures a seamless experience built on trust,
              efficiency, and excellence.
            </p>
          </div>
        </div>

        <div className="h-full w-1/2 p-2 grid grid-cols-2 place-content-center gap-y-4">
          <h1 className=" font-sans font-bold text-2xl col-span-2  h-10">
            Services We Offer
          </h1>

          <ul>
            <li>
              <span className="flex items-center space-x-2 font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-6 h-6 inline-block fill-[#EA2849] "
                >
                  <path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" />
                </svg>
                <p>Home Services</p>
              </span>

              <ul className="list-disc list-inside ml-6">
                <li>Solar panel installation</li>
                <li>Electrical repairs & wiring</li>
                <li>Plumbing & leak fixes</li>
                <li>Painting, tiling, and basic renovations</li>
                <li>Furniture assembly & handyman work</li>
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              <span className="font-bold flex space-x-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-6 h-6 inline-block fill-[#EA2849]"
                >
                  <path d="M128 96C92.7 96 64 124.7 64 160L64 400L128 400L128 160L512 160L512 400L576 400L576 160C576 124.7 547.3 96 512 96L128 96zM19.2 448C8.6 448 0 456.6 0 467.2C0 509.6 34.4 544 76.8 544L563.2 544C605.6 544 640 509.6 640 467.2C640 456.6 631.4 448 620.8 448L19.2 448z" />
                </svg>
                <p>Tech & IT Support</p>
              </span>
              <ul className="list-disc list-inside ml-6">
                <li>Website and app development</li>
                <li>Computer & laptop repair</li>
                <li>Network setup & troubleshooting</li>
                <li>Cloud storage & data migration</li>
                <li>IT training & tech consultation</li>
              </ul>
            </li>
          </ul>

          <ul>
            <li>
              <span className="font-bold flex space-x-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-6 h-6 inline-block fill-[#EA2849]"
                >
                  <path d="M576 320C576 320.9 576 321.8 576 322.7C575.6 359.2 542.4 384 505.9 384L408 384C381.5 384 360 405.5 360 432C360 435.4 360.4 438.7 361 441.9C363.1 452.1 367.5 461.9 371.8 471.8C377.9 485.6 383.9 499.3 383.9 513.8C383.9 545.6 362.3 574.5 330.5 575.8C327 575.9 323.5 576 319.9 576C178.5 576 63.9 461.4 63.9 320C63.9 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320zM192 352C192 334.3 177.7 320 160 320C142.3 320 128 334.3 128 352C128 369.7 142.3 384 160 384C177.7 384 192 369.7 192 352zM192 256C209.7 256 224 241.7 224 224C224 206.3 209.7 192 192 192C174.3 192 160 206.3 160 224C160 241.7 174.3 256 192 256zM352 160C352 142.3 337.7 128 320 128C302.3 128 288 142.3 288 160C288 177.7 302.3 192 320 192C337.7 192 352 177.7 352 160zM448 256C465.7 256 480 241.7 480 224C480 206.3 465.7 192 448 192C430.3 192 416 206.3 416 224C416 241.7 430.3 256 448 256z" />
                </svg>
                <p>Creative & Design</p>
              </span>
              <ul className="list-disc list-inside ml-6">
                <li>Logo & branding design </li>
                <li>Graphic design (posters, flyers, banners)</li>
                <li>UI/UX and web design</li>
                <li>Video editing & production</li>
                <li>Illustration (books, education, promo)</li>
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              <span className="font-bold flex space-x-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-6 h-6 inline-block fill-[#EA2849] "
                >
                  <path d="M598.6 118.6C611.1 106.1 611.1 85.8 598.6 73.3C586.1 60.8 565.8 60.8 553.3 73.3L361.3 265.3L326.6 230.6C322.4 226.4 316.6 224 310.6 224C298.1 224 288 234.1 288 246.6L288 275.7L396.3 384L425.4 384C437.9 384 448 373.9 448 361.4C448 355.4 445.6 349.6 441.4 345.4L406.7 310.7L598.7 118.7zM373.1 417.4L254.6 298.9C211.9 295.2 169.4 310.6 138.8 341.2L130.8 349.2C108.5 371.5 96 401.7 96 433.2C96 440 103.1 444.4 109.2 441.4L160.3 415.9C165.3 413.4 169.8 420 165.7 423.8L39.3 537.4C34.7 541.6 32 547.6 32 553.9C32 566.1 41.9 576 54.1 576L227.4 576C266.2 576 303.3 560.6 330.8 533.2C361.4 502.6 376.7 460.1 373.1 417.4z" />
                </svg>
                <p>Cleaning & Maintenance</p>
              </span>
              <ul className="list-disc list-inside ml-6">
                <li>House cleaning (regular/deep)</li>
                <li>Office and commercial cleaning</li>
                <li>Appliance servicing</li>
                <li>Pest control services</li>
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              <span className="font-bold flex space-x-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-6 h-6 inline-block fill-[#EA2849] "
                >
                  <path d="M480 576L192 576C139 576 96 533 96 480L96 160C96 107 139 64 192 64L496 64C522.5 64 544 85.5 544 112L544 400C544 420.9 530.6 438.7 512 445.3L512 512C529.7 512 544 526.3 544 544C544 561.7 529.7 576 512 576L480 576zM192 448C174.3 448 160 462.3 160 480C160 497.7 174.3 512 192 512L448 512L448 448L192 448zM224 216C224 229.3 234.7 240 248 240L424 240C437.3 240 448 229.3 448 216C448 202.7 437.3 192 424 192L248 192C234.7 192 224 202.7 224 216zM248 288C234.7 288 224 298.7 224 312C224 325.3 234.7 336 248 336L424 336C437.3 336 448 325.3 448 312C448 298.7 437.3 288 424 288L248 288z" />
                </svg>
                <p>Tutoring & Education</p>
              </span>
              <ul className="list-disc list-inside ml-6">
                <li>School subject tutoring</li>
                <li>Language lessons</li>
                <li>Computer skills & digital literacy</li>
                <li>Exam prep (BCSE, Class XII, etc.)</li>
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              <span className="font-bold flex space-x-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-6 h-6 inline-block fill-[#EA2849] "
                >
                  <path d="M320 80C377.4 80 424 126.6 424 184C424 241.4 377.4 288 320 288C262.6 288 216 241.4 216 184C216 126.6 262.6 80 320 80zM96 152C135.8 152 168 184.2 168 224C168 263.8 135.8 296 96 296C56.2 296 24 263.8 24 224C24 184.2 56.2 152 96 152zM0 480C0 409.3 57.3 352 128 352C140.8 352 153.2 353.9 164.9 357.4C132 394.2 112 442.8 112 496L112 512C112 523.4 114.4 534.2 118.7 544L32 544C14.3 544 0 529.7 0 512L0 480zM521.3 544C525.6 534.2 528 523.4 528 512L528 496C528 442.8 508 394.2 475.1 357.4C486.8 353.9 499.2 352 512 352C582.7 352 640 409.3 640 480L640 512C640 529.7 625.7 544 608 544L521.3 544zM472 224C472 184.2 504.2 152 544 152C583.8 152 616 184.2 616 224C616 263.8 583.8 296 544 296C504.2 296 472 263.8 472 224zM160 496C160 407.6 231.6 336 320 336C408.4 336 480 407.6 480 496L480 512C480 529.7 465.7 544 448 544L192 544C174.3 544 160 529.7 160 512L160 496z" />
                </svg>
                <p>Skilled Labor & Others</p>
              </span>
              <ul className="list-disc list-inside ml-6">
                <li>Masonry & carpentry</li>
                <li>Welding & fabrication</li>
                <li>Event setup (sound, lighting, decor)</li>
                <li>Delivery and courier support</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
