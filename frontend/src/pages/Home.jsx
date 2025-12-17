import { useEffect } from "react";
import { setSEO } from "../utils/seo";

export default function Home() {
  useEffect(() => {
    setSEO({
      title: "Gravity Tours Sri Lanka | Explore Paradise",
      description:
        "Discover unforgettable tours in Sri Lanka. Beaches, wildlife, culture and adventure with Gravity Tours.",
    });
  }, []);

  return <h1>Welcome to Gravity Tours</h1>;
}
