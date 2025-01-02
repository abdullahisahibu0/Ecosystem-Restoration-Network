;; Carbon Credit Token Contract

(define-fungible-token carbon-credit)

(define-map credit-data
  { credit-id: uint }
  {
    project-id: uint,
    amount: uint,
    verification-date: uint,
    expiration-date: uint
  }
)

(define-data-var credit-count uint u0)

(define-public (mint-credits (project-id uint) (amount uint) (expiration-date uint))
  (let
    (
      (new-credit-id (+ (var-get credit-count) u1))
    )
    (try! (ft-mint? carbon-credit amount tx-sender))
    (map-set credit-data
      { credit-id: new-credit-id }
      {
        project-id: project-id,
        amount: amount,
        verification-date: block-height,
        expiration-date: expiration-date
      }
    )
    (var-set credit-count new-credit-id)
    (ok new-credit-id)
  )
)

(define-public (transfer-credits (amount uint) (recipient principal))
  (ft-transfer? carbon-credit amount tx-sender recipient)
)

(define-read-only (get-credit-balance (account principal))
  (ok (ft-get-balance carbon-credit account))
)

(define-read-only (get-credit-supply)
  (ok (ft-get-supply carbon-credit))
)

(define-read-only (get-credit-data (credit-id uint))
  (ok (map-get? credit-data { credit-id: credit-id }))
)

