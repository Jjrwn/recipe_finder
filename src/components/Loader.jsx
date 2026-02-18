import BeatLoader from "react-spinners/BeatLoader";
export default function Loader({ loading }) {
  return (
    <div
      className={`flex justify-center items-center absolute top-1/2 left-1/2 
                transform -translate-x-1/2 -translate-y-1/2 z-50bg-opacity-75 
                p-5 w-full rounded ${loading ? "block" : "hidden"}`}
    >
      <p className="text-2xl text-red-600 text-center">
        {" "}
        {loading ? "Loading..." : ""}
        <BeatLoader
          loading={loading}
          size={52}
          margin={5}
          color="#cc0b0b"
          speedMultiplier={3}
        />
      </p>
    </div>
  );
}
