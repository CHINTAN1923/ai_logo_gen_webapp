"use client";
import { useState } from "react";
import Label from "./ui/Label";
import axios from "axios";

const PromptForm = () => {
  const [prompt, setPrompt] = useState(
    "logo for a bakery with name Jack's Bakery"
  );
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);


  const downloadImage = async (imageUrl: string) => {
    const parsedURL = new URL(imageUrl);
    const pathname = parsedURL.pathname;
    const response = await fetch(imageUrl);
    const blobImage = await response.blob();

    const href = URL.createObjectURL(blobImage);
    const anchorElement = document.createElement("a");

    anchorElement.href = href;
    anchorElement.download = pathname.substring(pathname.lastIndexOf("/") + 1);

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  };

  const handleSubmit = async () => {
    const body = {
      prompt,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "https://dzxa0vdf5m.execute-api.us-east-1.amazonaws.com/Test/AI-logo-gen",
        JSON.stringify(body),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setImageUrl(response.data.preSignedImageUrl);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="generator-area d-flex mt-3">
        <div className="form-container mt-3">
          <h2 className="m-3">Input</h2>
          <form className="prompt-form">
            <div className="mb-3">
              <Label text="Enter Prompt: " />
              <textarea
                className="promptTextArea promptArea form-control shadow-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value.replace(/\n/g, ""))}
                required
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary mb-3"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </form>
        </div>
        <div className="form-container mt-3">
          <h2 className="m-3">Output</h2>
          {loading ? (
            <div className="text-center mt-3">
              <div className="loader-container">
                <div className="loader"></div>
                <p>Running</p>
                <p>
                  It might take couple of minutes to generate the result based
                  on your input
                </p>
              </div>
            </div>
          ) : imageUrl ? (
            <>
            <img className="outputImage" src={imageUrl} alt="Generated Image" />
              {/* Download Button */}
              <div className="mt-2 mb-3">
                <a
                  onClick={() => downloadImage(imageUrl)}
                  download="generated-image.png"
                  className="btn btn-secondary"
                >
                  Download Image
                </a>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default PromptForm;
