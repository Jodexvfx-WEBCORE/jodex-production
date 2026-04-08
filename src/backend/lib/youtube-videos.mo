import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/youtube-videos";

module {
  public type VideoStore = List.List<Types.YouTubeVideo>;

  let MAX_VIDEOS : Nat = 12;

  /// Validate that the URL is a YouTube URL.
  func isValidYouTubeUrl(url : Text) : Bool {
    url.contains(#text "youtube.com/watch") or url.contains(#text "youtu.be/")
  };

  /// Add a new YouTube video. Enforces max 12 and URL validation.
  public func addVideo(
    videos : VideoStore,
    nextId : Nat,
    url : Text,
    title : Text,
  ) : Types.AddVideoResult {
    if (videos.size() >= MAX_VIDEOS) {
      return #err("Maximum of 12 videos allowed");
    };
    if (not isValidYouTubeUrl(url)) {
      return #err("Invalid YouTube URL. Must contain youtube.com/watch or youtu.be/");
    };
    let video : Types.YouTubeVideo = {
      id = nextId;
      url = url;
      title = title;
      addedAt = Time.now();
    };
    videos.add(video);
    #ok(video);
  };

  /// Remove a video by id. No-op if id does not exist.
  public func removeVideo(videos : VideoStore, id : Nat) : () {
    let idx = videos.findIndex(func(v : Types.YouTubeVideo) : Bool { v.id == id });
    switch (idx) {
      case (?i) {
        // Shift remaining items by overwriting via mapInPlace approach:
        // Use filter to rebuild without the target id.
        let filtered = videos.filter(func(v : Types.YouTubeVideo) : Bool { v.id != id });
        videos.clear();
        videos.append(filtered);
      };
      case null {};
    };
  };

  /// Return all stored videos as an immutable array.
  public func getVideos(videos : VideoStore) : [Types.YouTubeVideo] {
    videos.toArray();
  };
};
