import List "mo:core/List";
import Types "../types/hero-media";

module {
  /// Fixed-size mutable array for the 6 hero panel slots (empty string = unset).
  public type HeroPanels = [var Text];

  /// Certificate store as a growable list.
  public type CertificateStore = List.List<Types.Certificate>;

  /// Initialise a fresh 6-slot hero panels array (all empty).
  public func initPanels() : HeroPanels {
    [var "", "", "", "", "", ""];
  };

  /// Set the URL for a specific hero panel slot (0–5). Traps on out-of-bounds.
  public func setPanelMedia(panels : HeroPanels, slotIndex : Nat, url : Text) {
    if (slotIndex >= 6) {
      Runtime.trap("slotIndex must be 0–5");
    };
    panels[slotIndex] := url;
  };

  /// Return a snapshot of all 6 panel URLs as an immutable array.
  public func getPanelMedia(panels : HeroPanels) : [Text] {
    [
      panels[0],
      panels[1],
      panels[2],
      panels[3],
      panels[4],
      panels[5],
    ];
  };

  /// Clear (reset to empty string) a specific hero panel slot.
  public func clearPanelMedia(panels : HeroPanels, slotIndex : Nat) {
    if (slotIndex >= 6) {
      Runtime.trap("slotIndex must be 0–5");
    };
    panels[slotIndex] := "";
  };

  /// Add a certificate URL; returns the new certificate id.
  public func addCertificate(certs : CertificateStore, nextId : { var value : Nat }, url : Text) : Nat {
    let id = nextId.value;
    certs.add({ id; url });
    nextId.value += 1;
    id;
  };

  /// Return all certificates as an immutable array.
  public func getCertificates(certs : CertificateStore) : [Types.Certificate] {
    certs.toArray();
  };

  /// Remove a certificate by id (no-op if id not found).
  public func removeCertificate(certs : CertificateStore, id : Nat) {
    let filtered = certs.filter(func(c : Types.Certificate) : Bool { c.id != id });
    certs.clear();
    certs.append(filtered);
  };
};
