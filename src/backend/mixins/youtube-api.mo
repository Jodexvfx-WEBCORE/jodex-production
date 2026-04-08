import Types "../types/youtube-videos";
import YouTubeLib "../lib/youtube-videos";

mixin (videos : YouTubeLib.VideoStore, nextVideoId : { var value : Nat }) {
  /// Add a YouTube video link (admin only — caller should be verified before calling).
  public func addYouTubeVideo(url : Text, title : Text) : async Types.AddVideoResult {
    let result = YouTubeLib.addVideo(videos, nextVideoId.value, url, title);
    switch (result) {
      case (#ok(_)) { nextVideoId.value += 1 };
      case (#err(_)) {};
    };
    result;
  };

  /// Remove a YouTube video by id (admin only — caller should be verified before calling).
  public func removeYouTubeVideo(id : Nat) : async () {
    YouTubeLib.removeVideo(videos, id);
  };

  /// Return all YouTube videos (public query).
  public query func getYouTubeVideos() : async [Types.YouTubeVideo] {
    YouTubeLib.getVideos(videos);
  };
};
