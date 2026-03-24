import { useNavigate } from "react-router-dom";

export default function PortServices() {
  const navigate = useNavigate();
  return (
    <div>
      <div>PortServices</div>
      <button onClick={() => navigate("port-operations")}>
        Go to Port Operations
      </button>
    </div>
  );
}
