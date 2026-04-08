import Map "mo:core/Map";
import List "mo:core/List";
import AdminAuthMixin "mixins/admin-auth-api";
import AdminAuthLib "lib/admin-auth";
import YouTubeMixin "mixins/youtube-api";
import YouTubeLib "lib/youtube-videos";
import HeroMediaMixin "mixins/hero-media-api";
import HeroMediaLib "lib/hero-media";

actor {
  let sessions : AdminAuthLib.Sessions = Map.empty<Text, Bool>();
  let videos : YouTubeLib.VideoStore = List.empty();
  let nextVideoId = { var value : Nat = 0 };

  let heroPanels : HeroMediaLib.HeroPanels = HeroMediaLib.initPanels();
  let certs : HeroMediaLib.CertificateStore = List.empty();
  let nextCertId = { var value : Nat = 0 };

  include AdminAuthMixin(sessions);
  include YouTubeMixin(videos, nextVideoId);
  include HeroMediaMixin(heroPanels, certs, nextCertId, sessions);
};
