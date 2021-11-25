import Image from "next/image";
import BoyosMerch from "../public/images/boyos_merch.jpeg";
import BoyosVinyl from "../public/images/boyos_vinyl.png";
import ByMickey from "../public/images/artworks/Greg.png";

const Home = () => {
  return (
    <div className="container px-4 mx-auto">
      <div className="flex flex-wrap">
        <div className="w-full px-4 sm:w-4/12">
          <div className="card">
            <figure>
              <Image
                src={BoyosMerch}
                layout="responsive"
                objectFit="contain"
                height={600}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Merch</h2>
              <p>
                Rerum reiciendis beatae tenetur excepturi aut pariatur est eos.
                Sit sit necessitatibus veritatis sed molestiae voluptates
                incidunt iure sapiente.
              </p>
              <div className="justify-end card-actions">
                <button className="btn btn-secondary">More info</button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-4 sm:w-4/12">
          <div className="card">
            <figure className="animate-spin-slow">
              <Image
                src={BoyosVinyl}
                layout="responsive"
                objectFit="contain"
                height={450}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Boyos Soundsytem</h2>
              <p>
                Rerum reiciendis beatae tenetur excepturi aut pariatur est eos.
                Sit sit necessitatibus veritatis sed molestiae voluptates
                incidunt iure sapiente.
              </p>
              <div className="justify-end card-actions">
                <button className="btn btn-secondary">More info</button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-4 sm:w-4/12">
          <div className="card ">
            <figure className="rounded-full">
              <Image
                src={ByMickey}
                layout="responsive"
                objectFit="contain"
                height={4500}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Artworks
                <span className="text-xs text-gray-500"> by Mickey</span>
              </h2>
              <p>
                Rerum reiciendis beatae tenetur excepturi aut pariatur est eos.
                Sit sit necessitatibus veritatis sed molestiae voluptates
                incidunt iure sapiente.
              </p>
              <div className="justify-end card-actions">
                <button className="btn btn-secondary">More info</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
