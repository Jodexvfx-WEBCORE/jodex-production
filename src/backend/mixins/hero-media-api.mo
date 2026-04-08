import Types "../types/hero-media";
import HeroMediaLib "../lib/hero-media";
import AdminAuthLib "../lib/admin-auth";

mixin (
  panels : HeroMediaLib.HeroPanels,
  certs : HeroMediaLib.CertificateStore,
  nextCertId : { var value : Nat },
  sessions : AdminAuthLib.Sessions,
) {
  /// Set the media URL for a hero panel slot (admin only).
  /// Pass a valid session token obtained from adminLogin.
  public func setHeroPanelMedia(token : Text, slotIndex : Nat, url : Text) : async () {
    if (not AdminAuthLib.verifySession(sessions, token)) {
      Runtime.trap("Unauthorized");
    };
    HeroMediaLib.setPanelMedia(panels, slotIndex, url);
  };

  /// Return all 6 hero panel URLs (public query).
  public query func getHeroPanelMedia() : async [Text] {
    HeroMediaLib.getPanelMedia(panels);
  };

  /// Clear a hero panel slot (admin only).
  public func clearHeroPanelMedia(token : Text, slotIndex : Nat) : async () {
    if (not AdminAuthLib.verifySession(sessions, token)) {
      Runtime.trap("Unauthorized");
    };
    HeroMediaLib.clearPanelMedia(panels, slotIndex);
  };

  /// Add a certificate image URL; returns the new certificate id (admin only).
  public func addCertificate(token : Text, url : Text) : async Nat {
    if (not AdminAuthLib.verifySession(sessions, token)) {
      Runtime.trap("Unauthorized");
    };
    HeroMediaLib.addCertificate(certs, nextCertId, url);
  };

  /// Return all certificates (public query).
  public query func getCertificates() : async [Types.Certificate] {
    HeroMediaLib.getCertificates(certs);
  };

  /// Remove a certificate by id (admin only).
  public func removeCertificate(token : Text, id : Nat) : async () {
    if (not AdminAuthLib.verifySession(sessions, token)) {
      Runtime.trap("Unauthorized");
    };
    HeroMediaLib.removeCertificate(certs, id);
  };
};
