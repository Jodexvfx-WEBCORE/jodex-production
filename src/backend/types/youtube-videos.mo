module {
  /// A YouTube video entry stored by the admin.
  public type YouTubeVideo = {
    id : Nat;
    url : Text;
    title : Text;
    addedAt : Int;
  };

  /// Result of adding a YouTube video.
  public type AddVideoResult = {
    #ok : YouTubeVideo;
    #err : Text;
  };
};
