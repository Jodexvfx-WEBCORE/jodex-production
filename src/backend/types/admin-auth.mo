module {
  /// Result returned from a login attempt
  public type LoginResult = {
    #ok : Text;   // session token on success
    #err : Text;  // error message on failure
  };
};
