import useAuthContext from "../../context/auth/useAuthContext";
import PromptSignIn from "../CommonComponents/PromptSignIn";
import { EventForm } from "./EventForm";

const CreateEvent = () => {
  const { user } = useAuthContext();
  if (!user)
    return (
      <>
        <PromptSignIn subject={"\"Post an Event\""} />
      </>
    );
  return (
    <div className="flex flex-col w-full  min-h-screen pt-12 mt-52 md:mt-80 items-center">
      <EventForm />
    </div>
  );
};
export default CreateEvent;
