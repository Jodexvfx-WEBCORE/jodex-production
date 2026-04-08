import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/admin-auth";

module {
  public type Sessions = Map.Map<Text, Bool>;

  let ADMIN_EMAIL = "diwakar3223og@gmail.com";
  let ADMIN_PASSWORD = "20052005";

  /// Verify credentials and generate a session token.
  /// Returns #ok(token) on success, #err(msg) on failure.
  public func login(sessions : Sessions, username : Text, password : Text) : Types.LoginResult {
    if (username != ADMIN_EMAIL or password != ADMIN_PASSWORD) {
      return #err("Invalid username or password");
    };
    let token = "session-" # Time.now().toText();
    sessions.add(token, true);
    #ok(token);
  };

  /// Check whether a token is currently active.
  public func verifySession(sessions : Sessions, token : Text) : Bool {
    switch (sessions.get(token)) {
      case (?_) true;
      case null false;
    };
  };

  /// Invalidate a session token.
  public func logout(sessions : Sessions, token : Text) : () {
    sessions.remove(token);
  };
};
