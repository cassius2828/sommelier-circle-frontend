import { useContext } from "react";
import { EventsContext } from "./EventsContext";

const useEventsContext = () => {
  const context = useContext(EventsContext);

  if (context === undefined) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }

  return context;
};

export default useEventsContext;
