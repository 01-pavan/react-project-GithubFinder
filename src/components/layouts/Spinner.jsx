import ringLoading from "./assests/ringLoading.gif";
function Spinner() {
  return (
    <div className="w-100 mt-20">
      <img
        width={180}
        className="text-center mx-auto"
        src={ringLoading}
        alt="Loading..."
      />
    </div>
  );
}
export default Spinner;
