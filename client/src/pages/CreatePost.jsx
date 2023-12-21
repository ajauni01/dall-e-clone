import { FormField, Loader } from "../components";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  //   generateImage FUNCTION
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "http://localhost:3000/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );
        const data = await response.json();
        // console.log("data from the backend", data);
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
        console.log(form);
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  //   handleSubmit FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );
        await response.json();
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image");
    }
  };
  //   handleChange FUNCTION
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //   handleSurpriseMe FUNCTION
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Create imaginative and visually stunning images through DALL-E AI and
          share them with the community
        </p>
      </div>

      {/* FORM */}
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Hala Madrid"
            value={form.name}
            handleChange={handleChange}
          />

          {/* PROMPT FORM FIELD */}
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="an armchair in the shape of an avocado"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div
            className="relative bg-gray-50 
          border border-gray-300 text-gray-900
           text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
           w-64 p-3 h-64 flex justify-center items-center"
          >
            {/* SHOW THE GENERATED IMAGE OR THE STOCK IMAGE */}
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {/* SHOW THE LOADER WHILE GENERATING IMAGE */}
            {generatingImg && (
              <div className="inset-0 absolute z-0 flex justify-center items-center bg-[rgba(90,73,73,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        {/*SHOW THE CURRENT SITUATION OF IMAGE GENERATION */}
        <div className="m-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        {/* GENERATED IMAGE SHARE OPTION WITH THE COMMUNITY */}
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created the image you want, you can share it with
            others in the community
            <button
              type="submit"
              className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loading ? "Sharing..." : "Share with the community"}
            </button>
          </p>
        </div>
      </form>
      {/* FORM ENDS */}
    </section>
  );
};

export default CreatePost;
