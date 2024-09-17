import { useNavigate } from "react-router-dom";
// inital data
const initialFormData = {
  eventName: "Wine Tasting Event",
  ticketQuantity: 100,
  totalAmount: 0,
  paymentMethod: "stripe",
};
const ConfirmTransaction = ({ formData = initialFormData }) => {
  const { eventName, ticketQuantity, totalAmount, paymentMethod } = formData;
  // hooks
  const navigate = useNavigate();

  ///////////////////////////
  // Confirm Ticket Purchase
  ///////////////////////////
  const handleConfirm = () => {
    alert(
      "In a real app this will go throught the api of the selected payment merchant"
    );
  };

  ///////////////////////////
  // Handle Navigate Back
  ///////////////////////////
  const handleBack = () => {
    console.log("handle");
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-900 text-gray-100 p-8">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center font-serif">
          Confirm Your Purchase
        </h1>
        <div className="space-y-6">
          {/* Event Information */}
          <div>
            <h2 className="text-2xl font-semibold font-serif mb-2">
              Event Information
            </h2>
            <p className="text-lg">
              <strong>Event Name:</strong> {eventName}
            </p>
            <p className="text-lg">
              <strong>Number of Tickets:</strong> {ticketQuantity}
            </p>
            <p className="text-lg">
              <strong>Total Amount:</strong> ${totalAmount}
            </p>
          </div>

          {/* Payment Options */}
          <div>
            <h2 className="text-2xl font-semibold font-serif mb-2">
              Payment Method
            </h2>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={handleBack}
                  className="mr-2"
                />
                Stripe
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={handleBack}
                  className="mr-2"
                />
                PayPal
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cashapp"
                  checked={paymentMethod === "cashapp"}
                  onChange={handleBack}
                  className="mr-2"
                />
                Cash App
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="venmo"
                  checked={paymentMethod === "venmo"}
                  onChange={handleBack}
                  className="mr-2"
                />
                Venmo
              </label>
            </div>
          </div>

          {/* Confirmation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
            >
              Back
            </button>
            <button
              onClick={handleConfirm}
              className="bg-green-500 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-green-600 transition-colors duration-200"
            >
              Confirm Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmTransaction;
