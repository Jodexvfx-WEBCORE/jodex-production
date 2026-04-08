import Types "../types/admin-auth";
import AdminAuthLib "../lib/admin-auth";

mixin (sessions : AdminAuthLib.Sessions) {
  /// Login with username and password; returns session token on success.
  public func adminLogin(username : Text, password : Text) : async Types.LoginResult {
    AdminAuthLib.login(sessions, username, password);
  };

  /// Returns true if the provided session token is valid.
  public query func verifyAdminSession(token : Text) : async Bool {
    AdminAuthLib.verifySession(sessions, token);
  };

  /// Invalidate a session token (logout).
  public func adminLogout(token : Text) : async () {
    AdminAuthLib.logout(sessions, token);
  };
};
