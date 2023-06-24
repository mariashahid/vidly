import { useState, useEffect } from "react";
import auth from "../../services/authService";
import { User } from "../../App";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user data only once when the component is mounted
    const user = auth.getCurrentUser();
    console.log("Auth:", user);
    if (user?._id) setUser(user);
    setLoading(false);
  }, []);

  return { user, loading };
};
