import { download } from "../../assets";
import { downloadImage } from "../../utils/index.js";
import "./Card.css";

const Card = ({ _id, name, prompt, photo }) => {
  // console.log("name", typeof name);
  return (
    <div
      className="rounded-xl group 
    relative shadow-card hover:shadow-cardhover card"
    >
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />

      <div
        className="max-h-[94.5%] absolute bottom-0 left-0
       right-0 bg-[#10131f] m-2 p-4 rounded-md prompt"
      >
        {/* show the prompt to the user */}
        <p className="text-white text-md overflow-y-auto">{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {/* show the first alphabet of the user name above the picture only when name exists */}
              {name && name[0]}
            </div>
            <div>
              <p className="text-white text-sm">{name}</p>
            </div>
          </div>
          {/* DOWNLOAD BUTTON */}
          <button type="button" onClick={() => downloadImage(_id, photo)}>
            <img
              src={download}
              alt="download"
              className="w-6 h-6 object-contain invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
