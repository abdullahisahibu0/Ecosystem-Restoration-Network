;; Restoration Site NFT Contract

(define-non-fungible-token restoration-site uint)

(define-map site-data
  { site-id: uint }
  {
    project-id: uint,
    location: (string-utf8 100),
    area: uint,
    ecosystem-type: (string-utf8 50),
    target-species: (list 10 (string-utf8 50))
  }
)

(define-data-var last-token-id uint u0)

(define-public (mint-site (project-id uint) (location (string-utf8 100)) (area uint) (ecosystem-type (string-utf8 50)) (target-species (list 10 (string-utf8 50))))
  (let
    (
      (new-site-id (+ (var-get last-token-id) u1))
    )
    (try! (nft-mint? restoration-site new-site-id tx-sender))
    (map-set site-data
      { site-id: new-site-id }
      {
        project-id: project-id,
        location: location,
        area: area,
        ecosystem-type: ecosystem-type,
        target-species: target-species
      }
    )
    (var-set last-token-id new-site-id)
    (ok new-site-id)
  )
)

(define-public (transfer-site (site-id uint) (recipient principal))
  (begin
    (try! (nft-transfer? restoration-site site-id tx-sender recipient))
    (ok true)
  )
)

(define-read-only (get-site-owner (site-id uint))
  (ok (nft-get-owner? restoration-site site-id))
)

(define-read-only (get-site-data (site-id uint))
  (ok (map-get? site-data { site-id: site-id }))
)

(define-read-only (get-last-token-id)
  (ok (var-get last-token-id))
)

