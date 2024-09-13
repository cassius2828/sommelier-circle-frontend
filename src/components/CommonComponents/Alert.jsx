const Alert = ({ success, message }) => {
  if (success) {
    return (
      <div className="absolute -top-5 flex items-center justify-center h-24 rouned-md bg-gray-100 animate-fadeIn">
        <span className="text-xl text-green-500 p-4">{message}</span>
      </div>
    );
  }
  return (
    <div className="absolute -top-5 flex items-center justify-center h-24 rouned-md bg-gray-100 animate-fadeIn">
      <span className="text-xl text-red-500 p-4">{message}</span>
    </div>
  );
};
export default Alert;