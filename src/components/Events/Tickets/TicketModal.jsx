/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

const TicketModal = ({
  ticketQuantity,
  ticketPrice,
  totalPrice,
  ticketsAvailable,
  eventName,
  setShowTicketModal,
}) => {
  const [formData, setFormData] = useState({
    eventName, // This would typically be passed in or fetched
    ticketQuantity: 1,
    totalPrice: ticketPrice,
    ticketPrice, // Assume each ticket costs $50
    ticketsAvailable,
  });

  ///////////////////////////
  //   Handle Input Change
  ///////////////////////////
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newFormData = {
        ...prevData,
        [name]: value,
      };
      if (name === "ticketQuantity") {
        newFormData.totalPrice = value * prevData.ticketPrice;
        newFormData.ticketsAvailable = ticketsAvailable - value;
      }
      return newFormData;
    });
  };

  const handleSubmit = () => {};

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-800 p-6 rounded-md"
        >
          <h2 className="text-2xl text-gray-100 mb-6">Purchase Tickets</h2>
          <span>Tickets Left: {formData.ticketsAvailable}</span>
          <div>
            <label htmlFor="event-name" className="block text-gray-100 mb-2">
              Event Name:
            </label>
            <input
              type="text"
              id="event-name"
              value={eventName}
              name="eventName"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-gray-100 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              disabled
            />
          </div>

          <div>
            <label
              htmlFor="ticket-quantity"
              className="block text-gray-100 mb-2"
            >
              Number of Tickets:
            </label>
            <input
              type="number"
              id="ticket-quantity"
              value={formData.ticketQuantity}
              name="ticketQuantity"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              min="1"
            />
          </div>

          <div>
            <label htmlFor="total-amount" className="block text-gray-100 mb-2">
              Total Price:
            </label>
            <input
              type="text"
              id="total-amount"
              value={`$${formData.totalPrice}`}
              name="totalAmount"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-gray-100 rounded-md focus:outline-none focus:border-[#e8d1ae]"
              disabled
            />
          </div>

          <div className="flex justify-between items-center gap-12">
            <button
              onClick={() => setShowTicketModal(false)}
              className="bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 transition-colors duration-200"
            >
              Cancel
            </button>
            <Link to={`confirm-transaction`}>
              <button
                type="submit"
                className="bg-stone-500 px-4 py-2 rounded-md focus:outline-none hover:bg-stone-600 hover:text-gray-100 transition-colors duration-200 cursor-pointer"
              >
                Confirm Purchase
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
export default TicketModal;
