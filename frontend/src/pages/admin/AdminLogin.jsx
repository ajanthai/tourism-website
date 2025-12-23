import supabase from "../../utils/supabaseClient";

export default function AdminLogin() {
  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/admin"
      }
    });
  }

  return (
    <div>
      <h2>Admin Login</h2>
      <button onClick={loginWithGoogle}>
        Login with Google
      </button>
    </div>
  );
}
